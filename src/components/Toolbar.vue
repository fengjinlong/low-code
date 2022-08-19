<template>
  <div class="toolbar">
    <a-row type="flex" align="middle">
      <a-col :span="6">
        <div class="left-con">
          <LeftOutlined
            @click="back"
            style="
              color: #3eaedd;
              cursor: pointer;
              font-size: 20px;
              padding: 0 39px;
            "
          />
          <span class="title">大屏可视化界面</span>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="bar-con">
          <div class="bar-item">
            <div class="undo">
              <span> 撤销 </span>
              <div class="undo-img">
                <img @click="undo" src="../assets/images/icon_bar2.png" />
                <img @click="redo" src="../assets/images/icon_bar3.png" />
              </div>
            </div>
          </div>
          <div class="bar-item layer-con" v-click-outside="close">
            <div class="barbtn" @click="toggleLayerModel">
              <span>图层</span>
              <img src="../assets/images/icon_bar4.png" />
            </div>
            <div v-show="showBar" class="bar-layer">
              <ul>
                <li @click="topComponentBar">置顶</li>
                <li @click="bottomComponentBar">置底</li>
                <li @click="upComponent">上移</li>
                <li @click="downComponent">下移</li>
              </ul>
            </div>
          </div>
          <div class="bar-item">
            <div class="barbtn" @click="compose">
              <span>组合</span>
              <img src="../assets/images/icon_bar5.png" />
            </div>
          </div>
          <div class="bar-item">
            <div class="barbtn" @click="decompose">
              <span>拆分</span>
              <img src="../assets/images/icon_bar6.png" />
            </div>
          </div>
          <div class="bar-item">
            <div class="barbtn" @click="materials">
              <span>素材库</span>
              <img src="../assets/images/icon_bar1.png" />
            </div>
          </div>
        </div>

        <!-- <a-button @click="clearCanvas">清空画布</a-button> -->
      </a-col>
      <a-col :span="6">
        <div class="bar-con1">
          <div class="bar-item">
            <div class="barbtn" @click="isShowPreview = true">
              <span>预览</span>
              <img src="../assets/images/icon_bar7.png" />
            </div>
          </div>
          <div class="bar-item">
            <div class="barbtn" @click="savePageData">
              <span>保存</span>
              <img src="../assets/images/icon_bar8.png" />
            </div>
          </div>
          <div class="bar-item">
            <div class="barbtn" @click="publishBtn">
              <span>发布 </span>
              <img src="../assets/images/icon_bar9.png" />
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <Preview v-model="isShowPreview" />
  </div>
</template>

<script>
import {
  topComponent,
  downComponent,
  upComponent,
  bottomComponent,
} from "@/common/layer";
import { save, update, publish } from "@/request/page.js";
import Preview from "@/components/Editor/Preview";
import { useStore } from "vuex";
import { ref, getCurrentInstance, h,onMounted } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import  WEBURL  from "@/request/pro";
import { LeftOutlined } from "@ant-design/icons-vue";

import { sessionCache } from "@/utils/cache.js";

