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
    props: ["settings"],
    data() {
      return {
        //заполняем числа рандомно
        x: mtRand(this.settings.from, this.settings.to),
        y: mtRand(this.settings.from, this.settings.to)
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
        while (res.length < this.settings.variants) {
          let num = mtRand(
            this.good - this.settings.range,
            this.good + this.settings.range
          );

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
          this.$emit("on-get-success-from-child");
        } else {
          this.$emit(
            "on-get-error-from-child",
            `${this.x} + ${this.y} = ${this.good}!`
          );
        }
      }
    }
  };
</script>

<style scoped src="./Question.css" />
