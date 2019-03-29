<template>
  <div class="training">
    <!--<img alt="Vue logo" src="./assets/img/logo.png">-->
    <h1>Math training. Уровень {{ level + 1 }}</h1>
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
          v-bind:settings="levels[level]"
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
          v-on:onClickBtnNextLevelFromChild="onNextLevel"
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
        //сообщения успешности/ошибочности
        message: {
          type: "",
          text: ""
        },
        //статистика
        stats: {
          success: 0,
          error: 0
        },
        //количество вопросов
        questionMax: 3,
        //уровни прохождения
        level: 0,
        //TODO можно доделать другие варианты, также можно ограничить время ответа
        levels: [
          {
            from: 1,
            to: 20,
            range: 10,
            variants: 2
          },
          {
            from: 50,
            to: 100,
            range: 25,
            variants: 4
          }
        ]
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
      },
      //TODO а 3-го уровня нет, сделать общую статистику, сделать допуск на след уровень
      //по 0 error
      onNextLevel() {
        this.level++;
        this.changeToStart();
      }
    }
  };
</script>

<style src="./assets/stylesheets/App.css"></style>
