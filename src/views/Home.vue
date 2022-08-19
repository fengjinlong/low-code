<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" v-if="collapsed"></div>
      <div class="logo" v-else>低代码可视化平台</div>
      <!-- <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys"> -->
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="myRouter">
        <a-menu-item key="/home/project" >  
          <!-- <user-outlined /> -->
          <DashboardOutlined /> 
          <router-link to="/home/project"> 可视化管理</router-link>
        </a-menu-item>
        <a-menu-item key="/home/material">
          <!-- <upload-outlined /> -->
          <SnippetsOutlined /> 
          <router-link to="/home/material"> 素材库</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header> -->
          <!-- margin: '24px 16px',
          padding: '24px', -->
      <a-layout-content
        :style="{
          background: '#0c1a33',
          minHeight: '280px',
        }"
      >
        <div :style="{ background: '#0c1a33', height: '100%' }">
          <Suspense>
            <router-view />
          </Suspense>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SnippetsOutlined,
  DashboardOutlined
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SnippetsOutlined,
    DashboardOutlined
  },
  setup() {
    const router = useRouter();
     
    return {
      myRouter:ref([router.currentRoute.value.path]),//默认菜单
      selectedKeys: ref(["1"]),
      collapsed: ref(false),
    };
  },
});
</script>
<style scoped>
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 26px;
  font-family: cursive;
  font-weight: bold;
  color: #FAFAFA;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.ant-layout-sider.ant-layout-sider-dark {
  width: 276px !important;
  flex: 0 0 276px !important;
  min-width: 276px !important;
  max-width: 276px !important;
}


</style>
