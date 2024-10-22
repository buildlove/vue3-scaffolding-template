import { useRoutesStore } from '@/store/routes';
import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  {
    path: "/", //路由
    redirect: "/template", //重定向
    component: () => import("@/views/layout.vue"),
    children: [
      {
        path: "template",
        component: () => import("@/views/template-layer.vue"),
        redirect: "/template/template1", //重定向
        meta: {
          level: 0,
          name: "嵌套路由菜单",
        },
        children: [
          {
            path: "template1",
            component: () => import("@/views/template.vue"),
            meta: {
              level: 1,
              name: "嵌套路由一",
              node: true
            },
          },
          {
            path: "templateChild",
            component: () => import("@/views/template-child.vue"),
            meta: {
              level: 1,
              name: "嵌套路由子路由",
              node: true
            },
          },
        ],
      },
      {
        path: "/template2",
        component: () => import("@/views/template2.vue"),
        meta: {
          level: 0,
          name: "模版路由二",
          node: true
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useRoutesStore();
  store.saveRoutes(routes);
  next()
});
router.afterEach((to) => {
  document.title = "模版" + (to.meta.name ? "-" + to.meta.name : "");
});
export default router;
