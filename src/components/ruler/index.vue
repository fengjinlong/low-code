<template>
  
  <div
    :style="{
      minWidth: Number(state.canvasStyleData.width) + 50 + 'px',
      minHeight: Number(state.canvasStyleData.height) + 50  + 'px',
    }" 
    class="poster-ruler">
    <template v-if="referenceLineOpened">
      <!-- 纵向参考线 -->
      <div
        v-for="(item, index) in referenceLine.col"
        :key="'col' + index + item"
        class="reference-line column"
        :style="{ left: item + 'px' }"
        @dblclick="removeReferenceLine({ type: 'col', index })"
        @mousedown="colHandleDown($event, index)"
        @mouseenter="topMouseEnter1($event, index)"
        @mouseleave="topMouseLeave1"
      />
      <!-- 横向参考线 -->
      <div
        v-for="(item, index) in referenceLine.row"
        :key="'row' + index + item"
        class="reference-line row"
        :style="{ top: item + 'px', ...rowElPositionFix }"
        @dblclick="removeReferenceLine({ type: 'row', index })"
        @mousedown="rowHandleDown($event, index)"
        @mouseenter="leftMouseEnter1($event, index)"
        @mouseleave="leftMouseLeave1"
      />
    </template>

    <!-- 顶部标尺 -->
    <div
      ref="topRuler"
      class="top-ruler"
      @mouseenter="topMouseEnter"
      @mousemove="topMouseMove"
      @mouseleave="topMouseLeave"
      @mouseup="topMouseUp"
    >
      <div
        v-if="topMoving"
        class="reference-line column"
        :style="{ left: columnX + 'px' }"
      >
        <div class="tip" draggable="false" ondragstart="return false" >
         {{ columnXInRuler}}
        </div>
      </div>
    </div>
        <!-- class="reference-line column" -->
      <div
        v-if="topMoving1"
        class="clickTopTip"
        :style="{ left: columnX+10 + 'px' }"
      >
        <div>
          <span  @click.self.stop="clickTopTip" >{{ columnXInRuler }}</span>
        </div>
      </div>
    <!-- 左侧标尺 -->
    <div
      ref="leftRuler"
      class="left-ruler"
      :style="rowElPositionFix"
      @mouseenter="leftMouseEnter"
      @mousemove="leftMouseMove"
      @mouseleave="leftMouseLeave"
      @mouseup="leftMouseUp"
    >
      <div
        v-if="leftMoving"
        class="reference-line row moving"
        :style="{ top: rowY + 'px' }"
      >
        <div class="tip" draggable="false" ondragstart="return false">
          {{ rowYInRuler }}
        </div>
      </div>
    </div>
    <!-- 点击tip删除标线 -->
    <div
      v-if="leftMoving1"
      class="clickLeftTip"
      :style="{ top: rowY-30 + 'px' }"
    >
      <div>
        <span  @click.self.stop="clickLeftTip" >{{ rowYInRuler }}</span>
      </div>
    </div>
    <EyeOutlined v-show="rulerLine == true" class="showEye" @click="showRulers"/>
    <EyeInvisibleOutlined v-show="rulerLine == false" class="showEye" @click="hideRulers"/>
    <!-- 动态匹配的参考线 -->
    <matched-line :row-el-position-fix="rowElPositionFix" />
  </div>
</template>

