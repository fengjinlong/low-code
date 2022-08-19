import { createStore } from "vuex";
import contextmenu from "./contextmenu.js";
import lock from "./lock";
import snapshot from "./snapshot.js";
import layer from "./layer";
import copy from "./copy.js";
import compose from "./compose.js";
import { sessionCache } from "@/utils/cache.js";

export default createStore({
  state: {
    // copyData: null, // 复制粘贴剪切
    // isCut: false,
    // 画布尺寸
    canvasStyleData: {
      id:'',
      type: 0,
      title: "",
      firstletter: "",
      width: 800,
      height: 740,
      background: "",
      backgroundColor: "#00123A",
    },
    ...compose.state,
    ...copy.state,
    // 快照
    ...snapshot.state,
    // 右键菜单
    ...contextmenu.state,
    ...lock.state,
    componentData: [],
    curComponent: null,
    curComponentIndex: null,
    editor: null,
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
    matchedLine: null, // 匹配到的参考线 {row:[],col:[]}
    referenceLine: {
      // 参考线,用户定义的参考线
      row: [],
      col: [],
    },
    referenceLineOpened: true, // 是否打开参考线
    mainPanelScrollY: 88,
  },

  mutations: {
    ...compose.mutations,
    ...copy.mutations,
    ...layer.mutations,
    ...snapshot.mutations,
    ...contextmenu.mutations,
    ...lock.mutations,
    setCanvasName(state, payload) {
      state.canvasStyleData.title = payload.title;
      state.canvasStyleData.type = payload.type;
      state.canvasStyleData.id = payload.id;
      state.canvasStyleData.firstletter = payload.firstletter;
      state.canvasStyleData.width = payload.width;
      state.canvasStyleData.height = payload.height;
      // 临时存储画布属性信息
      sessionCache.setJSON('setCanvasName', payload);
    },
    setCanvasBg(state, payload) {
      state.canvasStyleData.background = payload;
    },
    // 清除画布背景图
    removeCanvasBg(state) {
      state.canvasStyleData.background = null;
    },
    // 隐藏组价
    hideComponent(state) {
      state.curComponent.hideStatus = true;
      state.curComponent.materialData.style.opacity = 0.4;
    },
    showComponent(state) {
      state.curComponent.hideStatus = false;
      state.curComponent.materialData.style.opacity = 1;
    },
    setComponentData(state, componentData) {
      state.componentData = componentData;
      // 临时存储 组件信息数据
      sessionCache.setJSON('setComponentData', componentData);

    },
    // 添加组件
    addItem(state, payload) {
      state.componentData.push(payload);
    },
    // 编辑器
    saveEditor(state, payload) {
      state.editor = payload;
    },
    // 修改样式
    setShapeStyle(
      { curComponent, componentData, curComponentIndex },
      { top, left, width, height, rotate, opacity }
    ) {
      // state.componentData[1].style.top = style.top
      // componentData[curComponentIndex].style.width = width;
      if (top) curComponent.materialData.style.top = top;
      if (left) curComponent.materialData.style.left = left;
      if (width) curComponent.materialData.style.width = width;
      if (height) curComponent.materialData.style.height = height;
      if (rotate) curComponent.materialData.style.rotate = rotate;
      if (opacity) curComponent.materialData.style.opacity = opacity;
    },
    // 设置当前组件
    setCurComponent(state, payload) {
      state.curComponent = payload.component;
      state.curComponentIndex = payload.index;
    },

    // 删除所有
    deleteComponentAll(state) {
      if (state.componentData === []) return;
      while (state.componentData.length > 0) {
        state.componentData.splice(0, 1);
      }
      state.curComponent = null;
      state.curComponentIndex = null;
    },
    // 删除一个组件
    deleteComponent(state, index) {
      if (index === undefined) {
        index = state.curComponentIndex;
      }

      if (index == state.curComponentIndex) {
        state.curComponentIndex = null;
        state.curComponent = null;
      }
      state.componentData.splice(index, 1);
    },

    // 标线
    setShapeSingleStyle({ curComponent }, { key, value }) {
      curComponent.style[key] = value;
    },
    setClickComponentStatus(state, status) {
      state.isClickComponent = status;
    },
    // 刻度尺
    setMatchedLine(state, data) {
      state.matchedLine = data;
    },
    removeMatchedLine(state) {
      state.matchedLine = null;
    },
    // 添加参考线
    addReferenceLine(state, payload) {
      state.referenceLine[payload.type].push(payload.position);
      // dispatch('history/push')
      // commit(MTS.ADD_REFERENCE_LINE, item)
      // state.referenceLine[payload.type].push(payload.position);
    },
    // 删除参考线
    removeReferenceLine(state, payload) {
      state.referenceLine[payload.type].splice(payload.index, 1);
    },
    setReferenceLineVisible(state, flag) {
      state.referenceLineOpened = flag;
    },
    // 更新折线图数据
    updataImportData(state, payload) {
      state.curComponent.objectData = payload;
    },
    // 更新折线图X数据
    updataXAxisList(state, payload) {
      state.curComponent.xAxisArr = payload;
    },
    // 删除折线图X数据
    removeXAxisList(state, payload) {
      state.curComponent.xAxisArr.splice(payload, 1);
    },
    // 更新折线图Y数据
    updataYAxisList(state, payload) {
      state.curComponent.yAxisArr = payload;
    },
    // 删除折线图Y数据
    removeYAxisList(state, payload) {
      state.curComponent.yAxisArr.splice(payload, 1);
      // state.referenceLine[payload.type].splice(payload.index, 1);
    },
    // 设置背景图
    setStyleBg(state, payload) {
      state.curComponent.materialData.style.backgroundImage = payload
    },
    // 清除背景图
    removeStyleBg(state, payload) {
      state.curComponent.materialData.style.backgroundImage = null
    },
    // setReferenceLineVisible(state, flag) {
    //   // console.log(flag, "flag");
    //   state.referenceLineOpened = flag;
    // },
  },
  actions: {},
});
