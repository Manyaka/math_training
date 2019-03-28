<template>
  <div class="alert alert-secondary">
    <h3>Вы готовы начать?</h3>
    <button class="btn btn-success"
            v-on:click="$emit('onClickBtnStartFromChild')">Начать
    </button>
  </div>
</template>

<script>
  export default {
    //this - VueComponent
    name: 'StartScreen',
    methods: {
    }
  };
</script>

<style scoped src="./StartScreen.css"></style>
