import Vue from "vue";
import "@/utils/common";
import App from "./application.vue";

new Vue({
  el: "#app",
  render: h => h(App)
});