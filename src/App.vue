<template>
  <div class="training">
    <!--<img alt="Vue logo" src="./assets/img/logo.png">-->
    <h1>Math training</h1>
    <hr/>
    <!--можно сделать отдельным компонентом-->
    <div class="progress">
      <div class="progress-bar" v-bind:style="progressStyles"></div>
    </div>
    <div class="box">
      <transition name="flip" mode="out-in">
        <AppStartScreen
          v-if="state === 'start'"
          v-on:onClickBtnStartFromChild="changeToQuestionDiv"
        />
        <AppQuestion
          v-else-if="state === 'question'"
          v-on:onGetSuccessFromChild="changeToMessageDivSuccess"
          v-on:onGetErrorFromChild="changeToMessageDivError"
        />
        <AppMessage
          v-else-if="state === 'message'"
          v-bind:type="message.type"
          v-bind:text="message.text"
          v-on:onClickBtnContinueFromChild="changeToQuestionDiv"
        />
        <AppResultScreen v-else-if="state === 'results'"/>
        <div v-else>Неизвестный state</div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {
        state: "start",
        message: {
          type: "",
          text: ""
        },
        stats: {
          success: 0,
          error: 0
        },
        questionMax: 3
      };
    },
    computed: {
      questionDone() {
        return this.stats.success + this.stats.error;
      },
      progressStyles() {
        return {
          width: (this.questionDone / this.questionMax) * 100 + "%"
        };
      }
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
        this.message.type = "success";
        this.message.text = "Вы правильно ответили 👍🏼";
        this.stats.success++;
      },
      //показываем сообщение об ошибке
      changeToMessageDivError(msg) {
        this.state = "message";
        this.message.type = "warning";
        this.message.text = `Неправильно, ${msg}`;
        this.stats.error++;
      }
    }
  };
</script>

<style src="./assets/stylesheets/App.css"></style>
