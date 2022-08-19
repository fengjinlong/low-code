import generateID from "@/utils/generateID";
import store from "./index";
import Bus from "@/utils/bus";
import decomposeComponent from "@/utils/decomposeComponent";
import {
  commonStyle,
  commonAttr,
} from "@/custom-component/left-components-data";
import createGroupStyle from "@/utils/createGroupStyle";

export default {
  state: {
    areaData: {
      // 选中区域包含的组件以及区域位移信息
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
      components: [],
    },
  },
  mutations: {
    setAreaData(state, data) {
      console.log('00000000');
      console.log(data);
      state.areaData = data;
    },
    // compose({ componentData, areaData, editor }) {
    compose(state) {
      const components = [];
      state.areaData.components.forEach((component) => {
        if (component.component !== "Group") {
          components.push(component);
        } else {
          // 如果要组合的组件中，已经存在组合数据，则需要提前拆分
          const parentStyle = { ...component.materialData.style };
          const subComponents = component.propValue;
          const editorRect = state.editor.getBoundingClientRect();

          subComponents.forEach((component) => {
            decomposeComponent(component, editorRect, parentStyle);
          });

          components.push(...component.propValue);
        }
      });

      const groupComponent = {
        id: generateID(state.componentData),
        component: "Group",
        componentType: "11111",
        ...commonAttr,
        // label: "group",
        label: "组合",
        layerBg: "fl.png",
        materialData: {
          style: {
            ...commonStyle,
            ...state.areaData.style,
          },
        },
        propValue: components,
      };

      createGroupStyle(groupComponent);
      store.commit("addItem", groupComponent);

      // // Bus.emit("hideArea");

      store.commit("batchDeleteComponent", state.areaData.components);
      store.commit("setCurComponent", {
        component: state.componentData[state.componentData.length - 1],
        index: state.componentData.length - 1,
      });

      state.areaData.components = [];
    },
    // 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经从 componentData 挪到 Group 组件中了
    batchDeleteComponent(state, deleteData) {
      deleteData.forEach((component) => {
        for (let i = 0, len = state.componentData.length; i < len; i++) {
          if (component.id == state.componentData[i].id) {
            state.componentData.splice(i, 1);
            break;
          }
        }
      });
    },
    decompose(state) {
      const parentStyle = { ...state.curComponent.materialData.style };
      const components = state.curComponent.propValue;
      const editorRect = state.editor.getBoundingClientRect();

      store.commit("deleteComponent");
      components.forEach((component) => {
        decomposeComponent(component, editorRect, parentStyle);
        store.commit("addItem",  component );
      });
    },
  },
};