<script>
import ruler from '@/utils/canvasRuler.js'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import matchedLine from './matchedLine'
import { ref, nextTick, computed, onMounted, getCurrentInstance, watch } from "vue";
import { useStore } from "vuex";
const LEFT_SIDE_WIDTH = 375 // 左侧边栏的宽度
const TOP_RULER_HEIGHT = 21 // 顶部标尺高度
export default {
  components: {
    matchedLine,
    EyeOutlined,
    EyeInvisibleOutlined
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const { state, commit } = store;
    const { referenceLine, mainPanelScrollY} = state;
    // const { referenceLine, referenceLineOpened, mainPanelScrollY} = state;
    const topMoving = ref(false);
    const topMoving1 = ref(false);
    const columnX = ref(0);
    const leftMoving = ref(false);
    const leftMoving1 = ref(false);
    const rowY = ref(0);
    const colHandleMoveReady = ref(false);
    const rowHandleMoveReady = ref(false);
    const rulerLine = ref(true); // 判断显示eye图标

    const showRulers = () => {
      commit("setReferenceLineVisible", false);
		  rulerLine.value = false;
    };
    const hideRulers = () => {
      commit("setReferenceLineVisible", true);
		  rulerLine.value = true;
    };
    // referenceLineOpened 显示计算
    const referenceLineOpened = computed({
      get() {
        return store.state.referenceLineOpened
      },
      set(val) {
        store.dispatch('setReferenceLineVisible', val)
      }
    });
    const columnXInRuler = computed(() => {
		  return columnX.value - TOP_RULER_HEIGHT
    });
    const rowYInRuler = computed(() => {
		  return rowY.value - 21
		  // return rowY.value - 50
    });
    const rowElPositionFix = computed(() => {
      transform: `translateY(${mainPanelScrollY}px)`
    });

    const addColumn = () => {
      // this.addReferenceLine({ type: 'col', position: this.columnX })
      commit("addReferenceLine", { type: 'col', position: columnX.value });
    }
    const addRow = () =>{
      // this.addReferenceLine({ type: 'row', position: this.rowY })
      commit("addReferenceLine", { type: 'row', position: rowY.value });
    }
    // onMounted(() => {
    //   const scrollLeft = proxy.$refs.myContentBox.$el.scrollLeft
    //   const scrollTop = proxy.$refs.myContentBox.$el.scrollTop
    //   console.log(scrollLeft,scrollTop,proxy.$refs.myContentBox.$el,'scrollLeft,scrollTop')
    // });
    // watch(()=>state.canvasStyleData.width, (nweProps, oldProps) => {
    //   nextTick(()=> {
    //     const scrollLeft = proxy.$refs.myContentBox.$el.scrollLeft
    //     const scrollTop = proxy.$refs.myContentBox.$el.scrollTop
    //     console.log(scrollLeft,scrollTop,'scrollLeft,scrollTop,watch')
    //   })
    // })
    const topMouseEnter = (e) => {
      topMoving.value = true
      topMoving1.value = false
      // +滚动条滚动距离
      columnX.value = e.pageX - LEFT_SIDE_WIDTH + proxy.$parent.$el.scrollLeft
    }
    const topMouseMove = (e) => {
      // +滚动条滚动距离
      columnX.value = e.pageX - LEFT_SIDE_WIDTH + proxy.$parent.$el.scrollLeft
    }
    const topMouseLeave = () => {
      if (colHandleMoveReady.value) {
        return
      }
      topMoving.value = false
      topMoving1.value = false
    }


    const topIndex = ref(null);
    const topMouseEnter1 = (e, i) => {
      console.log(i,'index')
      topMoving1.value = true
      // +滚动条滚动距离
      columnX.value = e.pageX - LEFT_SIDE_WIDTH + proxy.$parent.$el.scrollLeft
      topIndex.value = i
    }
    const topMouseLeave1 = () => {
      if (colHandleMoveReady.value) {
        return
      }
      // topMoving1.value = false
    }
    const clickTopTip = () => {
      // ()
      commit('removeReferenceLine',{ type: 'col', index: topIndex.value })
       console.log(topIndex.value,'index')
      topMoving1.value = false
    }



    const topMouseUp = () => {
      console.log('topMouseUp')
      if (colHandleMoveReady.value) {
        return
      }
      addColumn()
    }
    const leftMouseEnter = (e) => {
      rowY.value = e.pageY - mainPanelScrollY + proxy.$parent.$el.scrollTop
      leftMoving.value = true 
      leftMoving1.value = false
    }
    const leftMouseMove = (e) => {
      // console.log(mainPanelScrollY,e,proxy.$parent.$el.scrollTop,'mainPanelScrollY.value')
      // +滚动条滚动距离
      rowY.value = e.pageY - mainPanelScrollY + proxy.$parent.$el.scrollTop
      // rowY.value = e.layerY
    }
    const leftMouseLeave = () => {
      if (rowHandleMoveReady.value) {
        return
      }
      leftMoving.value = false
    }
    const leftMouseUp = () =>{
      if (rowHandleMoveReady.value) {
        return
      }
      addRow()
    }
    const leftIndex = ref(null)
    const leftMouseEnter1 = (e,i) => {
      rowY.value = e.pageY - mainPanelScrollY + proxy.$parent.$el.scrollTop
      leftMoving1.value = true 
      leftIndex.value = i
    }

    const leftMouseLeave1 = () => {
      if (rowHandleMoveReady.value) {
        return
      }
      // leftMoving1.value = false
    }
    const clickLeftTip = () => {
      commit('removeReferenceLine',{ type: 'row', index: leftIndex.value })
      leftMoving1.value = false
    }
    const removeReferenceLine = (data) => {
      commit("removeReferenceLine", data);
    }
    const colHandleDown = (e, index) => {
      colHandleMoveReady.value = true
      let invoked = false
      document.body.style.cursor = 'col-resize'
      const mouseMoveFn = _e => {
        if (!invoked) {
          removeReferenceLine({ type: 'col', index })
          topMouseEnter(_e)
          invoked = true
        }
        topMouseMove(_e)
      }
      const mouseUpFn = () => {
        if (invoked) {
          addColumn()
        }
        colHandleMoveReady.value = false
        topMouseLeave()
        document.removeEventListener('mouseup', mouseUpFn)
        document.removeEventListener('mousemove', mouseMoveFn)
        document.body.style.cursor = 'initial'
      }
      document.addEventListener('mousemove', mouseMoveFn)
      document.addEventListener('mouseup', mouseUpFn)
    }
    const rowHandleDown = (e, index) => {
      rowHandleMoveReady.value = true
      let invoked = false
      document.body.style.cursor = 'row-resize'
      const mouseMoveFn = _e => {
        if (!invoked) {
          removeReferenceLine({ type: 'row', index })
          leftMouseEnter(_e)
          invoked = true
        }
        leftMouseMove(_e)
      }
      const mouseUpFn = () => {
        if (invoked) {
          addRow()
        }
        rowHandleMoveReady.value = false
        leftMouseLeave()
        document.removeEventListener('mouseup', mouseUpFn)
        document.removeEventListener('mousemove', mouseMoveFn)
        document.body.style.cursor = 'initial'
      }
      document.addEventListener('mousemove', mouseMoveFn)
      document.addEventListener('mouseup', mouseUpFn)
    }





    onMounted(() => {
      ruler.initRow({
        el: proxy.$refs.topRuler,
        height: TOP_RULER_HEIGHT,
        color: '#bac3c9',
        background: '#071226',
        startGap: TOP_RULER_HEIGHT - 1,
        maxScale: 50000
      })
      ruler.initColumn({
        el: proxy.$refs.leftRuler,
        width: TOP_RULER_HEIGHT,
        color: '#bac3c9',
        background: '#071226',
        startGap: TOP_RULER_HEIGHT - 1,
        maxScale: 50000
      })
    });

    return {
      topMoving1,
      clickTopTip,
      topMouseEnter1,
      topMouseLeave1,
      topIndex,
      leftMoving1,
      clickLeftTip,
      leftMouseEnter1,
      leftMouseLeave1,
      leftIndex,
      matchedLine,
      referenceLineOpened,
      referenceLine,
      removeReferenceLine,
      colHandleDown,
      rowHandleDown,
      topMouseEnter,
      topMouseMove,
      topMouseLeave,
      topMouseUp,
      topMoving,
      columnX,
      columnXInRuler,
      rowElPositionFix,
      leftMouseEnter,
      leftMouseMove,
      leftMouseLeave,
      leftMouseUp,
      leftMoving,
      rowY,
      rowYInRuler,
      state,
      rulerLine,
      showRulers,
      hideRulers
    }
  }
}
// export default {

  // computed: {
  //   ...mapState(['referenceLine', 'referenceLineOpened', 'mainPanelScrollY']),
  //   columnXInRuler() {
  //     return this.columnX - TOP_RULER_HEIGHT
  //   },
  //   rowYInRuler() {
  //     return this.rowY - 50
  //   },
  //   rowElPositionFix() {
  //     return {
  //       transform: `translateY(${this.mainPanelScrollY}px)`
  //     }
  //   }
  // },

  // methods: {
  //   ...mapActions(['addReferenceLine', 'removeReferenceLine']),
    
  // }
