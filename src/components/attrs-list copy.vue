<template>
  <div class="attr-list">
    <!-- {{ state }} -->
    <a-form>
      <a-form-item
        v-for="({ key, label }, index) in styleKeys"
        :key="index"
        :label="label"
      >
        <a-input
          v-if="key === 'left'"
          v-model:value="state.curComponent.materialData.style[key]"
        />
        <a-input
          v-else-if="key == 'color'"
          v-model:value="state.curComponent.materialData.style[key]"
        ></a-input>
        <a-input
          v-else-if="key == 'opacity'"
          v-model:value="state.curComponent.materialData.style[key]"
        ></a-input>
        <a-input
          v-else-if="key == 'borderColor'"
          v-model:value="state.curComponent.materialData.style[key]"
        ></a-input>
        <a-input
          v-else-if="key == 'backgroundColor'"
          v-model:value="state.curComponent.materialData.style[key]"
        ></a-input>
        <a-select
          v-else-if="selectKey.includes(key)"
          v-model:value="state.curComponent.materialData.style[key]"
        >
          <template v-if="key == 'textAlign'">
            <a-select-option
              v-for="item in textAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-select-option>
          </template>
          <template v-else-if="key == 'borderStyle'">
            <a-select-option
              v-for="item in borderStyleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-select-option>
          </template>
          <template v-else>
            <a-select-option
              v-for="item in verticalAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-select-option>
          </template>
        </a-select>
        <a-input
          v-else
          v-model:value.number="state.curComponent.materialData.style[key]"
          :type="key !== 'xAxis' ? 'number' : 'text'"
        />
      </a-form-item>
      <a-form-item
      
        label="??????"
      >
        <a-input v-model:value="state.curComponent.propValue" type="textarea" />
      </a-form-item>
    </a-form>
    <!-- ???????????? -->
    <template v-else-if="key == 'style'">
      <div>
        <a-form-item
          :label="lableFilter(label)"
        >
          <!-- ??????????????? -->
          <a-input
            v-if="label=='color' || label=='backgroundColor' || label=='borderColor'"
            style="width:40px;"
            type="color"
            v-model:value="val[label]"
          />
          <!-- ???????????? -->
          <a-radio-group v-else-if="label == 'textAlign'" v-model:value="val[label]" button-style="solid" size="small" style="margin-top:5px;">
            <a-radio-button value="left">???</a-radio-button>
            <a-radio-button value="center">???</a-radio-button>
            <a-radio-button value="right">???</a-radio-button>
          </a-radio-group>
          <!-- ???????????? -->
          <a-row v-else-if="label == 'rotate'">
            <a-col :span="15">
              <a-slider v-model:value="val[label]"  :min="0" :max="360" />
            </a-col>
            <a-col :span="1">
              <a-input-number v-model:value="val[label]" :min="0" :max="360" style="width:65px; margin-left: 1px" />
            </a-col>
          </a-row>
          <!-- ????????? -->
          <a-row v-else-if="label == 'opacity'">
            <a-col :span="15">
              <a-slider v-model:value="val[label]"  :min="0" :max="1" :step="0.01"/>
            </a-col>
            <a-col :span="1">
              <a-input-number v-model:value="val[label]" :min="0" :max="1" style="width:65px; margin-left: 1px" />
            </a-col>
          </a-row>
          <!-- ??????????????? -->
          <a-input
            v-else
            type="number"
            v-model:value="val[label]"
          />
        </a-form-item>
      </div>
    </template>
  </div>
</template>

<script>
import attrNameData from "@/utils/attrNameData";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const { state } = useStore();
    const styleKeys = computed(() => {
      if (state.curComponent) {
        const curComponentStyleKeys = Object.keys(state.curComponent.materialData.style);

        let arr = attrNameData.filter((item) =>
          curComponentStyleKeys.includes(item.key)
        );
        return arr;
      }
    });

    return {
      state,
      styleKeys,
      textAlignOptions: [
        {
          label: "?????????",
          value: "left",
        },
        {
          label: "??????",
          value: "center",
        },
        {
          label: "?????????",
          value: "right",
        },
      ],
      borderStyleOptions: [
        {
          label: "??????",
          value: "solid",
        },
        {
          label: "??????",
          value: "dashed",
        },
      ],
      verticalAlignOptions: [
        {
          label: "?????????",
          value: "top",
        },
        {
          label: "????????????",
          value: "middle",
        },
        {
          label: "?????????",
          value: "bottom",
        },
      ],
      selectKey: ["textAlign", "borderStyle", "verticalAlign"],
      // attrNameData,
    };
  },

};
</script>

<style scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>
