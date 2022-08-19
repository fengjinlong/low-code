import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "normalize.css"
import "./utils/reset.css"
import "ant-design-vue/dist/antd.css";
// import 'ant-design-vue/dist/antd.dark.css'; 
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import '@/assets/mycss.less'; 
// import '@/assets/style/dark.less'; 
import GlobalComponents from "@/custom-component"; // 注册自定义组件
import * as echarts from 'echarts'
// 缩放图
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'


const app = createApp(App);
// echarts挂载
app.config.globalProperties.$echarts = echarts
app.use(VueViewer, {
    defaultOptions: {
        zIndex: 3000,
        inline: false, // Default: false. Enable inline mode.
        button: true, // Show the button on the top-right of the viewer.
        navbar: true, // Specify the visibility of the navbar.
        title: true, // Specify the visibility and the content of the title.
        toolbar: true, // Specify the visibility and layout of the toolbar its buttons.
        tooltip: false, // Show the tooltip with image ratio (percentage) when zooming in or zooming out.
        movable: true, // Enable to move the image.
        zoomable: true, // Enable to zoom the image.
        rotatable: true, // Enable to rotate the image.
        scalable: true, // Enable to scale the image.
        transition: true, // Enable CSS3 Transition for some special elements.
        fullscreen: true, // Enable to request full screen when play.
        keyboard: false, // Enable keyboard support.
        url: 'src', // Default: 'src'. Define where to get the original image URL for viewing.
        // url: "data-source"
    }
})
// 挂载组件
app.use(Antd).use(Vue3ColorPicker).use(store).use(router).mount("#app");
GlobalComponents(app);
