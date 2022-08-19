<template>
  <div class="component-list" @dragstart="handleDragStart">
    <a-tabs
      v-model:activeKey="activeKey"
      tab-position="top"
      style="height: 100%; overflow-y: scroll; color: #b3b3b3"
    >
      <a-tab-pane :key="1" tab="组件">
        <a-row type="flex" style="height: 100%">
          <a-col flex="48px">
            <ul class="uul height-80">
              <li
                class="li"
                :class="{ curr: currClass === i }"
                v-for="i in commonType"
                :key="i"
                @click="currClass = i"
              >
              
                <template v-if="i === 1">
                   <img v-if="i == currClass" :src="icon_left_img_checked" class="iconImg" alt="">
                   <img v-else :src="icon_left_img" class="iconImg" alt="">
                </template>
                <template v-if="i === 2">
                   <img v-if="i == currClass" :src="icon_title_checked" class="iconImg" alt="">
                   <img v-else :src="icon_title" class="iconImg" alt="">
                </template>
                <template v-if="i === 3">
                   <img v-if="i == currClass" :src="icon_left_bar_checked" class="iconImg" alt="">
                   <img v-else :src="icon_left_bar" class="iconImg" alt="">
                </template>
                <!-- <FormOutlined v-show="i === 3" />
                <BarChartOutlined v-show="i === 1" />
                <BarsOutlined v-show="i === 2" />
                <BarsOutlined v-show="i === 4" />
                <BarsOutlined v-show="i === 5" />
                <BarsOutlined v-show="i === 6" /> -->
              </li>
            </ul>
          </a-col>
          <a-col flex="auto">
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 310px;
                padding: 0 10px;
              "
            >
              <div
                v-for="(item, index) in componentList"
                :key="index"
                v-show="currClass === item.componentType * 1"
                class="list"
                :draggable="true"
                :data-index="index"
              >
                <div class="com-left-img-con">
                  <div
                    class="com-left-img"
                    :style="{
                      background: `url(${require('../assets/images/' +
                        item.layerBg)}) no-repeat`,
                      'background-size': '100% 100%',
                    }"
                  ></div>
                </div>
                <div class="com-left-name">{{ item.label }}</div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-tab-pane>

      <a-tab-pane :key="2" tab="图层">
        <div
          v-for="(ele, index) in state.componentData"
          :key="ele"
          class="layer"
          @click="getCurComponent(ele, index)"
          :class="{
            hide: ele.hideStatus,
            isCurComponent: state.curComponentIndex === index,
          }"
        >
          <div class="layer-bg">
            <img :src="require('../assets/images/' + ele.layerBg)" />
          </div>
          <div class="layer-name">
            {{ ele.label }}
          </div>
          <LockOutlined
            v-show="ele.isLock"
            style="
              color: #1893f4;
              font-size: 24px;
              position: absolute;
              right: 24px;
              top: 18px;
            "
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import {
  BarChartOutlined,
  FormOutlined,
  BarsOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import componentList, {
  commonType,
} from "@/custom-component/left-components-data";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    BarChartOutlined,
    LockOutlined,
    BarsOutlined,
    FormOutlined,
  },
  setup() {
    const { state, commit } = useStore();
    const icon_title_checked = require('@/assets/images/icon_title_checked.png')
    const icon_title = require('@/assets/images/icon_title.png')
    const icon_left_bar_checked = require('@/assets/images/icon_left_bar_checked.png')
    const icon_left_bar = require('@/assets/images/icon_left_bar.png')
    const icon_left_img_checked = require('@/assets/images/icon_left_img_checked.png')
    const icon_left_img = require('@/assets/images/icon_left_img.png')
    const handleDragStart = (e) => {
      e.dataTransfer.setData("index", e.target.dataset.index);
    };

    const activeKey = ref(1);
    const currClass = ref(1);

    const getCurComponent = (component, index) => {
      commit("setCurComponent", {
        component,
        index,
      });
    };
    return {
      icon_title_checked,
      icon_title,
      icon_left_bar_checked,
      icon_left_bar,
      icon_left_img_checked,
      icon_left_img,
      state,
      getCurComponent,
      handleDragStart,
      activeKey,
      componentList,
      commonType,
      currClass,
    };
  },
};
</script>
<style>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
}

.list {
  width: 140px;
  cursor: grab;
  text-align: center;
}

.list:active {
  cursor: grabbing;
}

.iconfont {
  margin-right: 4px;
  font-size: 20px;
}
.iconImg {
  width: 16px;
}
.icon-wenben,
.icon-tupian {
  font-size: 18px;
}
.ant-tabs-line.ant-tabs.ant-tabs-top {
  width: 100%;
}
.uul {
  width: 60px;
  height: 100%;
  background-color: #132a53;
}
.li {
  width: 36px;
  height: 34px;
  line-height: 34px;
  margin: 0 auto;
  margin-bottom: 36px;

  cursor: pointer;
  text-align: center;
  background-color: transparent;
}
li.curr {
  color: red;
  background-color: rgb(19, 24, 54);
}
.layer {
  margin: 20px auto;
  padding: 4px 11px;
  position: relative;
  color: #fff;
  cursor: pointer;
  width: 368px;
  height: 88px;
  background: #0e254d;
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  border: 1px solid #0e254d;
}
.layer-bg {
  width: 87px;
  height: 80px;
  padding: 6px 10px;
  background: #173365;
  border: 1px solid #115a78;
  opacity: 0.76;
  border-radius: 2px;
}
div.com-left-name {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #b3b3b3;
  padding: 15px 0;
}
.com-left-img-con {
  width: 140px;
  height: 140px;
  background-color: #0e254d;
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 15px;
}
.com-left-img {
  width: 120px;
  height: 100px;
  margin: 0 auto;
}
.layer-bg img {
  display: block;
  width: 100%;
  height: 100%;
}
.layer-name {
  line-height: 80px;
  font-size: 16px;
  font-weight: bold;
  color: #b3b3b3;
  padding-left: 20px;
}
.layer.isCurComponent {
  border-color: #03d7c3;
}
.layer.hide {
  opacity: 0.2;
}
/* .ant-tabs-top-content.ant-tabs-content.ant-tabs-content-animated{ */
.ant-tabs .ant-tabs-top-content.ant-tabs-content-animated {
  height: 100%;
}
.ant-tabs-bar {
  border-bottom: 1px solid #12274b;
}
.ant-tabs-nav-wrap {
  background-color: #12274b;
}
</style>