// }
</script>

<style lang="less" scoped>
.poster-ruler {
  position: absolute;
  overflow: hidden;
  min-width: 900px;
  min-height: 800px;
  width: 100%;
  height: 100%;
}
.top-ruler {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 5000px;
  min-width: 900px;
  /* border-bottom: 1px solid #bac3c9; */
  z-index: 200;
  cursor: col-resize;
}
.left-ruler {
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 6000px;
  min-height: 800px;
  z-index: 199;
  /* border-right: 1px solid #bac3c9; */
  cursor: row-resize;
  transition: 0.5s;
}
.showEye {
  position: absolute;
  top: 3px;
  z-index: 300;
  left: 3px;
  color: #166791;
}
.clickTopTip {
  padding: 4px 6px;
  border-radius: 4px;
  background-color: rgba(0,0,0, 0.6);
  font-size: 13px;
  cursor: pointer;
  color: #fff;
  position: absolute;
  user-select: none;
  top: 0px;
  left: 30px;
  z-index: 201;
}
.clickLeftTip {
  padding: 4px 6px;
  border-radius: 4px;
  background-color: rgba(0,0,0, 0.6);
  font-size: 13px;
  cursor: pointer;
  color: #fff;
  position: absolute;
  user-select: none;
  top: -30px;
  left: 10px;
  z-index: 201;
}
.reference-line {
  /* background-color: #ff0000; */
  position: absolute;
  z-index: 201;
  .tip {
    padding: 4px 6px;
    border-radius: 4px;
    background-color: rgba(0,0,0, 0.6);
    font-size: 13px;
    cursor: pointer;
    color: #fff;
    position: absolute;
    user-select: none;
    pointer-events: none;
  }
  &.column {
    width: 2px;
    height: 5000px;
    margin-left: -2px;
    top: 0;
    cursor: col-resize;
    background: linear-gradient(
      90deg,
      transparent 33.3%,
      #eceef0 0,
      #53ebef 66.6%,
      transparent 0
    );
    background-color: #2E86FA;
    &:hover{
     
      background: linear-gradient(
        90deg,
        transparent 33.3%,
        #fe9336 0,
        #fe9336 66.6%,
        transparent 0
      );
      background-color: #fe9336;
      box-shadow: 1px 0 6px #fe9336, -1px 0 6px #fe9336;
    }
    .tip {
      top: 0px;
      left: 10px;
    }
  }
  &.row {
    width: 5000px;
    height: 2px;
    margin-top: -1px;
    left: 0;
    cursor: row-resize;
    transition: 0.1s;
    background: linear-gradient(
      0deg,
      transparent 33.3%,
      #eceef0 0,
      #53ebef 66.6%,
      transparent 0
    );
    background-color: #2E86FA;
    &:hover{
      background: linear-gradient(
        0deg,
        transparent 33.3%,
        #fe9336 0,
        #fe9336 66.6%,
        transparent 0
      );
      background-color: #fe9336;
      box-shadow: 1px 0 6px #fe9336, -1px 0 6px #fe9336;
    }
    .tip {
      top: -30px;
      left: 10px;
    }
    &.moving {
      transition: none;
    }
  }
}

</style>
