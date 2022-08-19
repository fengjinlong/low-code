<template>
  <a-layout style="height: 100vh">
    <a-layout-header
      style="
        background: #132a53;
        box-shadow: 2px 3px 20px 0px rgba(0, 0, 0, 0.2);
        padding: 0;
        height: 88px;
      "
    >
      <Toolbar @saveScreenPicture="saveScreenPicture"/>
    </a-layout-header>

    <a-layout>
      <!-- style="background: #00050A; height: 100%; overflow: auto; padding: 20px" -->

      <a-layout-sider
        :trigger="null"
        collapsible
        width="376"
        style="background: #0f203d"
      >
        <LeftComponents />
      </a-layout-sider>

      <a-layout>
        <a-layout-content
          ref="myContentBox"
          style="
            background: #000;
            height: 100%;
            overflow: auto;
            position: relative;
          "
        >
          <ruler-component />
          <div
            class="content"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent"
          >
            <Editor ref="editor"/>
          </div>
        </a-layout-content>

        <a-layout-footer style="padding: 0; height: 30px; background: #12274b">
          <div class="footer-mes">
            <span>位 置：</span>
            <span>{{
              (footerData.left && footerData.left.toFixed(2)) || 0
            }}</span>
            <span>，</span>
            <span>{{
              (footerData.top && footerData.top.toFixed(2)) || 0
            }}</span>
            <span class="span">尺 寸：</span>
            <span>{{
              (footerData.width && footerData.width.toFixed(2)) || 0
            }}</span>
            <span>，</span>
            <span>{{
              (footerData.height && footerData.height.toFixed(2)) || 0
            }}</span>
          </div>
        </a-layout-footer>
      </a-layout>

      <a-layout-sider
        :trigger="null"
        collapsible
        style="background: #0f203d"
        width="373"
        @click="saveComponent"
      >
        <AttrsList v-if="state.curComponent" />
        <div v-else>
          <div class="canvas-tit">画布配置</div>
          <CanvasAttrs />
        </div>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  computed,
  onMounted,
  getCurrentInstance,
  ref,
  watch,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import componentListData from "@/custom-component/left-components-data"; // 左侧列表数
import Editor from "@/components/Editor/index";
import LeftComponents from "@/components/left-components";
import { deepCopy } from "@/utils/utils";
import Toolbar from "@/components/Toolbar";
import generateID from "@/utils/generateID";
import AttrsList from "@/components/right-config"; // 右侧属性列表
import rulerComponent from "@/components/ruler"; // 刻度尺
// import AttrsList from "@/components/attrs-list"; // 右侧属性列表

