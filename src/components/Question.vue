<template>
  <div class="alert alert-secondary">
    <h3>{{ x }} + {{ y }} = ?</h3>
    <hr/>
    <div class="buttons">
      <button
        class="btn btn-success"
        v-for="number in answers"
        v-on:click="onAnswer(number)"
      >
        {{ number }}
      </button>
    </div>
  </div>
</template>

<script>
  function mtRand(min, max) {
    let diff = max - min;
    return Math.floor(Math.random() * (diff + 1)) + min;
  }

  export default {
    name: "Question",
    data() {
      return {
        //заполняем числа рандомно
        x: mtRand(1, 20),
        y: mtRand(1, 20)
      };
    },
    computed: {
      //правильный вариант
      good() {
        return this.x + this.y;
      },
      answers() {
        let res = [this.good];
        //заполняем массив другими приблизительными вариантами рандомно
        while (res.length < 4) {
          let num = mtRand(this.good - 10, this.good + 10);

          if (res.indexOf(num) === -1) {
            res.push(num);
          }
        }
        //сортируем, чтобы правильный вариант не был всегда первым
        res.sort((a, b) => (a > b
                            ? 1
                            : -1));

        return res;
      }
    },
    methods: {
      //проверяем правильность ответа
      onAnswer(num) {
        if (num === this.good) {
          this.$emit('onGetSuccessFromChild');
        } else {
          this.$emit('onGetErrorFromChild',
            `${this.x} + ${this.y}} = ${this.good}!`);
        }
      }
    }
  };
</script>

<style scoped src="./Question.css"></style>
