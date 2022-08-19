<template>
  <div class="series-line">
    <a-form-item label="类型">
       <!-- 系列 - 类型 -->
      <a-radio-group v-model:value="config.type" @change="typeChange(config[label])" button-style="solid" size="small">
          <a-radio-button value="bar">柱状图</a-radio-button>
          <a-radio-button value="line" disabled>折线图</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="名称">
        <a-input
        v-model:value="config.name"
        />
    </a-form-item>
    <a-collapse expandIconPosition="right">
      <template v-if="config['type'] == 'bar'">
          <a-collapse-panel key="1" header="柱设置">
              <a-form-item label="柱形宽度">
                  <a-radio-group @change="barWidthChange($event,config,'barWidth')" :defaultValue="config.barWidth.toString().split('%').pop() == ''? '2' : '1'" button-style="solid" >
                    <a-radio-button value="1">绝对值</a-radio-button>
                    <a-radio-button value="2">百分比</a-radio-button>
                  </a-radio-group>
                  <a-input
                  style="margin-top:5px;"
                  v-model:value="config.barWidth"
                  />
              </a-form-item>
              <a-form-item label="最小高度">
                  <a-input
                  type="number"
                  v-model:value="config.barMinHeight"
                  />
              </a-form-item>
              <a-form-item label="不同类间距">
                  <a-row>
                    <a-col :span="14">
                      <a-slider v-model:value="barGapNum" @afterChange="afterChange($event,config)" :tip-formatter="formatter" :min="-100" :max="100" />
                    </a-col>
                    <a-col :span="9">
                      <a-input-number v-model:value="barGapNum" @change="afterChange($event,config)" :min="-100" :max="100" style="width:65px; margin-left: 10px" />
                    </a-col>
                    <a-col :span="1">
                      <span style="color: #B2B2B2;line-height: 30px;">%</span>
                    </a-col>
                  </a-row>
              </a-form-item>
              <a-form-item label="同类目间距">
                  <a-row>
                    <a-col :span="14">
                      <a-slider v-model:value="barCategoryGapNum" @afterChange="afterGapChange($event,config)" :tip-formatter="formatter" :min="0" :max="100" />
                    </a-col>
                    <a-col :span="9">
                      <a-input-number v-model:value="barCategoryGapNum" @change="afterGapChange($event,config)" :min="0" :max="100" style="width:65px; margin-left: 10px" />
                    </a-col>
                    <a-col :span="1">
                      <span style="color: #B2B2B2;line-height: 30px;">%</span>
                    </a-col>
                  </a-row>
              </a-form-item>
              <a-form-item label="描边颜色">
                <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="config.itemStyle.borderColor" v-model:gradientColor="gradientColor"/>
              </a-form-item>
              <a-form-item label="描边宽度">
                  <a-input
                  type="number"
                  v-model:value="config.itemStyle.borderWidth"
                  />
              </a-form-item>
              <a-form-item label="描边类型">
                <a-radio-group v-model:value="config.itemStyle.borderType" button-style="solid" size="small">
                  <a-radio-button value="solid">实线</a-radio-button>
                  <a-radio-button value="dashed">虚线</a-radio-button>
                  <a-radio-button value="dotted">点状线</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="圆角">
                <a-input-number v-model:value="config.itemStyle.borderRadius" :min="0" :max="1000" style="width:100%"/>
                  <!-- <a-input
                  type="number"
                  v-model:value="config.itemStyle.borderRadius"
                  /> -->
              </a-form-item>
          
          </a-collapse-panel>
          <a-collapse-panel key="2" header="柱背景">
              <a-form-item label="显示柱背景">
                <a-switch v-model:checked="config.showBackground" />
              </a-form-item>
              
              <a-form-item label="颜色">
                <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="config.backgroundStyle.color" v-model:gradientColor="gradientColor"/>
              </a-form-item>
              <a-form-item label="描边颜色">
                <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="config.backgroundStyle.borderColor" v-model:gradientColor="gradientColor"/>
              </a-form-item>
              <a-form-item label="描边宽度">
                  <a-input
                  type="number"
                  v-model:value="config.backgroundStyle.borderWidth"
                  />
              </a-form-item>
              <a-form-item label="描边类型">
                <a-radio-group v-model:value="config.backgroundStyle.borderType" button-style="solid" size="small">
                  <a-radio-button value="solid">实线</a-radio-button>
                  <a-radio-button value="dashed">虚线</a-radio-button>
                  <a-radio-button value="dotted">点状线</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="圆角">
                <a-input-number v-model:value="config.backgroundStyle.borderRadius" :min="0" :max="1000" style="width:100%"/>
              </a-form-item>
          
          </a-collapse-panel>
      </template>
      <template v-else-if="config['type'] == 'line'">
        <a-collapse-panel key="3" header="折线样式">
          <a-form-item label="平滑曲线">
            <a-switch v-model:checked="config.smooth" />
          </a-form-item>
          <a-form-item label="线颜色">
            <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="config.lineStyle.color" v-model:gradientColor="gradientColor"/>
          </a-form-item>
          <a-form-item label="宽度">
            <a-input
            type="number"
            v-model:value="config.lineStyle.width"
            />
          </a-form-item>
          <a-form-item label="类型">
            <a-radio-group v-model:value="config.lineStyle.type" button-style="solid" size="small">
              <a-radio-button value="solid">实线</a-radio-button>
              <a-radio-button value="dashed">虚线</a-radio-button>
              <a-radio-button value="dotted">点状线</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="拐点样式">
            <a-form-item label="拐点图形">
              <a-select
                ref="select"
                v-model:value="config.symbol"
                >
                <a-select-option v-for="(v, k) in symbolList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
            </a-select>
            </a-form-item>
            <a-form-item label="拐点大小">
              <a-input
                type="number"
                v-model:value="config.symbolSize"
                />
            </a-form-item>
            <a-form-item label="颜色">
              <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="config.itemStyle.color" v-model:gradientColor="gradientColor"/>
            </a-form-item>
            <a-form-item label="描边颜色">
              <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="config.itemStyle.borderColor" v-model:gradientColor="gradientColor"/>
            </a-form-item>
            <a-form-item label="描边宽度">
                <a-input
                type="number"
                v-model:value="config.itemStyle.borderWidth"
                />
            </a-form-item>
            <a-form-item label="描边类型">
              <a-radio-group v-model:value="config.itemStyle.borderType" button-style="solid" size="small">
                <a-radio-button value="solid">实线</a-radio-button>
                <a-radio-button value="dashed">虚线</a-radio-button>
                <a-radio-button value="dotted">点状线</a-radio-button>
              </a-radio-group>
            </a-form-item>
        </a-collapse-panel>
      </template>
      <a-collapse-panel key="5" header="文本标签">
        <a-form-item label="显示">
          <a-switch v-model:checked="config.label.show" />
        </a-form-item>
        <a-form-item label="内容格式">
          <a-input v-model:value="config.label.formatter" />
        </a-form-item>
        <a-form-item label="位置">
         	<a-select
              ref="select"
              v-model:value="config.label.position"
              >
              <a-select-option v-for="(v, k) in positionList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="颜色">
          <color-picker pickerType="chrome" :disableHistory="true" v-model:pureColor="config.label.color" v-model:gradientColor="gradientColor"/>
        </a-form-item>
        <a-form-item label="字体大小">
          <a-input type="number" v-model:value="config.label.fontSize" />
        </a-form-item>
        <a-form-item label="字体粗细">
          <a-radio-group v-model:value="config.label.fontWeight" button-style="solid" size="small">
            <a-radio-button value="normal">普通</a-radio-button>
            <a-radio-button value="bold">加粗</a-radio-button>
            <a-radio-button value="lighter">更细</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="字体">
         	<a-select
            ref="select"
            v-model:value="config.label.fontFamily"
            >
            <a-select-option v-for="(v, k) in fontFamilyList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel key="6" header="初始动画">
        <a-form-item label="开启动画">
           <a-switch v-model:checked="config.animation" />
        </a-form-item>
        <a-form-item label="动画时长">
          <a-input type="number" v-model:value="config.animationDuration" />
        </a-form-item>
        <a-form-item label="动画效果">
          <a-select
              ref="select"
              v-model:value="config.animationEasing"
              >
              <a-select-option v-for="(v, k) in animationEasingList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { getStyle } from "@/utils/style";
