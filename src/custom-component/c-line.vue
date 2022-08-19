<template>
  <div ref="myLine" :width="myWidth" :height="myHeight" class="v-line"></div>
</template>

<script>
import { ref, computed, getCurrentInstance,watchEffect, watch, nextTick,onMounted } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    propValue: {
      type: String,
      default: "",
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { state } = useStore();
    const { proxy } = getCurrentInstance();
    const style = computed(() =>{
      return props.element.materialData;
    })
    // 获取折线图 默认数据 
    const objectData = computed(() => {
      return props.element.objectData;
    }) 
    const axisXList = computed(() => {
      return props.element.xAxisArr;
    });
    const axisYList = computed(() => {
      return props.element.yAxisArr;
      // if (state.curComponent && state.curComponent.yAxisArr) {
      //     return state.curComponent.yAxisArr;
      // } else {
      //   return props.element.yAxisArr;
      // }
    
    });
    const seriesData = computed(() => {
      if (state.curComponent && state.curComponent.materialData) {
        return state.curComponent.materialData.series;
      } else {
        return props.element.materialData.series;
      }
    });
 
    const propValue = computed(() => {
      return props.propValue;
    });
    /**
     * 获取处理好的数据
     * list  [{"x": "一月","y1": 8, "y2": 2, "y3": 9}]
     * 
     */
    const getData = (list) => {
        var keys = getKeys(list); //['x', 'y1', 'y2', 'y3']
        var newObj = new Object;
        for(var i = 0; i < keys.length; i++) {
            newObj[[keys[i]]] = new Array;
            for(let j in list){
                if(newObj[[keys[i]]]){
                    //新对象存在这个key
                    newObj[[keys[i]]].push(list[j][keys[i]])
                }else{
                    //新对象不存在这个key
                    newObj[[keys[i]]].push('');
                }
            }
        }
        return newObj // {x:[1,2,3], y:[1,2,3]}
    }

    /**
     * 获取y周数据
     * getLineData {x:[1,2,3], y:[1,2,3]}
     * axisList [{name: 'y1', id: 0}, {name: 'y3', id: 2}]
     * 
     */
    const getYList= (getLineData, axisList) => { 
        let yList = [];
        if (axisList.length == 0) return [];
        for(let j in getLineData){
          for(var i = 0; i < axisList.length; i++) {
            if (j == axisList[i].name) {
              yList.push(getLineData[j])
            }
          }
        }
        return yList; // [[]]
    }
    //
    /**
     * 获取所有
     *    list {"x": "一月","y1": 8, "y2": 2, "y3": 9}
     * 的 key
     */
    const getKeys = (list) => { 
        var keys = [];
        for(var i = 0; i < list.length; i++) {
            var a = Object.keys(list[i])
            keys = keys.concat(a)
        }
        return Array.from(new Set(keys)); // ['x', 'y1', 'y2', 'y3']
    }

    const myLine = ref(null)
    const myWidth = ref(0)
    const myHeight = ref(0)
    // let getLineData = getData(objectData.value)
    // let ylists = getYList(getLineData);
    // 等容器dom挂载完才能去实例化echarts
    onMounted(() => {
      let myChart = proxy.$echarts.init(myLine.value)
      const materialData = props.element.materialData
      myWidth.value = materialData.style.width;
      myHeight.value = materialData.style.height;
      // 处理需要的数据 
      var getLineData = getData(objectData.value);
      //  console.log(getLineData,objectData.value,'getLineData')
     
      var ylists = getYList(getLineData, axisYList.value);  // 获取y轴数据
      materialData.xAxis.data = getYList(getLineData, axisXList.value)[0]; // X轴数据
    
      materialData.series.forEach((item, i) => {
          item.data = ylists[i]
      });
     
      myChart.setOption(materialData, true);

      window.addEventListener('resize', () => {
        myChart.resize()
      })

      /*监听props*/
      watch(props.element, (nweProps, oldProps) => {
        const materialData = props.element.materialData
        myWidth.value = materialData.style.width;
        myHeight.value = materialData.style.height;
        nextTick(() => {
          myChart.setOption(materialData, true)
          myChart.resize()
        })
      });
      // 新增series 触发
      watch(()=>props.element.materialData.series.length, (nweProps, oldProps) => {
        const materialData = props.element.materialData
        let getLineData2 = getData(objectData.value)
        var ylists2 = getYList(getLineData2, axisYList.value);
        materialData.series.forEach((item, i) => {
            item.data = ylists2[i]
        });
        nextTick(() => {
          myChart.setOption(materialData, true)
          myChart.resize()
        })
      });
      // 更改series数据弹窗 触发
      watch(objectData, (nweProps, oldProps) => {
        const materialData = props.element.materialData
        let getLineData1 = getData(objectData.value)
        var ylists1 = getYList(getLineData1, axisYList.value);
        materialData.xAxis.data = getYList(getLineData1, axisXList.value)[0]; // X轴数据
        materialData.series.forEach((item, i) => {
            item.data = ylists1[i]
        });
        nextTick(() => {
          myChart.setOption(materialData, true)
          myChart.resize()
        })
      });
      // 更改series数据 拖拽 量度 触发
      watch(()=>props.element.yAxisArr.length, (nweProps, oldProps) => {
        const materialData = props.element.materialData
        let getLineData1 = getData(objectData.value)
        var ylists1 = getYList(getLineData1, axisYList.value);
        materialData.xAxis.data = getYList(getLineData1, axisXList.value)[0] || []; // X轴数据
        materialData.series.forEach((item, i) => {
            item.data = ylists1[i]
        });
        nextTick(() => {
          myChart.setOption(materialData, true)
          myChart.resize()
        })
      });
      // 更改series数据 拖拽 量度 触发
      watch(()=>props.element.xAxisArr.length, (nweProps, oldProps) => {
        const materialData = props.element.materialData
        let getLineData1 = getData(objectData.value)
        var ylists1 = getYList(getLineData1, axisYList.value);
        materialData.xAxis.data = getYList(getLineData1, axisXList.value)[0] || []; // X轴数据
        materialData.series.forEach((item, i) => {
            item.data = ylists1[i]
        });
        nextTick(() => {
          myChart.setOption(materialData, true)
          myChart.resize()
        })
      });
    });
    return {
      myLine,
      style,
      myHeight,
      myWidth,
      propValue,
      canEdit: true,
    };
  },
};
</script>
<style>
.v-line {
  width: 100%;
  height: 100%;
}
</style>
