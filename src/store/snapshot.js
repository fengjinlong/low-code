// 操作快照
import store from "./index";

import { deepCopy } from "@/utils/utils";
import { sessionCache } from "@/utils/cache.js";
export default {
  state: {
    snapshotData: [],
    snapshotIndex: -1,
    // 最多保存 10 个快照
    // snapshotIndexMax: 5,
  },
  mutations: {
    undo(state) {
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--;
        const componentData =
          deepCopy(state.snapshotData[state.snapshotIndex]) || [];
        if (state.curComponent) {
          // 当前组件不在 componentData 中，去掉
          const needClean = !componentData.find(
            (component) => state.curComponent.id === component.id
          );
          if (needClean) {
            store.commit("setCurComponent", {
              component: null,
              index: null,
            });
          }
        }
        store.commit("setComponentData", componentData);

        // 暂定没有前进操作，撤销一步就pop 一次
        // state.snapshotData.pop();

      }
    },
    redo(state) {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
        store.commit(
          "setComponentData",
          deepCopy(state.snapshotData[state.snapshotIndex])
        );
      }
    },
    recordSnapshot(state) {
      // add
      state.snapshotData[++state.snapshotIndex] = deepCopy(state.componentData);
      // 在 undo 过程中，添加新的快照时，将他后面的快照清除掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slicÍe(
          0,
          state.snapshotIndex + 1
        );
      }
      // 临时存储 最后一个操作的数据
      sessionCache.setJSON('setComponentData', deepCopy(state.snapshotData).pop());
      // if (state.snapshotData.length > state.snapshotIndexMax) {
      //   state.snapshotData.shift();
      //   state.snapshotIndex--;
      // }

    },
  },
};
