<template>
  <div class="seriesTabs flex">
    <a-tabs v-model:activeKey="activeKey"  hide-add size="small" type="editable-card" @edit="onEdit">
      <a-tab-pane v-for="(pane, i) in seriesList" :key="pane.myId" :tab="`系列 ${i+1}`" :closable="seriesList.length >1 ? pane.closable : false">
          <seriesLine :config="pane"/>
      </a-tab-pane>
    </a-tabs>
    <div :style="{ marginTop: '10px', color:'#B2B2B2' }">
      <PlusOutlined  @click="add"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import {attrNameData} from "@/utils/attrNameData";
import { filter } from "minimatch";
import { PlusOutlined } from "@ant-design/icons-vue";
import componentListData, { barSeriesObj, lineSeriesObj }  from "@/custom-component/left-components-data"; // 获取组件配置列表数据
import seriesLine from "./series-line";
export default {
  components: {
		PlusOutlined,
		seriesLine
  },
  props: {
    seriesList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  setup(props) {
    let { proxy } = getCurrentInstance()
    const seriesList = computed(() => {
      props.seriesList.forEach(element => {
        element.myId = RndNum(8)
      });
      const series = props.seriesList;
      return series;
    });
    const RndNum = (n) =>{
        var rnd="";
        for(var i = 0; i < n; i++)
          rnd += Math.floor(Math.random()*10);
        return rnd;
    }

    const activeKey = ref(seriesList.value[0].myId);
    // 添加系列
    const add = () => {
      let seriesObjs = {};
      if (seriesList.value.length && seriesList.value[0].type == 'bar') { //如果是柱状图
        seriesObjs = JSON.parse(JSON.stringify(barSeriesObj));
      } else { //如果是折线图
        seriesObjs = JSON.parse(JSON.stringify(lineSeriesObj));
      }
      seriesObjs.myId = RndNum(8);
      seriesList.value.push(seriesObjs);
      activeKey.value = seriesList.value[seriesList.value.length-1].myId;
    };

    // 删除系列
    const onEdit = (targetKey,action) => {
      remove(targetKey,action);
    };
    
    const remove = (targetKey,action) => {
      let lastIndex = 0;
      seriesList.value.forEach((element, i) => {
        if (element.myId == targetKey) {
            seriesList.value.splice(i, 1);
            lastIndex = i - 1;
        }
      });
      proxy.$forceUpdate();

      if (seriesList.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = seriesList.value[lastIndex].myId;
        } else {
          activeKey.value = seriesList.value[0].myId;
        }
      }
    };

    const lableFilter = val => {
      let arr = attrNameData.filter(item => {
        return val == item.key;
      });
      return (arr[0] && arr[0].label) || "";
    };
    const isObj = object => {
      // 判断是否是object
      return (
        object &&
        typeof object == "object" &&
        Object.prototype.toString.call(object).toLowerCase() ==
          "[object object]"
      );
    };
    return {
      lableFilter,
      isObj,
      seriesList,
      activeKey,
      onEdit,
      add,
      handleClick() {}
    };
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: start;
}
:deep(.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab) {
  background: #12274b;
  color:#B2B2B2;
  border-color:#3863AF;
}
:deep(.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active) {
  color:#03DAC5;
}
:deep(.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x) {
  color:#3863AF;
}
:deep(.ant-tabs-tab-prev){
  color:#3863AF;
}
:deep(.ant-tabs-tab-next){
  color:#3863AF;
}
:deep(.ant-tabs-tab-btn-disabled, .ant-tabs-tab-btn-disabled:hover){
  color:#3863AF;
}
</style>
