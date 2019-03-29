<template>
  <div class="alert" v-bind:class="'alert-' + type">
    <h3>{{ text }}</h3>
    <button class="btn btn-primary">Продолжить</button>
  </div>
</template>

<script>
  export default {
    name: "Message",
    props: ["type", "text"]
  };
</script>

<style scoped src="./Message.css"></style>
