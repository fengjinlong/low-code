<template>
  <div class="series-line">
    <div v-for="(item, label, index) in config" :key="index">
        <!-- 判断是否是对象 -->
        <template v-if="isObj(config[label])">
        <div>
            <!-- 循环渲染 -->
            <a-collapse expandIconPosition="right">
            <a-collapse-panel :key="index" :header="lableFilter(label)">
                <div v-for="(value, la, j) in config[label]" :key="j">
                <a-form-item
                    :label="lableFilter(la)"
                >
                    <a-switch v-if="la=='show'" v-model:checked="config[label][la]" />
                    <a-select
                        ref="select"
                        v-else-if="la=='fontFamily'"
                        v-model:value="config[label][la]"
                        >
                        <a-select-option v-for="(v, k) in fontFamilyList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
                    </a-select>
                    <!-- fontWeight单选 -->
                    <a-radio-group  v-else-if="la=='fontWeight'" v-model:value="config[label][la]" button-style="solid" size="small">
                    <a-radio-button value="normal">普通</a-radio-button>
                    <a-radio-button value="bold">加粗</a-radio-button>
                    <a-radio-button value="lighter">更细</a-radio-button>
                    </a-radio-group>
                  
                    <!-- 三级对象工具栏 -->
                    <template v-else-if="isObj(config[label][la])">
                        <div v-for="(v, l, n) in config[label][la]" :key="n">
                        <a-switch v-if="l=='show'" v-model:checked="config[label][la][l]" />
                        <a-form-item
                        v-else
                        :label="lableFilter(l)"
                        >
                        <!-- 文本输入框 -->
                        <a-input
                        v-if="l=='name' || l=='text' || l=='link' || l=='subtext' || l=='sublink'"
                        v-model:value="config[label][la][l]"
                        />
                        <!-- 颜色选择器 -->
                        <color-picker v-else-if="l=='color' || l=='backgroundColor' || l=='borderColor' || l=='shadowColor' || l=='pageIconColor' || l=='pageIconInactiveColor'" pickerType="chrome" :disableHistory="true" v-model:pureColor="config[label][la][l]" v-model:gradientColor="gradientColor"/>
                        <!-- 轴线类型 -->
                        <a-radio-group v-else-if="l=='type'" v-model:value="config[label][la][l]" button-style="solid" size="small">
                        <a-radio-button value="solid">实线</a-radio-button>
                        <a-radio-button value="dashed">虚线</a-radio-button>
                        <a-radio-button value="dotted">点状线</a-radio-button>
                        </a-radio-group>
                        <a-input
                        v-else
                        type="number"
                        v-model:value="config[label][la][l]"
                        />
                        </a-form-item>
                    </div>
                    </template>
                    <!-- 系列 - 位置 下拉框 -->
                    <a-select
                            ref="select"
                            v-else-if="la=='position'"
                            v-model:value="config[label][la]"
                            >
                            <a-select-option v-for="(v, k) in positionList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
                    </a-select>
                    <!-- 描边 折线 类型 -->
                    <a-radio-group v-else-if="la=='type' || la=='borderType'" v-model:value="config[label][la]" button-style="solid" size="small">
                        <a-radio-button value="solid">实线</a-radio-button>
                        <a-radio-button value="dashed">虚线</a-radio-button>
                        <a-radio-button value="dotted">点状线</a-radio-button>
                    </a-radio-group>
                    <!-- 文本输入框 -->
                    <a-input
                    v-else-if="la=='name' || la=='formatter'"
                    v-model:value="config[label][la]"
                    />
                    <!-- 颜色选择器 -->
                    <a-input
                    v-else-if="la=='color' || la=='borderColor'"
                    style="width:40px;"
                    type="color"
                    v-model:value="config[label][la]"
                    />
                    <a-input
                    v-else
                    type="number"
                    v-model:value="config[label][la]"
                    />
                </a-form-item>
                </div>
            
            </a-collapse-panel>
					</a-collapse>
        </div>
			</template>
			<!-- 一层数据渲染 -->
			<template v-else>
        <div>
					<a-form-item
            :label="lableFilter(label)"
            >
            <!-- 开关 -->
            <a-switch v-if="label=='show' || label=='smooth' || label=='animation'" v-model:checked="config[label]" />
            <!-- 下拉框 -->
            <a-select
                ref="select"
                v-else-if="label=='fontFamily'"
                v-model:value="config[label]"
                >
                <a-select-option v-for="(v, k) in fontFamilyList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
            </a-select>
            <!-- 系列 - 拐点图形 下拉框 -->
            <a-select
                ref="select"
                v-else-if="label=='symbol'"
                v-model:value="config[label]"
                >
                <a-select-option v-for="(v, k) in symbolList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
            </a-select>
            <!-- 系列 - 动画效果 下拉框 -->
            <a-select
                ref="select"
                v-else-if="label=='animationEasing'"
                v-model:value="config[label]"
                >
                <a-select-option v-for="(v, k) in animationEasingList" :key="k" :value="v.value">{{v.lable}}</a-select-option>
            </a-select>
   
            <!-- 系列 - 类型 -->
            <a-radio-group v-else-if="label=='type'" v-model:value="config[label]" @change="typeChange(config[label])" button-style="solid" size="small">
                <a-radio-button value="bar">柱状图</a-radio-button>
                <a-radio-button value="line">折线图</a-radio-button>
            </a-radio-group>
          
            <!-- 系列 - 文本输入框 -->
            <a-input
                v-else-if="label=='name'"
                v-model:value="config[label]"
            />
            <!-- 系列 - 颜色选择器 -->
             <color-picker v-else-if="label=='color' || label=='borderColor'" pickerType="chrome" :disableHistory="true" v-model:pureColor="config.itemStyle.borderColor" v-model:gradientColor="gradientColor"/>
            <!--系列 - 数字输入框 -->
            <a-input
                v-else
                type="number"
                v-model:value="config[label]"
            />
					</a-form-item>
        </div>
			</template>
    </div>
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
    console.log(config, "config============");
    const gradientColor = ref(
      "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
    );
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
      { value: "circle", lable: "圆形" },
      { value: "rect", lable: "矩形" },
      { value: "roundRect", lable: "圆矩形" },
      { value: "triangle", lable: "三角形" },
      { value: "diamond", lable: "菱形" },
      { value: "pin", lable: "针形" },
      { value: "arrow", lable: "箭头形" },
      { value: "none", lable: "取消图标" }
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
      { value: "insideBottomRight", lable: "内右下" }
    ]);
    // // 折线图动画效果数组
    const animationEasingList = ref([
      { lable: "linear", value: "linear" },
      { lable: "quadraticIn", value: "quadraticIn" },
      { lable: "quadraticOut", value: "quadraticOut" },
      { lable: "quadraticInOut", value: "quadraticInOut" },
      { lable: "cubicIn", value: "cubicIn" },
      { lable: "cubicOut", value: "cubicOut" },
      { lable: "cubicInOut", value: "cubicInOut" },
      { lable: "quarticIn", value: "quarticIn" },
      { lable: "quarticOut", value: "quarticOut" },
      { lable: "quarticInOut", value: "quarticInOut" },
      { lable: "quinticIn", value: "quinticIn" },
      { lable: "quinticOut", value: "quinticOut" },
      { lable: "quinticInOut", value: "quinticInOut" },
      { lable: "sinusoidalIn", value: "sinusoidalIn" },
      { lable: "sinusoidalOut", value: "sinusoidalOut" },
      { lable: "sinusoidalInOut", value: "sinusoidalInOut" },
      { lable: "exponentialIn", value: "exponentialIn" },
      { lable: "exponentialOut", value: "exponentialOut" },
      { lable: "exponentialInOut", value: "exponentialInOut" },
      { lable: "circularIn", value: "circularIn" },
      { lable: "circularOut", value: "circularOut" },
      { lable: "circularInOut", value: "circularInOut" },
      { lable: "elasticIn", value: "elasticIn" },
      { lable: "elasticOut", value: "elasticOut" },
      { lable: "elasticInOut", value: "elasticInOut" },
      { lable: "backIn", value: "backIn" },
      { lable: "backOut", value: "backOut" },
      { lable: "backInOut", value: "backInOut" },
      { lable: "bounceIn", value: "bounceIn" },
      { lable: "bounceOut", value: "bounceOut" },
      { lable: "bounceInOut", value: "bounceInOut" }
    ]);
    // 判断柱状图、折线图属性展示
    const typeValue = ref("");
    const typeChange = type => {
      console.log(type, "======");
      typeValue.value = type;
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
