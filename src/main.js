import Vue from "vue";
import App from "./App.vue";

//глобальная регистрация компонентов
import Message from "./components/Message.vue";
import Question from "./components/Question.vue";
import ResultScreen from "./components/ResultScreen.vue";
import StartScreen from "./components/StartScreen.vue";

Vue.component('Message', Message);
Vue.component('Question', Question);
Vue.component('ResultScreen', ResultScreen);
Vue.component('StartScreen', StartScreen);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('[data-id="app"]');
