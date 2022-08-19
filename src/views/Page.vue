<template>
  <div class="canvas-container">
    <div
      class="canvas"
      :style="{
        width: state.canvasStyleData.width + 'px',
        height: state.canvasStyleData.height + 'px',
        backgroundColor: state.canvasStyleData.backgroundColor,
        backgroundImage: `url(${state.canvasStyleData.background})`,
        'background-size': '100% 100%',
        'background-repeat': 'no-repeat',
      }"
    >
      <ComponentWrapper
        v-for="(item, index) in state.componentData"
        :key="index"
        :config="item"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { selectByPageId } from "@/request/page.js";
import ComponentWrapper from "../components/Editor/component-wrapper";

import { useRoute } from "vue-router";

export default {
  components: { ComponentWrapper },

  setup() {
    const route = useRoute();
    const pageId = route.params.id;

    const state = reactive({
      canvasStyleData: {},
      componentData: [],
    });
    selectByPageId({ pageId }).then((res) => {
      if (res.code === 200) {
        state.canvasStyleData = JSON.parse(res.data.canvasStyleData);
        state.componentData = JSON.parse(res.data.elementjson);
      }
    });
    return {
      state,
    };
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;
}

.canvas-container {
  width: calc(100% - 40px);
  height: calc(100% - 120px);
  overflow: auto;
}

.canvas {
  background: #fff;
  position: relative;
  margin: auto;
}
</style>
