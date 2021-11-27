<!--
 * @Author: Lee
 * @Date: 2021-11-26 21:29:42
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-27 17:15:47
-->
<template>
  <div class="page flex-h-center">
    <Stepper v-model="value" />
  </div>
</template>

<script setup lang="ts">
import Stepper from '@/components/@lgs/Stepper/Stepper.vue';
import { ref } from 'vue';
const value = ref(1);
</script>