import Bus from "@/utils/bus";
export default {
  components: {
    LeftOutlined,
    Preview,
  },
  directives: {
    clickOutside: {
      created(el, binding, vnode) {
        document.addEventListener("click", (e) => {
          if (e.target === el || el.contains(e.target)) {
            return;
          } else {
            binding.value();
          }
        });
      },
      unmounted() {
        document.removeEventListener("click", (e) => {});
      },
    },
  },
  setup( props, {emit}) {
    onMounted(() => {
      Bus.on('save', savePageData)
    })
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const { commit, state } = useStore();
    const clearCanvas = () => {
      commit("deleteComponentAll");
    };
    let isShowPreview = ref(false);

    const savePageData = () => {
      let title = state.canvasStyleData.title;
      let type = state.canvasStyleData.type;
      let firstletter = state.canvasStyleData.firstletter;

      let elementjson = JSON.stringify(state.componentData);
      let canvasStyleData = JSON.stringify(state.canvasStyleData);

      // // 编辑/保存临时存储 
      // sessionCache.setJSON('setCanvasName', state.canvasStyleData)
      let data = {
        firstletter,
        title,
        type,
        elementjson,
        canvasStyleData,
      };
      // 编辑
      if (state.canvasStyleData.id) {
        data.id = state.canvasStyleData.id;
        editSave(data);
      } else {
        // 保存
        firstSave(data);
      }
    };
    const editSave = (data) => {
      update(data).then((res) => {
        if (res.code === 200) {
          proxy.$message.success("保存成功");
          // router.push("/home/project");
          // 画布保存
          emit("saveScreenPicture",data.id);
        }
      });
    };
    const firstSave = (data) => {
      save(data).then((res) => {
        if (res.code === 200) {
          proxy.$message.success("保存成功");
          // router.push("/home/project");
          emit("saveScreenPicture",res.data.id);
        }
      });
    };
    // 撤销
    const undo = () => {
      commit("undo");
    };
    const redo = () => {
      commit("redo");
    };
    const topComponentBar = () => {
      topComponent(1);
    };
    const bottomComponentBar = () => {
      bottomComponent(1);
    };
    let showBar = ref(false);
    const publishBtn = () => {
      let id = state.canvasStyleData.id;

      let title = state.canvasStyleData.title;
      let type = state.canvasStyleData.type;
      let firstletter = state.canvasStyleData.firstletter;

      let elementjson = JSON.stringify(state.componentData);
      let canvasStyleData = JSON.stringify(state.canvasStyleData);
      const data = {
        id,
        title,
        type,
        firstletter,
        elementjson,
        canvasStyleData,
      };
      let saveScreenPictureData = {};
      publish(data).then((res) => {
        if (res.code == 200) {
          saveScreenPictureData = res.data;
          Modal.success({
            title: () =>
              h(
                "span",
                {
                  style: {
                    color: "#fff",
                  },
                },
                "页面发布成功"
              ),
            content: () =>
              h(
                "div",
                {
                  style: {
                    color: "#fff",
                  },
                },
                [
                  h("p", "页面访问地址"),
                  h("p", WEBURL + "/page/" + res.data.pageId),
                ]
              ),
          });
        }
      }).then(res => {
        emit("saveScreenPicture",saveScreenPictureData.id);
      })
    };
    return {
      publishBtn,
      handlePreviewChange() {},
      isShowPreview,
      showBar,
      decompose() {
        commit("decompose");
        commit("recordSnapshot");
      },
      compose() {
        commit("compose");
        commit("recordSnapshot");
      },
      topComponentBar,
      bottomComponentBar,
      upComponent,
      downComponent,
      undo,
      close() {
        if (showBar.value) {
          showBar.value = false;
        }
      },
      toggleLayerModel() {
        if (!state.curComponent) {
          return;
        }
        if (!showBar.value) {
          showBar.value = true;
        }
      },
      redo,
      savePageData,
      state,
      materials() {
        router.push("/home/material");
      },
      back() {
        router.back();
        sessionCache.remove("setCanvasName");
        sessionCache.remove("setComponentData");
      },
      clearCanvas,
    };
  },
};
</script>

<style scoped>
.titMod {
  color: #fff !important;
}
.left-con {
  display: flex;
  align-items: center;
}
.title {
  font-size: 32px;
  font-weight: bold;
  color: #e6e6e6;
}
.toolbar {
  line-height: 88px;
  height: 88px;
  white-space: nowrap;
  overflow-x: auto;
}

.insert {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  margin-left: 10px;
}

.insert:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}

.insert:hover {
  background-color: #ecf5ff;
  color: #3a8ee6;
}
.barbtn {
  width: 60px;
  height: 70px;
  padding-top: 5px;
  cursor: pointer;
}
.undo {
  width: 66px;
  height: 70px;
  padding-top: 5px;
  cursor: pointer;
}
.undo-img {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
}
.undo-img img {
  width: 26px;
  height: 22px;
  cursor: pointer;
}

.barbtn span,
.undo span {
  display: block;
  color: #fff;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  font-weight: 400;
  color: #3863af;
}
.barbtn img {
  display: block;
  width: 24px;
  height: 23px;
  margin: 0 auto;
}
.bar-con {
  display: flex;
  justify-content: space-between;
}
.bar-con1 {
  display: flex;
  justify-content: center;
}
.bar-item {
  /* border: 1px solid yellowgreen; */
  width: 78px;
  height: 88px;
  display: flex;
  justify-content: center;
}
.layer-con {
  position: relative;
}
.bar-layer {
  position: fixed;
  z-index: 2000;
  top: 66px;
}
.bar-layer ul {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  padding: 6px 0;
}

.bar-layer ul li {
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

.bar-layer ul li:hover {
  background-color: #f5f7fa;
}
</style>
