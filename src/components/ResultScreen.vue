<template>
  <div class="alert alert-primary">
    <h3>Правильных ответов: {{ stats.success }}</h3>
    <h3>Ошибочных ответов: {{ stats.error }}</h3>
    <div class="buttons">
      <button class="btn btn-primary"
              v-on:click="$emit('onClickBtnRepeatFromChild')">
        Потренироваться ещё раз
      </button>
      <button class="btn btn-primary"
              v-on:click="$emit('onClickBtnNextLevelFromChild')">
        Следующий уровень
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResultScreen",
    props: ['stats']
  };
</script>

<style scoped src="./ResultScreen.css"></style>