// import AttrsList from "@/components/attrs-list"; // 右侧属性列表
import CanvasAttrs from "@/components/canvas-attrs"; // 右侧属性列表
import { selectBy, saveScreenshot } from "@/request/page.js";
import { sessionCache } from "@/utils/cache.js";
import html2canvas from "html2canvas"
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import baseURL from '@/request/env'
export default {
  components: {
    Toolbar,
    CanvasAttrs,
    Editor,
    AttrsList,
    LeftComponents,
    rulerComponent,
  },
  setup() {
    onMounted(() => {
     listenGlobalKeyDown()
    })
    // 编辑器
    const { state, commit } = useStore();
    // 编辑状态
    const getInitData = (id) => {
      selectBy({ id }).then((res) => {
        if (res.code === 200) {
          commit("setComponentData", JSON.parse(res.data.elementjson));
        }
      });
    };
    // 刷新页面 使用 存在的存储数据
    if (
      sessionCache.getJSON("setCanvasName") &&
      sessionCache.getJSON("setComponentData")
    ) {
      commit("setCanvasName", sessionCache.getJSON("setCanvasName"));
      commit("setComponentData", sessionCache.getJSON("setComponentData"));
    } else {
      // 新进页面 不存在组件数据
      // 获取存储数据 修改调用渲染
      const sessionCacheData = sessionCache.getJSON("setCanvasName");
      if (sessionCacheData && sessionCacheData.id) {
        getInitData(sessionCacheData.id);
      } else {
        // 新增 不存在 id 渲染画布属性
        commit("setCanvasName", sessionCache.getJSON("setCanvasName"));
      }
    }
    // if (state.canvasStyleData.id) {
    //   getInitData(state.canvasStyleData.id);
    // }

    const { proxy } = getCurrentInstance();
    const deselectCurComponent = () => {
      if (state.isClickComponent) {
      } else {
        // console.log("setCurComponent is  null");
        // console.log(state, "state.curComponent");
        commit("setCurComponent", { component: null, index: null });
      }
    };

    const footerData = computed(() => {
      let obj = {
        left: "",
        top: "",
        width: "",
        height: "",
      };
      if (state.curComponent) {
        obj.left = state.curComponent.materialData.style.left || 0;
        obj.top = state.curComponent.materialData.style.top || 0;
        obj.width = state.curComponent.materialData.style.width || 0;
        obj.height = state.curComponent.materialData.style.height || 0;
      }
      return obj;
    });
    // 点击属性区域实时存储 变更数据
    const saveComponent = () => {
      sessionCache.setJSON('setCanvasName', deepCopy(state.canvasStyleData));
      sessionCache.setJSON('setComponentData', deepCopy(state.componentData));
    }
    let savePictureFile = ref('');
    const editor = ref(null); // 画布元素
    // 画布生成图片
    const saveScreenPicture = (id) => {
        // 画布截图 生成 file
        html2canvas(editor.value.editor, {
        logging: false,
        allowTaint: false,
        // scale: window.devicePixelRatio,
        scale: 0.6,
        width: editor.value.editor.clientWidth, //dom 原始宽度
        height: editor.value.editor.clientHeight,
        scrollY: 0,
        scrollX: 0,
        useCORS: true,
        backgroundColor: "#ffffff",
        proxy: baseURL
      }).then(function(canvas) {
        let imgUrl = canvas.toDataURL("image/png"); // base64
        savePictureFile.value= base64toFile(imgUrl, id);
        //  var save_link = document.createElement('a');
        //     save_link.href = imgUrl;
        //     save_link.download = 'a';
        //     save_link.style.display = 'none';
        //     var event = document.createEvent('MouseEvents');
        //     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        //     save_link.dispatchEvent(event);
      }).then(res => {
        const formData = new FormData();
        formData.append('file',savePictureFile.value)
        formData.append('visualPage',JSON.stringify({id: id}))
        saveScreenshot(formData).then((res) => {
          if (res.code === 200) {
          }
        });
      }) 
    }
    // 将base64转换为file   dataurl: base64地址
    const base64toFile = (dataurl, filename = 'file') => {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    }
    return {
      saveScreenPicture,
      editor,
      state,
      saveComponent,
      footerData,
      handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        let index = e.dataTransfer.getData("index");
        if (index) {
          let com = deepCopy(componentListData[index]);
          com.id = generateID(state.componentData);
          const rectInfo = state.editor.getBoundingClientRect();
          com.materialData.style.top = e.clientY - rectInfo.y;
          com.materialData.style.left = e.clientX - rectInfo.x;

          commit("addItem", com);
          commit("recordSnapshot");
        }
      },

      handleDragOver(e) {
        e.preventDefault();
      },
      handleMouseDown(e) {
        e.stopPropagation();
        commit("setClickComponentStatus", false);
      },
      deselectCurComponent,
    };
  },
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 21px;
  /* overflow: auto; */
  z-index: 100;
  position: absolute;
}
.canvas-tit {
  height: 60px;
  background: #12274b;
  font-size: 22px;
  color: #cccccc;
  text-align: center;
  line-height: 60px;
}
.footer-mes {
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  color: #b3b3b3;
  line-height: 30px;
}
.footer-mes .span {
  padding-left: 30px;
}
/*修改滚动条样式*/

:deep(.ant-layout div::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}
:deep(.ant-layout div::-webkit-scrollbar-track) {
  background: #09324d;
  border-radius: 2px;
}
:deep(.ant-layout div::-webkit-scrollbar-thumb) {
  background: rgba(0, 139, 201, 0.2);
  border-radius: 10px;
}
:deep(.ant-layout div::-webkit-scrollbar-thumb:hover) {
  background: #2da3bd;
}
:deep(.ant-layout div::-webkit-scrollbar-corner) {
  background: #000;
}
:deep(.ant-layout-content::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}
:deep(.ant-layout-content::-webkit-scrollbar-track) {
  background: #09324d;
  border-radius: 2px;
}
:deep(.ant-layout-content::-webkit-scrollbar-thumb) {
  background: rgba(0, 139, 201, 0.2);
  border-radius: 10px;
}
:deep(.ant-layout-content::-webkit-scrollbar-thumb:hover) {
  background: #2da3bd;
}
:deep(.ant-layout-content::-webkit-scrollbar-corner) {
  background: #000;
}
</style>
