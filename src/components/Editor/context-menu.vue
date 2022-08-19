<template>
  <div
    v-show="state.menuShow && ctrlKey"
    class="contextmenu"
    :style="{ top: state.menuTop - 8 + 'px', left: state.menuLeft + 'px' }"
  >
    <ul @mouseup="handleMouseUp">
      <template v-if="state.curComponent">
        <template
          v-if="!state.curComponent.isLock && !state.curComponent.hideStatus"
        >
          <li @click="copy">复制</li>
          <li @click="paste">粘贴</li>
          <li @click="cut">剪切</li>
          <li @click="deleteComponent">删除</li>
          <li @click="lock">锁定</li>
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
          <li @click="hideComponent">隐藏</li>
          <li @click="upComponentMenu">上移</li>
          <li @click="downComponentMenu">下移</li>
        </template>

        <template
          v-if="state.curComponent.isLock && state.curComponent.hideStatus"
        >
          <li @click="unlock">解锁</li>
          <li @click="showComponent">显示</li>
        </template>
        <template
          v-if="state.curComponent.isLock && !state.curComponent.hideStatus"
        >
          <li @click="unlock">解锁</li>
        </template>
        <template
          v-if="!state.curComponent.isLock && state.curComponent.hideStatus"
        >
          <li @click="showComponent">显示</li>
        </template>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {
  topComponent,
  downComponent,
  upComponent,
  bottomComponent,
} from "@/common/layer";
import { onMounted,computed } from "vue";
import Bus from "@/utils/bus";

export default {
  setup() {
    const { state, commit } = useStore();
    onMounted(() => {
      Bus.on("copy", copy);
    });
    const copy = () => {

        commit("copy");
    }
    const ctrlKey = computed(() => {
      console.log('-----')
      console.log(window.event.ctrlKey)
      return !window.event.ctrlKey
    })
    return {
      state,
      ctrlKey,
      downComponentMenu() {
        downComponent();
        // commit("recordSnapshot");
      },
      upComponentMenu() {
        upComponent();
        // commit("recordSnapshot");
      },
      cut() {
        commit("cut");
      },

      copy,

      paste() {
        commit("paste", true);
        commit("recordSnapshot");
      },
      lock() {
        commit("lock");
      },
      unlock() {
        commit("unlock");
      },
      deleteComponent() {
        commit("deleteComponent");
        commit("recordSnapshot");
      },
      hideComponent() {
        commit("hideComponent");
      },
      showComponent() {
        commit("showComponent");
      },
      handleMouseUp() {
        commit("setClickComponentStatus", true);
      },
      bottomComponent,
      topComponent,
    };
  },

  // // 点击菜单时不取消当前组件的选中状态
  // handleMouseUp() {
  //     this.$store.commit('setClickComponentStatus', true)
  // },
};
</script>

<style scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;
}
.contextmenu ul {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  padding: 6px 0;
}

.contextmenu ul li {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}

.contextmenu ul li:hover {
  background-color: #f5f7fa;
}
</style>
