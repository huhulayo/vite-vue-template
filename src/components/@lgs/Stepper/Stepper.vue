<template>
  <div class="stepper">
    <section
      v-show="!value || value == 1"
      class="stepper__item stepper__minus stepper__disabled"
    />
    <section
      v-show="value > 1"
      class="stepper__item stepper__minus"
      @click="$emit('update:value', +value - 1)"
    />

    <input
      class="stepper__item stepper__input"
      :min="min"
      :max="max"
      type="number"
      :value="value"
      @change="onChange"
    />

    <section
      v-show="value >= max"
      class="stepper__item stepper__plus stepper__disabled"
    />
    <section
      v-show="value < max"
      class="stepper__item stepper__plus"
      @click="$emit('update:value', +value + 1)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: [Number, String],
      default: 1,
    },
    min: {
      type: [Number, String],
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const onChange = (e: any) => {
      console.log(e);
    };
    return {
      onChange,
    };
  },
});
</script>

<style scoped="scoped" lang="less">
.stepper {
  display: flex;
  align-items: center;

  &__item {
    width: 33px;
    height: 17px;
    background-color: #ffe9d9;
    position: relative;
    font-size: 16px;
  }
  &__minus::before,
  &__plus::before {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff7e26;
    font-weight: bold;
  }
  &__minus::before {
    content: "-";
  }
  &__disabled {
    background: #f3f3f3;
  }
  &__plus::before {
    content: "+";
  }
  &__input {
    background-color: #f3f3f3;
    text-align: center;
    margin: 0 4px;
    border-radius: 3px;
    color: #686868;
    font-weight: normal;
    font-size: 10px;
  }
}
</style>
