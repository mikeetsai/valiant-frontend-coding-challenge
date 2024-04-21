<script setup lang="ts">
import { ref, computed } from 'vue';
import RCForm from '@/components/RepaymentCalculator/RCForm.vue';
import { addCommasToNumber } from '@/utils';

import type { Ref } from 'vue';
import type { CalcRepaymentResult } from '@/types/RepaymentCalculatorTypes';

const getResult: Ref<CalcRepaymentResult> = ref({} as CalcRepaymentResult);
const monthlyRepayment = computed(() => addCommasToNumber(getResult.value.monthlyRepayment));
const totalRepayment = computed(() => addCommasToNumber(getResult.value.totalRepayment));

</script>

<template>
  <div class="mx-auto w-full max-w-2xl">
    <RCForm v-model:calculate="getResult" />
    <div
      v-if="getResult.monthlyRepayment"
      class="result text-center"
    >
      <hr class="my-8 border-light-500">
      <h2 class="mb-6 text-4xl font-bold text-secondary-500">
        ${{ monthlyRepayment }} Monthly repayments
      </h2>

      <h2 class="text-3xl font-bold text-primary-500">
        ${{ totalRepayment }} Total repayments
      </h2>
    </div>
  </div>
</template>
