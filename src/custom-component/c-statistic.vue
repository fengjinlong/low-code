<template>
  <div class="v-statistic">
    <div style="width:100%;height:100%">
			<!-- <a-card> -->
				<a-statistic
						:value="valFlag? '0' : objectData.value"
						:precision="2"
						:value-style="getShapeStyle(number)"
						class="statistic-class"
						:style="getShapeStyle(style.componentStyle)"
				>
					<template #title>
						<span v-if="!desFlag" :style="getShapeStyle(title)">{{objectData.des}}</span>
					</template>
					<template #suffix>
              <span :style="getShapeStyle(number.suffix)">{{number.suffix.content}}</span>
					</template>
					<template #prefix>
            <span :style="getShapeStyle(number.prefix)">{{number.prefix.content}}</span>
					</template>
				</a-statistic>
			<!-- </a-card> -->
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
export default {
  props: {
    propValue: {
      type: String,
      default: ""
    },
    element: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const style = props.element.materialData.style;
    const title = props.element.materialData.title;
    const number = props.element.materialData.number;
    const objectData = computed(() => {
      return props.element.objectData;
    }) 
    // console.log(props.element,'props.element')
    const propValue = computed(() => {
      return props.propValue;
		});
		const getShapeStyle = (style) => {
      const result = {};
      [ "fontSize",'paddingLeft','marginLeft'].forEach(
        (attr) => {
          result[attr] = style[attr] + "px";
        }
      );
      ["color", "content", "fontWeight"].forEach((attr) => {
        result[attr] = style[attr];
      });
      ["display", "justifyContent", "alignItems","flexWrap","flexDirection","textAlign"].forEach((attr) => {
        result[attr] = style[attr];
      });
      ["flexFlow"].forEach((attr) => {
        if (style[attr]) {
          if (style[attr] == '1') {
            result['flexWrap'] = 'wrap'
            result['flexDirection'] = 'column'
          } else if (style[attr] == '2') {
            result['flexWrap'] = 'nowrap'
            result['flexDirection'] = 'row'
          } else if (style[attr] == '3') {
            result['flexWrap'] = 'wrap'
            result['flexDirection'] = 'column-reverse'
          } else if (style[attr] == '4') {
            result['flexWrap'] = 'wrap'
            result['flexDirection'] = 'row'
          }
        }
      });
      return result;
    };
    const valFlag = ref(false);
    // 更改series数据 拖拽 量度 触发
    watch(()=>props.element.yAxisArr.length, (nweProps, oldProps) => {
      if (!nweProps) { //移除数据
        valFlag.value = true
      } else {
        valFlag.value = false
      }
    });
    const desFlag = ref(false);
    // 更改series数据 拖拽 量度 触发
    watch(()=>props.element.xAxisArr.length, (nweProps, oldProps) => {
      if (!nweProps) { //移除数据
        desFlag.value = true
      } else {
        desFlag.value = false
      }
    });
    return {
      valFlag,
      desFlag,
      objectData,
      style,
      title,
      number,
      propValue,
      getShapeStyle,
      canEdit: true
    };
  }
};
</script>
<style>
.v-statistic {
  display: inline-block;
  line-height: 1;
  border: none;

  white-space: nowrap;
  cursor: pointer;
  background: transparent;

  /* color: #606266; */
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  width: 100%;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}
.v-statistic:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}
.statistic-class {
  width: 100%;
  height: 100%;
}
.ant-statistic-title {
  width: 100%;
}
.ant-statistic-content{
  width: 100%;
}
</style>
