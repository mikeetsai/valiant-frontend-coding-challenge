<script setup lang="ts">
import { ref } from 'vue';
import { useGetLoanPurposesApi } from '@/services/RepaymentCalculator';

import type { Ref } from 'vue';
import type { LoanPurposesApiResponse } from '@/types/RepaymentCalculatorTypes';

const { loanPurposes } = getLoanPurposes();

function getLoanPurposes () {
  const loanPurposes: Ref<LoanPurposesApiResponse> = ref({});

  useGetLoanPurposesApi().then((response) => {
    loanPurposes.value = response;
  });

  return { loanPurposes };
}

function updateLoanPurposes () {
  loanPurposes.value = {
    key: 'value',
  };
}
</script>

<template>
  <div class="repayment-calculator bg-secondary-500 p-4">
    <h1>Repayment Calculator Component</h1>
    <pre>loadPurposes: {{ loanPurposes }}</pre>
    <button
      class="btn"
      data-el="calculate-button"
      @click="updateLoanPurposes"
    >
      click me
    </button>
  </div>
</template>
