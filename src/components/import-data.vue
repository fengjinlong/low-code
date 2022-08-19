<template>
  <div class="import_data">
      <div class="title">数据源</div>
			<div class="content flex">
				<span>数据类型</span>
				<div class="buts">
					<!-- <a-button type="primary">静态文件</a-button> -->
					<div>静态文件</div>
					<a-button type="primary" @click="showModal">编辑数据</a-button>
				</div>
			</div>
      <div class="title">字段映射</div>
			<div class="content flex-center-wrap">
				<div>
					<span class="item_box_title">维度</span>
					<div class="item_box">
						<draggable
							class="dragArea list-group"
							:list="list1"
							:group="{ name: 'people', pull: 'clone', put: false }"
							@change="log"
							:clone="cloneX"
							item-key="id"
						>
							<template #item="{ element }">
								<div class="list-group-center">
									<div class="list-group-item">
										{{ element.name }}
									</div>
								</div>
							</template>
						</draggable>
					</div>
				</div>
				<div>
					<span class="item_box_title">	X轴/分类轴</span>
					<div class="item_box">
						<draggable
							class="dragArea list-group"
							:list="xAxisList"
							group="people"
							@change="log"
							item-key="id"
						>
							<template #item="{ element, index }">
								<div class="flex-center list-group-center">
									<span class="list-group-item ">{{ element.name }}</span>
									<img :src="icon_project_del" alt=""  @click="removeX(index)">
								</div>
							</template>
						</draggable>
					</div>
				</div>
				<div>
					<span class="item_box_title">量度</span>
					<div class="item_box">
						<draggable
							class="dragArea list-group"
							:list="list3"
							:group="{ name: 'number', pull: 'clone', put: false }"
							:clone="cloneY"
							@change="log"
							item-key="id"
						>
							<template #item="{ element }">
								<div class="list-group-center">
									<div class="list-group-item">
										{{ element.name }}
									</div>
								</div>
							</template>
						</draggable>
					</div>
				</div>
				<div>
					<span class="item_box_title">	y轴/值轴</span>
					<div class="item_box">
						<draggable
							class="dragArea list-group"
							:list="yAxisList"
							group="number"
							@change="log"
							item-key="id"
						>
							<template #item="{ element, index }">
								<div class="flex-center list-group-center">
									<span class="list-group-item ">{{ element.name }}</span>
									<img :src="icon_project_del" alt=""  @click="removeY(index,element)">
								</div>
							</template>
						</draggable>
					</div>
				</div>
			</div>
			<!-- 编辑json数据 -->
			<code-editor v-if="show" v-model:value="textarea1" @cancel:value="updateData"></code-editor>
  </div>
