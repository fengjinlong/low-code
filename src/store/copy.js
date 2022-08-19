import store from "./index.js";
import { message } from "ant-design-vue";
import generateID from "@/utils/generateID";
import { deepCopy } from "@/utils/utils";

export default {
  state: {
    copyData: null, // 复制粘贴剪切
    isCut: false,
  },
  mutations: {
    copy(state) {
      if (!state.curComponent) {
        message.warn("请选择组件");
        return;
      }

      // 如果有剪切的数据，把它还原
      restorePreCutData(state);
      // 然后在复制
      copyData(state);

      state.isCut = false;
    },

    paste(state, isMouse) {
      if (!state.copyData) {
        message.warn("请选择组件");
        return;
      }

      const data = state.copyData.data;

      if (isMouse) {
        data.materialData.style.top = state.menuTop;
        data.materialData.style.left = state.menuLeft;
      } else {
        data.materialData.style.top += 10;
        data.materialData.style.left += 10;
      }

      data.id = generateID(state.componentData);

      store.commit("addItem", deepCopy(data));
      if (state.isCut) {
        state.copyData = null;
      }
    },

    cut(state) {
      if (!state.curComponent) {
        message.warn("请选择组件");
        return;
      }

      // 如果重复剪切，需要恢复上一次剪切的数据
      restorePreCutData(state);
      copyData(state);

      store.commit("deleteComponent");
      state.isCut = true;
    },
  },
};

// 恢复上一次剪切的数据
function restorePreCutData(state) {
  if (state.isCut && state.copyData) {
    const data = deepCopy(state.copyData.data);
    const index = state.copyData.index;
    data.id = generateID(state.componentData);
    // store.commit("addItem", { component: data, index });
    store.commit("addItem", data);
    if (state.curComponentIndex >= index) {
      // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
      state.curComponentIndex++;
    }
  }
}

function copyData(state) {
  state.copyData = {
    data: deepCopy(state.curComponent),
    index: state.curComponentIndex,
  };
}
