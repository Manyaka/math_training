<template>
  <div class="training">
    <!--<img alt="Vue logo" src="./assets/img/logo.png">-->
    <h1>Math training</h1>
    <hr/>
    <!--TODO можно сделать отдельным компонентом-->
    <div class="progress">
      <div class="progress-bar" v-bind:style="progressStyles"></div>
    </div>
    <div class="box">
      <!--TODO from child заменить на имя компонента-->
      <transition name="flip" mode="out-in">
        <AppStartScreen
          v-if="state === 'start'"
          v-on:onClickBtnStartFromChild="changeToStart"
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
          v-on:onClickBtnContinueFromChild="changeToQuestionOrResultDiv"
        />
        <AppResultScreen
          v-else-if="state === 'result'"
          v-bind:stats="stats"
          v-on:onClickBtnRepeatFromChild="changeToStart"
          v-on:onClickBtnNextLevelFromChild="changeToQuestionOrResultDiv"
        />
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
      //начинаем сначала
      changeToStart() {
        this.state = "question";
        this.stats.success = 0;
        this.stats.error = 0;
      },
      //переходим к вопросу или показываем результат
      changeToQuestionOrResultDiv() {
        if (this.questionDone < this.questionMax) {
          this.state = "question";
        } else {
          this.state = "result";
        }
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
