<script setup lang="ts">
import RepaymentCalculator from '@/components/RepaymentCalculator';
import AppHeader from '@/components/Partials/AppHeader.vue';

defineOptions({
  name: 'App',
});
</script>

<template>
  <div class="border-t-4 border-t-secondary-500">
    <AppHeader class="sticky top-0 mb-10" />
    <RepaymentCalculator />
  </div>
</template>
