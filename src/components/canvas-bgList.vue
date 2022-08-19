<template>
  <a-modal
    :closable="false"
    :maskClosable="false"
    v-model:visible="modelValue"
    width="1100px"
    title="选择背景"
    cancelText="取消"
    okText="确定"
    @cancel="close"
    @ok="handleOk"
  >
    <a-row :gutter="[0, 20]" style="max-height: 600px; overflow-y: scroll">
      <a-col :span="3" v-for="(item, index) in materialList.data" :key="index">
        <img
          class="img"
          @click="click(index)"
          :src="`${baseURL}/static/${item.imagePath}`"
          :class="{ active: activeIndex === index }"
          alt=""
        />
      </a-col>
    </a-row>
    <a-pagination
      :total="materialList.total"
      :current="param.pageNum"
      :pageSize="param.pageSize"
      @change="onChange"
      size="small"
      style="text-align: center; padding-top: 20px"
      :show-total="(totalde) => `共 ${totalde} 条`"
    />
  </a-modal>
</template>

<script>
import { reactive, ref } from "vue";

import baseURL from "@/request/env";
import { getList } from "@/request/material.js";
export default {
  props: {
    modelValue: Boolean,
  },
  setup(props, { emit }) {
    const param = reactive({
      // 列表查询参数
      pageNum: 1,
      pageSize: 32,
      sortType: 2, //排序类型 1、降序 2、升序
      sortFeild: "upload_date", // 下拉选择 筛选数据
    });
    const close = () => {
      emit("update:modelValue", false);
    };
    const activeIndex = ref(0);
    const click = (n) => {
      activeIndex.value = n;
    };
    const handleOk = (n) => {
      emit("update:modelValue", false);
      emit("setBg", materialList.data[activeIndex.value].imagePath);
    };
    const materialList = reactive({
      data: [],
      total: 0,
    });
    const getMaterialList = () => {
      getList(param).then((res) => {
        if (res.code == 200) {
          materialList.data = res.data.data.lists;
          materialList.total = res.data.data.totalCount;
        }
      });
    };
    getMaterialList();
    const onChange = (pageNumber) => {
      param.pageNum = pageNumber;
      getMaterialList();
    }
    return {
      onChange,
      param,
      baseURL,
      click,
      materialList,
      activeIndex,
      close,
      handleOk,
    };
  },
};
</script>

<style scoped>
.img {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  cursor: pointer;
}
.img.active {
  border: 3px solid yellowgreen;
}
</style>
