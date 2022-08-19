import { message } from "ant-design-vue";
export default {
  mutations: {
    topComponent(state, bar) {
      if (state.curComponentIndex < state.componentData.length - 1) {
        state.componentData.splice(state.curComponentIndex, 1);
        state.componentData.push(state.curComponent);
        if (bar) {
          state.curComponentIndex = state.componentData.length - 1;
        }
      } else {
        message.warn("已经到顶了");
      }
    },
    // 到底
    bottomComponent(state, bar) {
      // 置底
      if (state.curComponentIndex > 0) {
        state.componentData.splice(state.curComponentIndex, 1);
        state.componentData.unshift(state.curComponent);
        if (bar) {
          state.curComponentIndex = 0;
        }
      } else {
        message.warn("已经到底了");
      }
    },

    upComponent(state,bar) {
      // 上移图层 index，表示元素在数组中越往后
      if (state.curComponentIndex < state.componentData.length - 1) {
        let temp = state.componentData[state.curComponentIndex];
        state.componentData[state.curComponentIndex] = state.componentData[state.curComponentIndex + 1];
        state.componentData[state.curComponentIndex + 1] = temp;
        if (bar) {
          state.curComponentIndex++
        }
      } else {
        message.warn("已经到顶了");
      }
    },
    downComponent(state,bar) {
      // 下移图层 index，表示元素在数组中越往前
      if (state.curComponentIndex > 0) {
        let temp = state.componentData[state.curComponentIndex];
        state.componentData[state.curComponentIndex] = state.componentData[state.curComponentIndex - 1];
        state.componentData[state.curComponentIndex - 1] = temp;
        if (bar) {
          state.curComponentIndex--
        }
      } else {
        message.warn("已经到底了");
      }
    },
  },
};
