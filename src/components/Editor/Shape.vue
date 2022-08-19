<template>
  <div
    style="position: absolute"
    class="shape"
    :class="{ active }"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
    @mouseup="handleMouseUpOnShape"
  >
    <!-- 原点 -->
    <LockOutlined
      v-show="element.isLock"
      style="
        color: #1893f4;
        font-size: 16px;
        position: absolute;
        right: 0px;
        top: 0px;
      "
    />
    <div
      v-for="item in isActive() ? pointList : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { LockOutlined } from "@ant-design/icons-vue";
import Bus from "@/utils/bus";
import { ref, effect, nextTick, onMounted ,reactive} from "vue";
// import { listenGlobalCtrl } from '@/utils/shortcutKey'
import { getStyle, getComponentRotatedStyle } from "@/utils/style";
import calculateComponentPositonAndSize from "@/utils/calculateComponentPositonAndSize";
export default {
  components: {
    LockOutlined,
  },
  props: {
    defaultStyle: {
      require: true,
      type: Object,
      default: () => {},
    },
    element: {
      require: true,
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
    },
    index: {
      require: true,
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    // onMounted(() => {
    //   listenGlobalCtrl()

    // })
    // store
    const { commit, state } = useStore();
    const pos = props.defaultStyle;

    let active = ref(false);
    effect(() => {
      active.value = props.active;
    });

    const handleMouseUpOnShape = () => {
      commit("setClickComponentStatus", true);
    };
    // 拖动位置
    let arrGroup = [];
     // 组合
    const start = reactive({
      x: 0,
      y: 0,
    });
    const handleMouseDownOnShape = (e) => {
      // +++++
      console.log(window.event.ctrlKey);
      console.log(e.button);
      if (window.event.ctrlKey && e.button !== 2) {
        // 收集逻辑
        // 找到组件
        // 去重逻辑
        // 添加逻辑
        arrGroup.push(props.element);
        console.log(arrGroup);



        const areaData = arrGroup
      if (areaData.length <= 1) {
        console.log(areaData);
        console.log("Group");
        return;
      }
        let top = Infinity;
        let left = Infinity;
        let right = -Infinity;
        let bottom = -Infinity;
        areaData.forEach((component) => {
          let style = {};
          if (component.component === "Group") {
            component.propValue.forEach((item) => {
              const rectInfo = $(
                `#component${item.id}`
              ).getBoundingClientRect();
              style.left = rectInfo.left - editorX;
              style.top = rectInfo.top - editorY;
              style.right = rectInfo.right - editorX;
              style.bottom = rectInfo.bottom - editorY;

              if (style.left < left) left = style.left;
              if (style.top < top) top = style.top;
              if (style.right > right) right = style.right;
              if (style.bottom > bottom) bottom = style.bottom;
            });
          } else {
            style = getComponentRotatedStyle(component.materialData.style);
          }

          if (style.left < left) left = style.left;
          if (style.top < top) top = style.top;
          if (style.right > right) right = style.right;
          if (style.bottom > bottom) bottom = style.bottom;
        });
        start.x = left;
      start.y = top;
      // areaWidth.value = right - left;
      // areaHeight.value = bottom - top;

      // 设置选中区域位移大小信息和区域内的组件数据
      commit("setAreaData", {
        style: {
          left,
          top,
          width: 200,
          height: 200,
        },
        components: areaData,
      });
        return;
      }














      commit("setClickComponentStatus", true);
      e.preventDefault();
      e.stopPropagation();

      // 设置当前操作的组件
      commit("setCurComponent", {
        component: props.element,
        index: props.index,
      });
      if (props.element.isLock) return;
      // 鼠标点击落点坐标
      const startY = e.clientY;
      const startX = e.clientX;
      // 初始的位置
      const startTop = Number(pos.top);
      const startLeft = Number(pos.left);
      // 没有移动，不保存快照
      let hasMove = false;
      const move = (moveEvent) => {
        hasMove = true;
        // 鼠标移动时时位置

        // commit("setClickComponentStatus", true);
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        pos.top = curY - startY + startTop;
        pos.left = curX - startX + startLeft;

        // 修改当前组件样式
        commit("setShapeStyle", pos);
        // 标线 需要nextTick
        nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          // 后面两个参数代表鼠标移动方向
          // curY - startY > 0 true 表示向下移动 false 表示向上移动
          // curX - startX > 0 true 表示向右移动 false 表示向左移动
          Bus.emit("moving", [curY - startY > 0, curX - startX > 0]);
        });
      };
      const up = (e) => {
        hasMove && commit("recordSnapshot");

        commit("setClickComponentStatus", true);
        // 隐藏标线
        Bus.emit("unmove");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };

    // 八个点的位置
    const getPointStyle = (point) => {
      const { width, height } = props.defaultStyle;
      let cursor = ""; //n-resize
      // width = width * 1
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);

      const hasLT = /lt/.test(point);
      const hasRT = /rt/.test(point);
      const hasRB = /rb/.test(point);
      const hasLB = /lb/.test(point);

      let newLeft = 0;
      let newTop = 0;

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
        if (hasLT || hasRB) {
          cursor = "nw-resize";
        } else {
          cursor = "ne-resize";
        }
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2;
          newTop = hasT ? 0 : height;
          cursor = "n-resize";
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width;
          newTop = Math.floor(height / 2);
          cursor = "e-resize";
        }
      }

      const style = {
        marginLeft: "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: cursor,
      };
      return style;
    };

    // 8个点改变矩形大小
    const handleMouseDownOnPoint = (point, e) => {
      commit("setClickComponentStatus", true);
      // 阻止移动
      e.stopPropagation();
      e.preventDefault();

      const style = props.defaultStyle;
      // 组件宽高比
      const proportion = style.width / style.height;
      // 组件中心点
      const center = {
        x: style.left + style.width / 2,
        y: style.top + style.height / 2,
      };

      // 画布信息
      const editorRectInfo = state.editor.getBoundingClientRect();

      const pointRect = e.target.getBoundingClientRect();

      // 当前点击圆点相对于画布的中心坐标
      const curPoint = {
        x: Math.round(
          pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2
        ),
        y: Math.round(
          pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2
        ),
      };
      // 获取对称点的坐标，根据对称点和鼠标位置找到新的中心点
      const symmetricPoint = {
        x: center.x - (curPoint.x - center.x),
        y: center.y - (curPoint.y - center.y),
      };
      let needSave = false;

      const move = (moveEvent) => {
        // 拖动点的位置
        needSave = true;
        // 鼠标移动后的当前点的坐标
        const curPosition = {
          x: moveEvent.clientX - editorRectInfo.left,
          y: moveEvent.clientY - editorRectInfo.top,
        };
        /**
         * point 八个点
         * curPosition 鼠标移动的位置坐标
         * proportion 宽高比
         * needLockProportion 先给个默认 false
         * symmetricPoint 相对组件中心的对称点坐标
         */
        calculateComponentPositonAndSize(
          point,
          style,
          curPosition,
          proportion,
          false,
          {
            center,
            curPoint,
            symmetricPoint,
          }
        );
        commit("setShapeStyle", style);
      };
      const up = () => {
        needSave && commit("recordSnapshot");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        // needSave && this.$store.commit("recordSnapshot");
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    return {
      state,
      handleMouseDownOnPoint,
      handleMouseUpOnShape,
      getPointStyle,
      active,
      isActive() {
        return active.value && !props.element.isLock;
      },
      selectCurComponent(e) {
        // 隐藏右键
        e.stopPropagation();
        e.preventDefault();
        commit("hideContextMenu");

        // commit("setCurComponent", { component: null, index: null });
      },
      handleMouseDownOnShape,
      pointList: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"], // 八个方向
    };
  },
};
</script>

<style scoped>
/* 选中组件样式 */
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}

.shape {
  /* background-color: #fff; */
  background-color: transparent;
  border: 1px solid #ddd;
}
.shape-point {
  position: absolute;
  background: #fff;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
  border: 1px solid #59c7f9;
}
</style>
