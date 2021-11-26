<!--
 * @Author: Lee
 * @Date: 2021-11-26 21:29:42
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-26 21:39:19
-->

<script setup lang="ts">
import { toRefs, reactive } from 'vue';

interface StateProps {
  name: string;
}

const state = reactive<StateProps>({
  name: 'muzili',
});

setTimeout(() => {
  state.name = '123'
}, 1000);

const { name } = toRefs(state);
</script>

<template>
  <div class="page">
    {{ state.name }}
  </div>
</template>
