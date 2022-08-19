<template>
  <div class="config-list">
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="{textAlign:'center',color:'#B2B2B2'}" class="ceshi" size="large" :tabBarGutter="100">
      <a-tab-pane :key="1" tab="属性">
        <AttrsList :attrList="styleKeys"/>
      </a-tab-pane>
      <a-tab-pane v-if="getObjectData" :key="2" tab="数据">
        <importData :importData="getObjectData"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { BarChartOutlined,FormOutlined,BarsOutlined } from '@ant-design/icons-vue'
import componentList, {
  commonType,
} from "@/custom-component/left-components-data";
import AttrsList from "@/components/attrs-list"; // 右侧属性列表
import importData from "@/components/import-data"; // 右侧属性列表
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    BarChartOutlined,
    BarsOutlined,
    FormOutlined,
    AttrsList,
    importData
  },
  setup() {
    const activeKey = ref(1);
    const { state } = useStore(); 
    const getObjectData = computed(() => {
      if (state.curComponent && state.curComponent.objectData) {
        const curComponentObjectData = state.curComponent.objectData;
        return curComponentObjectData;
      }
    });
    const styleKeys = computed(() => {
      if (state.curComponent) {
        const curComponentStyleKeys = state.curComponent.materialData;
        activeKey.value = 1;
        return curComponentStyleKeys;
      }
    });

    return {
      styleKeys,
      getObjectData,
      activeKey,
      componentList,
      commonType,
    };
  },
};
</script>
<style scoped>
.config-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
}
.ceshi {
  height: 100%;
    overflow-y: scroll;
    color: rgb(179, 179, 179);
}
/* :deep(.ant-tabs-nav .ant-tabs-tab) {
    width: 130px;
    text-align: center;
} */
</style>
