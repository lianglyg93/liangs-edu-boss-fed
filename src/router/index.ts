import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import layout from "@/layout/index.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/index.vue"),
  },
  {
    path: "/",
    component: layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'home' */ "@/views/home/index.vue"),
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: 'advert' */ "@/views/advert/index.vue"),
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ "@/views/advert-space/index.vue"
          ),
      },
      {
        path: "/course",
        name: "course",
        component: () =>
          import(/* webpackChunkName: 'course' */ "@/views/course/index.vue"),
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: 'menu' */ "@/views/menu/index.vue"),
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ "@/views/resource/index.vue"
          ),
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: 'role' */ "@/views/role/index.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: 'user' */ "@/views/user/index.vue"),
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: '404' */ "@/views/404/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 检验登录
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.userInfo?.access_token) {
      return next();
    }
    next({
      name: "login",
      query: {
        redirectUrl: to.fullPath,
      },
    });
    return;
  }
  next();
});

export default router;
