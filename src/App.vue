<template>
  <div class="training">
    <h1>Math training. Уровень {{ level + 1 }}</h1>
    <hr/>

    <!--TODO можно сделать отдельным компонентом-->
    <div class="progress">
      <div class="progress-bar" v-bind:style="progressStyles"></div>
    </div>

    <div class="box">
      <!--TODO FromChild заменить на имя компонента?-->
      <transition name="flip" mode="out-in">
        <StartScreen
          v-if="state === 'start'"
          v-on:on-click-btn-start-from-child="changeToStart" />

        <Question
          v-else-if="state === 'question'"
          v-bind:settings="levels[level]"
          v-on:on-get-success-from-child="changeToMessageDivWithSuccess"
          v-on:on-get-error-from-child="changeToMessageDivWithError" />

        <Message
          v-else-if="state === 'message'"
          v-bind:type="message.type"
          v-bind:text="message.text"
          v-on:on-click-btn-continue-from-child="changeToQuestionOrResultDiv" />

        <ResultScreen
          v-else-if="state === 'result'"
          v-bind:stats="stats"
          v-on:on-click-btn-repeat-from-child="changeToStart"
          v-on:on-click-btn-next-level-from-child="onNextLevel" />

        <div v-else>Неизвестный state</div>

      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
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
      changeToMessageDivWithSuccess() {
        this.state = "message";
        this.message.type = "success";
        this.message.text = "Вы правильно ответили 👍🏼";
        this.stats.success++;
      },
      //показываем сообщение об ошибке
      changeToMessageDivWithError(msg) {
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

<style src="./assets/stylesheets/App.css" />
