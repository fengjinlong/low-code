<template>
  <div class="attr-list">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
      <a-form-item label="名称">
        <a-input v-model:value="state.canvasStyleData.title" />
      </a-form-item>
      <a-form-item label="画布尺寸">
        <a-row type="flex" justify="space-between">
          <a-col :span="10">
            <a-input
              type="number"
              v-model:value="state.canvasStyleData.width"
            />
          </a-col>
          <a-col :span="4">
            <img :src="icon_relevance" class="line" alt="">
          </a-col>
          <a-col :span="10">
            <a-input v-model:value="state.canvasStyleData.height" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="主题配色">
        <img :src="icon_theme" class="theme" alt="">
      </a-form-item>
      <a-form-item label="背景色">
        <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="state.canvasStyleData.backgroundColor" v-model:gradientColor="gradientColor"/>
      </a-form-item>
      <a-form-item label="画布背景">
        <!-- <a-button @click="showBgList = true" type="primary">
          {{ !!demoSrc ? "更换" : "选择" }}
        </a-button>
        <img v-if="!!demoSrc" class="bgdemo" :src="demoSrc" alt="" /> -->
        <img :src="demoSrc ? demoSrc : icon_bg" alt="" width="100" style="cursor: pointer;" @click="showBgList = true" />     
        <img v-if="demoSrc" :class="demoSrc ? 'icon_project_del' : ''" :src="icon_project_del" alt=""  @click="removeBgImg"/>
      </a-form-item>
    </a-form>
    <!-- <a-input :type="key !== 'xAxis' ? 'number' : 'text'" /> -->
    <CanvasBgList v-model="showBgList" @setBg="setBg" />
  </div>
</template>

<script>
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import CanvasBgList from "./canvas-bgList.vue";
import { useStore } from "vuex";
import { ref,computed } from "vue";

import baseURL from "@/request/env";
export default {
  components: { CanvasBgList, PlusOutlined, LoadingOutlined },

  setup() {
    const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");
    const icon_relevance = require('@/assets/images/icon_relevance.png');
    const icon_theme = require('@/assets/images/icon_theme.png');
    const icon_project_del = require("@/assets/images/icon_project_del.png");
    const icon_bg = require('@/assets/images/icon_bg.png');
    const { state, commit } = useStore();

    const demoSrc = computed(() => {
      return state.canvasStyleData.background
    })
    const showBgList = ref(false);
    const setBg = (imgName) => {
      commit("setCanvasBg", `${baseURL}/static/${imgName}`);
    };
    // 清除画布背景图
    const removeBgImg = () => {
      commit("removeCanvasBg");
    }
    return {
      icon_bg,
      icon_project_del,
      removeBgImg,
      icon_theme,
      icon_relevance,
      gradientColor,
      showBgList,
      demoSrc,
      state,
      setBg,
      name: "",
      imageUrl: "",
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
  },
};
</script>

<style scoped>
.attr-list {
  overflow: auto;
  padding: 33px 48px 0 30px;
  padding-top: 0;
  height: 100%;
}
.bgdemo {
  width: 100%;
  margin-top: 10px;
}
.line {
  display: block;
  width: 20px;
  height: 6px;
  background: #001426;
  margin: 13px auto;
  border-radius: 2px;
}
.icon_project_del {
  cursor: pointer;
  margin-left: 20px;
}
</style>
