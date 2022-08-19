import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import Home from "../views/Home.vue";
import Project from "../views/Project.vue";

import Material from "../views/Material.vue";
const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    redirect: "/home/project",
    component: Home,
    children: [
      {
        path: "project",
        name: "Project",
        component: Project,
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: "material",
        name: "Material",
        component: Material,
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
    ],
  },

  {
    path: "/setPage",
    name: "SetPage",
    component: () =>
      import(/* webpackChunkName: "SetPage" */ "@/views/SetPage.vue"),
  },

  {
    path: "/page/:id",
    name: "Page",
    component: () => import(/* webpackChunkName: "Page" */ "@/views/Page.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
