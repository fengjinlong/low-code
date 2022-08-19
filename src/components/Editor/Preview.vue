<template>
  <a-modal
    :maskClosable="false"
    v-model:visible="modelValue"
    width="1400px"
    title="预览"
    :footer="null"
    cancelText="取消"
    okText="确定"
    @cancel="handleOk"
    @ok="handleOk"
    :cancel-button-props="{
      style: { color: '#fff', background: '#008BC9', borderColor: '#008BC9' },
    }"
  >
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
  </a-modal>
</template>

<script>
// import { getStyle } from "@/utils/style";
import { effect, ref } from "vue";
import { useStore } from "vuex";
import ComponentWrapper from "./component-wrapper";
// import { changeStyleWithScale } from "@/utils/translate";

export default {
  components: { ComponentWrapper },
  props: {
    modelValue: Boolean,
  },
  setup(props, { emit }) {
    const { state, commit } = useStore();
    let show = ref(false);
    effect(() => {
      show.value = props.value;
    });
    const handleOk = () => {
      emit("update:modelValue", false);
    };
    return {
      show,
      state,
      handleOk,
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

.close {
  position: absolute;
  right: 20px;
  top: 20px;
}

/*修改滚动条样式*/
.ant-modal div::-webkit-scrollbar {
  width: 2px;
  height: 6px;
  /**/
}
.ant-modal div::-webkit-scrollbar-track {
  background: #09324d;
  border-radius: 2px;
}
.ant-modal div::-webkit-scrollbar-thumb {
  background: #008bc9;
  border-radius: 10px;
}
.ant-modal div::-webkit-scrollbar-thumb:hover {
  background: #2da3bd;
}
.ant-modal div::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
