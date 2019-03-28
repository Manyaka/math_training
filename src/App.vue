<template>
  <div class="training">
    <!--<img alt="Vue logo" src="./assets/img/logo.png">-->
    <h1>Math training</h1>
    <hr/>
    <AppStartScreen v-if="state === 'start'"
                    v-on:onClickBtnStartFromChild="changeState"/>
    <AppQuestion v-else-if="state === 'question'"/>
    <AppMessage v-else-if="state === 'message'"/>
    <AppResultScreen v-else-if="state === 'results'"/>
    <div v-else>Неизвестный state</div>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {
        state: "start"
      };
    },
    //методы компонента
    methods: {
      changeState() {
        this.state = "question";
      }
    }
  };
</script>

<style src="./assets/stylesheets/App.css"></style>
