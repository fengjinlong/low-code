<template>
    <!-- <Grid /> -->
  <div
    id="editor"
    class="editor"
    ref="editor"
    :style="{
      width: state.canvasStyleData.width + 'px',
      height: state.canvasStyleData.height + 'px',
      backgroundColor: state.canvasStyleData.backgroundColor,
      backgroundImage: `url(${state.canvasStyleData.background})`,
      'background-size': '100% 100%',
      'background-repeat': 'no-repeat',
    }"
    @click="hideContextMenu"
    @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown"
  >

    <!-- @mouseup="handleMouseUp" -->
    <!-- 网格线 -->
    <Grid />
    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in state.componentData"
      :key="item.id"
      :propValue="item.propValue"
      :element="item"
      :default-style="item.materialData.style"
      :style="getStyle(item.materialData.style)"
      :index="index"
      :class="{ lock: item.isLock }"
      :active="item.id === (state.curComponent || {}).id"
    >
      <!-- {{ item.id }}
      {{ state.curComponent }}
      {{ state.curComponent && state.curComponent.id }} -->
      <!-- :class="{ lock: item.isLock }" -->
      <component
        :is="item.component"
        :id="'component' + item.id"
        class="component"
        :prop-value="item.propValue"
        :element="item"
        :xAxis="item.xAxis"
        :yAxis="item.yAxis"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu />
    <!-- 标线 -->
    <MarkLine />
    <!-- 选中区域 -->
    <Area
      v-show="isShowArea"
      :start="start"
      :width="areaWidth"
      :height="areaHeight"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { getStyle, getComponentRotatedStyle } from "@/utils/style";
import MarkLine from "./MarkLine";
import { useStore } from "vuex";
import { nextTick } from "vue";
import Shape from "./Shape";
import Area from "./Area";

import { $ } from "@/utils/utils";
import Bus from "@/utils/bus";
import ContextMenu from "./context-menu";
import Grid from "./Grid";
export default {
  components: {
    Grid,
    Area,
    Shape,
    MarkLine,
    ContextMenu,
  },
  setup(props) {

    onMounted(() => {
      Bus.on("hideArea", () => {
        hideArea();
      });
    });
    // 存dom 获取坐标使用
    const editor = ref(null);
    const store = useStore();
    const { commit, state } = store;
    nextTick(() => {
      commit("saveEditor", editor);
    });

    // 右键
    const handleContextMenu = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // 计算菜单相对于编辑器的位移
      let target = e.target;
      let top = e.offsetY;
      let left = e.offsetX;
      while (target instanceof SVGElement) {
        target = target.parentNode;
      }

      // 处理在组件上右键
      while (!target.className.includes("editor")) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.parentNode;
      }

      commit("showContextMenu", { top, left });
    };
    // 隐藏右键菜单
    const hideContextMenu = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // if (state.isClickComponent) {

      // }
      // commit("setCurComponent", { component: null, index: null });
      commit("hideContextMenu");
    };

    // 组合
    const start = reactive({
      x: 0,
      y: 0,
    });
    const areaWidth = ref(0);
    const areaHeight = ref(0);
    const isShowArea = ref(false);
    const handleMouseDown = (e) => {
      // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
      if (
        !state.curComponent ||
        (state.curComponent.component != "v-text" &&
          state.curComponent.component != "rect-shape")
      ) {
        e.preventDefault();
      }

      hideArea();

      // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
      const rectInfo = state.editor.getBoundingClientRect();
      const editorX = rectInfo.x;
      const editorY = rectInfo.y;
      const startX = e.clientX;
      const startY = e.clientY;
      start.x = startX - editorX;
      start.y = startY - editorY;

      isShowArea.value = true;
      // return
      const move = (moveEvent) => {
        areaWidth.value = Math.abs(moveEvent.clientX - startX);
        areaHeight.value = Math.abs(moveEvent.clientY - startY);
        if (moveEvent.clientX < startX) {
          start.x = moveEvent.clientX - editorX;
        }

        if (moveEvent.clientY < startY) {
          start.y = moveEvent.clientY - editorY;
        }
      };
      const up = (e) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);

        // commit("setCurComponent", { component: null, index: null });

        if (e.clientX == startX && e.clientY == startY) {
          hideArea();
          return;
        }

        createGroup(editorX, editorY);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    const getSelectArea = () => {
      const result = [];
      // 区域起点坐标
      const { x, y } = start;
      // 计算所有的组件数据，判断是否在选中区域内
      state.componentData.forEach((component) => {
        if (component.isLock) return;

        const { left, top, width, height } = getComponentRotatedStyle(
          component.materialData.style
        );
        if (
          x <= left &&
          y <= top &&
          left + width <= x + areaWidth.value &&
          top + height <= y + areaHeight.value
        ) {
          result.push(component);
        }
      });

      // 返回在选中区域内的所有组件
      return result;
    };
    const createGroup = (editorX, editorY) => {
      // 获取选中区域的组件数据
      const areaData = getSelectArea();
      if (areaData.length <= 1) {
        hideArea();
        console.log(areaData);
        console.log("Group");
        return;
      }

      // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
      // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
      let top = Infinity;
      let left = Infinity;
      let right = -Infinity;
      let bottom = -Infinity;
      areaData.forEach((component) => {
        let style = {};
        if (component.component === "Group") {
          component.propValue.forEach((item) => {
            const rectInfo = $(`#component${item.id}`).getBoundingClientRect();
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
      areaWidth.value = right - left;
      areaHeight.value = bottom - top;

      // 设置选中区域位移大小信息和区域内的组件数据
      commit("setAreaData", {
        style: {
          left,
          top,
          width: areaWidth.value,
          height: areaHeight.value,
        },
        components: areaData,
      });
    };
    const hideArea = (e) => {
      isShowArea.value = false;
      areaWidth.value = 0;
      areaHeight.value = 0;
if (window.event.ctrlKey) {
  return
}
      commit("setAreaData", {
        style: {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        },
        components: [],
      });
    };

    return {
      handleMouseUp() {
        commit("setClickComponentStatus", true);
      },
      handleMouseDown,
      editor,
      isShowArea,
      state,
      start,
      areaWidth,
      areaHeight,
      handleContextMenu,
      hideContextMenu,
      getStyle
    };
  },
};
</script>

<style scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;
  /* width: 100%;
  height: 100%; */
}
.lock {
  opacity: 0.5;
}
.lock:hover {
  cursor: not-allowed;
}

.edit .component {
  outline: none;
  width: 100%;
  height: 100%;
}
/* 选中组件 遮罩层样式 */
.active .component {
  background-color: rgba(155,185,240,.5) !important;
}
</style>
