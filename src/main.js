import Vue from "vue";
import App from "./App.vue";

//глобальная регистрация компонентов
import AppMessage from "./components/Message.vue";
import AppQuestion from "./components/Question.vue";
import AppResultScreen from "./components/ResultScreen.vue";
import AppStartScreen from "./components/StartScreen.vue";

Vue.component('AppMessage', AppMessage);
Vue.component('AppQuestion', AppQuestion);
Vue.component('AppResultScreen', AppResultScreen);
Vue.component('AppStartScreen', AppStartScreen);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('[data-id="app"]');
