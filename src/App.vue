<template>
  <div class="training">
    <!--<img alt="Vue logo" src="./assets/img/logo.png">-->
    <h1>Math training</h1>
    <hr/>
    <AppStartScreen
      v-if="state === 'start'"
      v-on:onClickBtnStartFromChild="changeToQuestionDiv"
    />
    <AppQuestion
      v-else-if="state === 'question'"
      v-on:onGetSuccessFromChild="changeToMessageDivSuccess"
      v-on:onGetErrorFromChild="changeToMessageDivError"
    />
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
      //переходим к вопросу
      changeToQuestionDiv() {
        this.state = "question";
      },
      //показываем успешное сообщение
      changeToMessageDivSuccess() {
        this.state = "message";
      },
      //показываем сообщение об ошибке
      changeToMessageDivError(msg) {
        this.state = "message";
      }
    }
  };
</script>

<style src="./assets/stylesheets/App.css"></style>
