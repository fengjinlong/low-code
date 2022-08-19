export default {
  state: {
    menuTop: 150,
    menuLeft: 300,
    menuShow: false,
  },
  mutations: {
    showContextMenu(state, { top, left }) {
      state.menuShow = true;
      state.menuTop = top;
      state.menuLeft = left;
    },
    hideContextMenu(state) {
      
      state.menuShow = false;
    },
  },
};