</template>
<script>
import {
  BarChartOutlined,
  FormOutlined,
  BarsOutlined
} from "@ant-design/icons-vue";
import draggable from 'vuedraggable'
import codeEditor from '@/components/code.vue'
import { ref, reactive, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";
import { deepCopy } from "@/utils/utils";
import { nextTick } from 'q';
export default {
  components: {
    BarChartOutlined,
    BarsOutlined,
		FormOutlined,
		draggable,
		codeEditor
	},
	props: {
		//获取组件静态数据
    importData: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
		// const { state, commit } = useStore();
		const store = useStore();
    const { state, commit } = store;
		const activeKey = ref(1);
		const show = ref(false);
		const icon_project_del = require('@/assets/images/icon_project_del.png');
		// let importData = props.importData;
		// const importData = computed(() => {
		// 	return JSON.stringify(props.importData, null, "\t");
    // });
		// const xAxisList = computed({
    // 	get() {
    //     return store.state.curComponent.xAxisArr
    //   },
    //   set(val) {
		// 		console.log(val,'set')
    //     store.dispatch('updataXAxisList', val)
    //   }
    // });
		const xAxisList = computed(() => {
      if (state.curComponent && state.curComponent.xAxisArr) {
        return state.curComponent.xAxisArr;
      }
    });
		const yAxisList = computed(() => {
		 if (state.curComponent && state.curComponent.yAxisArr) {
        return state.curComponent.yAxisArr;
      }
		});
		const textarea1 = ref([]);
		// 显示数据弹窗
		const showModal = () => {
			textarea1.value = JSON.stringify(props.importData, null, "\t")
			show.value = true;
		}
		// 修改数据 关闭弹窗
		const updateData = (data) => {
			textarea1.value = JSON.stringify(data, null, "\t")
			props.importData = data;
			// textarea1.value = data;
			commit('updataImportData',data)
		
			let listDefault = computedListGroup(listGroup(data));
			list1.value = listDefault.keys
			// xAxisList.value = deepCopy(listDefault.keys)
			commit('updataXAxisList', deepCopy(listDefault.keys))
			list3.value = listDefault.values
			commit('updataYAxisList', deepCopy(listDefault.values))
			show.value = false;
		}
		// 判断是否为字符串
		const isString = (str) => {
			return ((str instanceof String) || (typeof str).toLowerCase() == 'string');
		}
		const listGroup = (list) => {
			var keys = []; //维度
			var values = []; //度量
			if (Array.isArray(list)) {
				for(var i = 0; i < list.length; i++) {
						for( var j in list[i]) {
								if (isString(list[i][j])) { //如果值是字符串
										if (keys.indexOf(j) == -1) {
												keys.push(j);
										}
								} else {
										if (values.indexOf(j) == -1) {
												values.push(j);
										}   
								}
						}
				}
			} else { //obj
				for( var i in list) {
						if (isString(list[i])) { //如果值是字符串
								if (keys.indexOf(i) == -1) {
										keys.push(i);
								}
						} else {
								if (values.indexOf(i) == -1) {
										values.push(i);
								}   
						}
				}
			}

			return {keys:keys,values:values}; // {key:[x],value:[y1,y2,y3]}
		}
		// 生成拖拽标签
		const computedListGroup = (obj) => {
			var keys = []; //维度
			var values = []; //度量
			if (!(obj.keys && obj.values)) return {}; 
				obj.keys.forEach(function(item, i) {
						var keyObj = {
								name: item,
								id: i
						}
						keys.push(keyObj)
				})
				obj.values.forEach(function(item, i) {
						var valueObj = {
								name: item,
								id: i
						}
						values.push(valueObj);
				})
			return {keys:keys,values:values}
		}
		// 生成拖拽后的 x/y轴数据标签
		const axisGroup = (allArr, axisArr) => {
			var newGroup = [];
				for(var i = 0; i < axisArr.length; i++) {
					for(var j = 0; j < allArr.length; j++) {
						if (axisArr[i].name == allArr[j].name) {
							newGroup.push(allArr[j])
						}
					}
				}
				return newGroup;
		}
		// 进入页面展示初始 维度、量度数组数据
		textarea1.value = JSON.stringify(props.importData, null, "\t");
		// let listDefault = computedListGroup(listGroup(props.importData));
		let listDefault = computed(() => {
			return computedListGroup(listGroup(props.importData));
		}) 

		const list1 = ref(listDefault.value.keys);
		commit('updataXAxisList', axisGroup(listDefault.value.keys,xAxisList.value))
		const list3 = ref(listDefault.value.values);
		commit('updataYAxisList', axisGroup(listDefault.value.values,yAxisList.value))
		/*更改弹窗数据 重新渲染 维度量度*/
		watch(()=>listDefault.value, (nweProps, oldProps) => {
				list1.value = nweProps.keys
				commit('updataXAxisList', axisGroup(nweProps.keys,xAxisList.value))
				list3.value = nweProps.values
				commit('updataYAxisList', axisGroup(nweProps.values,yAxisList.value))
		});
	  const log = (evt) => {
			window.console.log(evt,list1.value,xAxisList.value,list3.value,yAxisList.value);	
		}
		// 处理数据 拖拽 不能重复拖拽
		const cloneX = (evt) => {
			let ret2 = xAxisList.value.findIndex((v) => { // 当返回-1时，则说明objArr中没有
					return v.id == evt.id;
			});
			if(ret2 == -1) {
			  return evt;
			} else {
				return
			}   
    }
		const cloneY = (evt) => {
			let ret2 = yAxisList.value.findIndex((v) => { // 当返回-1时，则说明objArr中没有
					return v.id == evt.id;
			});
			if(ret2 == -1) {
			  return evt;
			} else {
				return
			}   
		}
		// 数据删除
		const removeX = (idx) => {
			// xAxisList.value.splice(idx, 1);
			commit('removeXAxisList', idx)
		}
		const removeY = (idx, item) => {
			console.log(idx,item,'idx')
			// props.importData 更新后的数据
			console.log(props.importData,listDefault.value,textarea1.value,'textarea1.value')	
			commit('removeYAxisList', idx)
		}
    return {
			// importData,
			cloneX,
			cloneY,
			isString,
			updateData,
			showModal,
			show,
			icon_project_del,
			activeKey,
			textarea1,
			list1,
			xAxisList,
			list3,
			yAxisList,
			log,
			removeX,
			removeY
    };
  }
};
</script>
<style scoped lang="less">
.flex {
  display: flex;
}
.flex-center {
  display: flex;
	justify-content: space-between;
	align-items: center;
}
.flex-center-wrap {
  display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}
/*修改滚动条样式*/
div::-webkit-scrollbar{
  width:2px;
  height:10px;
  /**/
}
div::-webkit-scrollbar-track{
  background: #09324d;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #2da3bd;
  border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #333;
}
div::-webkit-scrollbar-corner{
  background: #179a16;
}
.import_data {
	background: #0f203d;
	overflow: auto;
	height: 100%;
	max-height: 700px;
	margin-top: -15px;
  .title {
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-bottom: 1px solid #1D407D; 
		font-size: 18px;
		font-weight: 400;
		color: #1F93CB;
	}
	.content {
		padding: 24px;
		border-bottom: 1px solid #1D407D; 
		span {
			font-size: 15px;
			font-weight: 400;
			color: #B3B3B3;
			margin-right: 20px;
		}
		.buts{
			width: 100px;
			div {
				width: 88px;
				height: 32px;
				line-height: 32px;
				text-align: center;
				background: #1D407D;
				border-radius: 2px;
				color: #03DAC5;
				margin-bottom: 10px;
			}
			button {
				margin-bottom: 20px;
			}
		}
		.item_box_title {
			font-size: 15px;
			font-weight: 400;
			color: #B3B3B3;
		}
		.item_box {
			width:150px;
			min-height: 150px;
			background: #031A2E;
			border: 1px solid #132A53;
			border-radius: 6px;
			padding: 5px;
			max-height: 220px;
			height: 100%;
			overflow: auto;
			margin: 5px 0 15px;
			.list-group {
				height: 100%;
				max-height: 220px;
				min-height: 150px;
			}
			.list-group-center {
				margin-bottom: 5px;
				.list-group-item {
					width: 110px;
					height: 30px;
					background: #09324d;
					border-radius: 4px;
					font-size: 16px;
					font-weight: 400;
					color: #808080;
				}
				img {
					cursor: pointer;
				}
			}
		}
	}
}
</style>
