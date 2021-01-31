import Vue from "vue";
import Router from "vue-router";

import Dashboard from "./components/Dashboard.vue";

// MENUS:
import MainDashboard from "./views/MainDashboard.vue";
import HomeScreen from "./views/HomeScreen.vue";
import Report from "./views/Report.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "/",
          name: "DASHBOARD",
          component: MainDashboard,
        },
        {
          path: "/report",
          name: "REPORT",
          component: Report,
        },
      ]
    },
    {
      path: "/",
      name: "HomeScreen",
      component: HomeScreen
    },
  ]
});
