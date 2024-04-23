<script setup lang="ts">
import { ref, computed } from 'vue';
import RCForm from '@/components/RepaymentCalculator/RCForm';
import { addCommasToNumber } from '@/utils';

import type { Ref } from 'vue';
import type { CalcRepaymentResult } from '@/types/RepaymentCalculatorTypes';

const getResult: Ref<CalcRepaymentResult> = ref({} as CalcRepaymentResult);
const monthlyRepayment = computed(() => addCommasToNumber(getResult.value.monthlyRepayment));
const totalRepayment = computed(() => addCommasToNumber(getResult.value.totalRepayment));
</script>

<template>
  <div>
    <div class="mx-auto mb-10 w-full max-w-2xl">
      <RCForm
        v-model:result="getResult"
        data-name="repayment-calculator-form-component"
      />
    </div>

    <template v-if="getResult.monthlyRepayment">
      <div class="result bg-light-500 px-6 py-10 text-center shadow-sm">
        <h2
          class="mb-6 text-4xl font-bold text-secondary-600"
          data-name="monthly-repayment-value"
        >
          ${{ monthlyRepayment }} Monthly repayments
        </h2>

        <h2
          class="text-3xl font-bold text-primary-500"
          data-name="total-repayment-value"
        >
          ${{ totalRepayment }} Total repayments
        </h2>
      </div>
      <div class="flex items-center justify-center py-4 text-center text-primary-500">
        <span>Do you need a quote?</span>
        <a
          href="https://app.valiant.finance/quote/start"
          class="ml-2 font-semibold text-primary-500 underline hover:text-secondary-600"
          target="_blank"
          rel="nofollow"
          title="Get a quote from Valiant Finance"
        >
          Start here
        </a>
      </div>
    </template>
  </div>
</template>
