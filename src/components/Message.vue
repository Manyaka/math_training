<template>
  <div class="alert" v-bind:class="'alert-' + type">
    <h3>{{ text }}</h3>
    <!--TODO изменять кнопку, когда закончили-->
    <button class="btn btn-primary"
            v-on:click="$emit('on-click-btn-continue-from-child')">
      Продолжить
    </button>
  </div>
</template>

<script>
  export default {
    name: "Message",
    //TODO поменять на message
    props: ["type", "text"]
  };
</script>

<style scoped src="./Message.css" />