import { defineComponent, ref, computed } from "vue";
import { seriesNameData } from "@/utils/attrNameData";
import { filter } from "minimatch";
export default {
  components: {},
  props: {
    config: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  setup(props) {
    // const config = props.config;
    const config = computed(() => {
      const configs = props.config;
      return configs;
    });
    // 处理 不同类间距 百分号值问题
    let barGapNum = ref('')
    if (props.config.barGap) {
      barGapNum.value = Number(props.config.barGap.toString().split('%').shift());
    }
    const afterChange = (self,data)=> {
      console.log(self,data,'self,data')
      data.barGap = self+'%';
    }
    // 处理 同类间距 百分号值问题
     let barCategoryGapNum = ref('')
    if (props.config.barGap) {
      barCategoryGapNum.value = Number(props.config.barCategoryGap.toString().split('%').shift());
    }
    const afterGapChange = (self,data)=> {
      data.barCategoryGap = self+'%';
    }
    const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");
    // 字体集合
    const fontFamilyList = ref([
      { value: "Microsoft YaHei", lable: "微软雅黑" },
      { value: "SimHei", lable: "黑体" },
      { value: "SimSun", lable: "宋体" },
      { value: "KaiTi", lable: "楷体" },
      { value: "FangSong", lable: "仿宋" }
    ]);
    // 拐点图形 集合
    const symbolList = ref([
 			{value: 'circle', lable: '圆形'},
			{value: 'rect', lable: '矩形'},
			{value: 'roundRect', lable: '圆矩形'},
			{value: 'triangle', lable: '三角形'},
			{value: 'diamond', lable: '菱形'},
			{value: 'pin', lable: '针形'},
			{value: 'arrow', lable: '箭头形'},
			{value: 'none', lable: '取消图标'}
    ]);
    // position集合
    const positionList = ref([
      { value: "top", lable: "上" },
      { value: "left", lable: "左" },
      { value: "right", lable: "右" },
      { value: "bottom", lable: "下" },
      { value: "inside", lable: "内" },
      { value: "insideLeft", lable: "内左" },
      { value: "insideRight", lable: "内右" },
      { value: "insideTop", lable: "内上" },
      { value: "insideBottom", lable: "内下" },
      { value: "insideTopLeft", lable: "内左上" },
      { value: "insideBottomLeft", lable: "内左下" },
      { value: "insideTopRight", lable: "内右上" },
      { value: "insideBottomRight", lable: "内右下" },
    ]);
    // // 折线图动画效果数组
    const animationEasingList = ref([
        {lable: 'linear', value: 'linear'},
        {lable: 'quadraticIn', value: 'quadraticIn'},
        {lable: 'quadraticOut', value: 'quadraticOut'},
        {lable: 'quadraticInOut', value: 'quadraticInOut'},
        {lable: 'cubicIn', value: 'cubicIn'},
        {lable: 'cubicOut', value: 'cubicOut'},
        {lable: 'cubicInOut', value: 'cubicInOut'},
        {lable: 'quarticIn', value: 'quarticIn'},
        {lable: 'quarticOut', value: 'quarticOut'},
        {lable: 'quarticInOut', value: 'quarticInOut'},
        {lable: 'quinticIn', value: 'quinticIn'},
        {lable: 'quinticOut', value: 'quinticOut'},
        {lable: 'quinticInOut', value: 'quinticInOut'},
        {lable: 'sinusoidalIn', value: 'sinusoidalIn'},
        {lable: 'sinusoidalOut', value: 'sinusoidalOut'},
        {lable: 'sinusoidalInOut', value: 'sinusoidalInOut'},
        {lable: 'exponentialIn', value: 'exponentialIn'},
        {lable: 'exponentialOut', value: 'exponentialOut'},
        {lable: 'exponentialInOut', value: 'exponentialInOut'},
        {lable: 'circularIn', value: 'circularIn'},
        {lable: 'circularOut', value: 'circularOut'},
        {lable: 'circularInOut', value: 'circularInOut'},
        {lable: 'elasticIn', value: 'elasticIn'},
        {lable: 'elasticOut', value: 'elasticOut'},
        {lable: 'elasticInOut', value: 'elasticInOut'},
        {lable: 'backIn', value: 'backIn'},
        {lable: 'backOut', value: 'backOut'},
        {lable: 'backInOut', value: 'backInOut'},
        {lable: 'bounceIn', value: 'bounceIn'},
        {lable: 'bounceOut', value: 'bounceOut'},
        {lable: 'bounceInOut', value: 'bounceInOut'}
    ]);
    // 判断柱状图、折线图属性展示
    const typeValue = ref('')
    const typeChange = (type) => {
      console.log(type, '======')
      typeValue.value = type
    }
    // 柱状图 宽度类型切换 
    const barWidthChange = (e,val,label) => {
      console.log(e,label)
      // 绝对值
      if (e.target.value == '1') {
        val[label] = val[label].toString().split('%').shift();
      } else { // 百分比
        val[label] = val[label] +'%'
      }
    }
    const formatter = (value) => {
      return `${value}%`;
    };
    // 展示lable
    const lableFilter = val => {
      let arr = seriesNameData.filter(item => {
        return val == item.key;
      });
      return (arr[0] && arr[0].label) || "";
    };
    // 判断是否是object
    const isObj = object => {
      return (
        object &&
        typeof object == "object" &&
        Object.prototype.toString.call(object).toLowerCase() ==
          "[object object]"
      );
    };
    return {
      barGapNum,
      afterChange,
      barCategoryGapNum,
      afterGapChange,
      formatter,
      barWidthChange,
      gradientColor,
      typeChange,
      typeValue,
			fontFamilyList,
			symbolList,
			positionList,
			animationEasingList,
      lableFilter,
      isObj,
      config,
      getStyle,

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
</style>
