<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      v-show="lineStatus[line] || false"
      :key="line"
      :ref="setRef"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
    ></div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, toRaw } from "vue";
import { useStore } from "vuex";
import Bus from "@/utils/bus";
import { getComponentRotatedStyle } from "@/utils/style";

export default {
  setup() {
    const { state,commit } = useStore();
    const lineStatus = reactive({
      xt: false,
      xc: false,
      xb: false,
      yl: false,
      yc: false,
      yr: false,
    });
    onMounted(() => {
      // 监听元素移动和不移动的事件
      Bus.on("moving", (param) => {
        showLine(param[0], param[1]);
      });

      Bus.on('unmove', () => {
          hideLine()
      })
    });
    const hideLine = () => {
      Object.keys(lineStatus).forEach((line) => {
        lineStatus[line] = false;
      });
    };

    // 收集dom arr
    const domRefs = []
    const setRef = (el) => {
      if (!el || domRefs.includes(el)) return;
      domRefs.push(el);
    };
    // 根据key 返回相应的dom
    const getDom = (domRefsArr, key) => {
      const rawDomArr = domRefsArr;
      const arr = rawDomArr.filter((ele) => ele.__vnode.key === key);
      return arr[0];
    };
    const showLine = (isDownward, isRightward) => {
      const components = state.componentData;
      // 式 样
      const curComponentStyle = getComponentRotatedStyle(
        state.curComponent.materialData.style
      );
      const curComponentHalfwidth = curComponentStyle.width / 2;
      const curComponentHalfHeight = curComponentStyle.height / 2;
      hideLine();
      components.forEach((component) => {

        if (component == state.curComponent) return;
        const componentStyle = getComponentRotatedStyle(component.materialData.style);
        const { top, left, bottom, right } = componentStyle;
        const componentHalfwidth = componentStyle.width / 2;
        const componentHalfHeight = componentStyle.height / 2;

        const conditions = {
          top: [
            {
              isNearly: isNearly(curComponentStyle.top, top),
              lineNode: getDom(domRefs, "xt"), // xt
              line: "xt",
              dragShift: top,
              lineShift: top,
            },
            {
              isNearly: isNearly(curComponentStyle.bottom, top),
              lineNode: getDom(domRefs, "xt"), // xt
              line: "xt",
              dragShift: top - curComponentStyle.height,
              lineShift: top,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: isNearly(
                curComponentStyle.top + curComponentHalfHeight,
                top + componentHalfHeight
              ),
              lineNode: getDom(domRefs, "xc"), // xc
              line: "xc",
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: top + componentHalfHeight,
            },
            {
              isNearly: isNearly(curComponentStyle.top, bottom),
              lineNode: getDom(domRefs, "xb"), // xb
              line: "xb",
              dragShift: bottom,
              lineShift: bottom,
            },
            {
              isNearly: isNearly(curComponentStyle.bottom, bottom),
              lineNode: getDom(domRefs, "xb"), // xb
              line: "xb",
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom,
            },
          ],
          left: [
            {
              isNearly: isNearly(curComponentStyle.left, left),
              lineNode: getDom(domRefs, "yl"), // yl
              line: "yl",
              dragShift: left,
              lineShift: left,
            },
            {
              isNearly: isNearly(curComponentStyle.right, left),
              lineNode: getDom(domRefs, "yl"), // yl
              line: "yl",
              dragShift: left - curComponentStyle.width,
              lineShift: left,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: isNearly(
                curComponentStyle.left + curComponentHalfwidth,
                left + componentHalfwidth
              ),
              lineNode: getDom(domRefs, "yc"), // yc
              line: "yc",
              dragShift: left + componentHalfwidth - curComponentHalfwidth,
              lineShift: left + componentHalfwidth,
            },
            {
              isNearly: isNearly(curComponentStyle.left, right),
              lineNode: getDom(domRefs, "yr"), // yr
              line: "yr",
              dragShift: right,
              lineShift: right,
            },
            {
              isNearly: isNearly(curComponentStyle.right, right),
              lineNode: getDom(domRefs, "yr"), // yr
              line: "yr",
              dragShift: right - curComponentStyle.width,
              lineShift: right,
            },
          ],
        };

        const needToShow = [];
        const { rotate } = state.curComponent.materialData.style;
        // 双层 for 循环
        Object.keys(conditions).forEach((key) => {
          // 遍历符合的条件并处理
          conditions[key].forEach((condition) => {
            // 小于 3 进入显示逻辑
            if (!condition.isNearly) return;
            // 修改当前组件位移
            // commit("setShapeSingleStyle", {
            //   key,
            //   value:
            //     rotate != 0
            //       ? translatecurComponentShift(
            //           key,
            //           condition,
            //           curComponentStyle
            //         )
            //       : condition.dragShift,
            // });

            condition.lineNode.style[key] = `${condition.lineShift}px`;
            // 显示
            needToShow.push(condition.line);
          });
        });

        // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
        // 同一方向上的线只显示一条，例如多条横条只显示一条横线
        if (needToShow.length) {
          chooseTheTureLine(needToShow, isDownward, isRightward);
        }
      });
    };
    const translatecurComponentShift = (key, condition, curComponentStyle) => {
      const { width, height } = state.curComponent.materialData.style;
      if (key == "top") {
        return Math.round(
          condition.dragShift - (height - curComponentStyle.height) / 2
        );
      }

      return Math.round(
        condition.dragShift - (width - curComponentStyle.width) / 2
      );
    };

    const chooseTheTureLine = (needToShow, isDownward, isRightward) => {
      // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
      // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
      if (isRightward) {
        if (needToShow.includes("yr")) {
          lineStatus.yr = true;
        } else if (needToShow.includes("yc")) {
          lineStatus.yc = true;
        } else if (needToShow.includes("yl")) {
          lineStatus.yl = true;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (needToShow.includes("yl")) {
          lineStatus.yl = true;
        } else if (needToShow.includes("yc")) {
          lineStatus.yc = true;
        } else if (needToShow.includes("yr")) {
          lineStatus.yr = true;
        }
      }

      if (isDownward) {
        if (needToShow.includes("xb")) {
          lineStatus.xb = true;
        } else if (needToShow.includes("xc")) {
          lineStatus.xc = true;
        } else if (needToShow.includes("xt")) {
          lineStatus.xt = true;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (needToShow.includes("xt")) {
          lineStatus.xt = true;
        } else if (needToShow.includes("xc")) {
          lineStatus.xc = true;
        } else if (needToShow.includes("xb")) {
          lineStatus.xb = true;
        }
      }
    };

    // 相距 dff 像素将自动吸附
    const diff = 3;
    const isNearly = (dragValue, targetValue) => {
      return Math.abs(dragValue - targetValue) <= diff;
    };
    const lines = ["xt", "xc", "xb", "yl", "yc", "yr"]; // 分别对应三条横线和三条竖线

    return {
      lines,
      setRef,
      lineStatus,
      diff,
    };
  },
};
</script>

<style scoped>
.mark-line {
  height: 100%;
}

.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}

.xline {
  width: 100%;
  height: 1px;
}

.yline {
  width: 1px;
  height: 100%;
}
</style>
