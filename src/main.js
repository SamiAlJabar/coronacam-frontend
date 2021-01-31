import Vue from "vue";
import "./plugins/vuetify";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store.js";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Vuetify, {
  theme: {
    primary: "#272784",
    primaryTwo: "d2e7ff",
    primaryButton: "#4ee352",
    secondary: "#222222",
    third: "#ffffff",
    footerBackground: "#525252",
    accent: "#4ee352",
    error: "#ED1C24",
    background: "#f7fcff",
    backgroundLogin: "#f7fcff"
  }
});
Vue.mixin({
  methods: {
    errorAlerts(error) {
      if (error.response) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    },
    goto(route) {
      this.$router.replace(this.$route.query.redirect || route);
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
