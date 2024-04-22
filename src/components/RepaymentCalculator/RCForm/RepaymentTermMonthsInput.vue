<script setup lang="ts">
import { defineModel } from 'vue';

import type { RequestedTermMonthsApiResponse, CalcRepaymentRequest } from '@/types/RepaymentCalculatorTypes';
import type { ModelRef } from 'vue';

const props = defineProps<{
  options: RequestedTermMonthsApiResponse[];
}>();

const model: ModelRef<CalcRepaymentRequest['repaymentTermMonths']> = defineModel<CalcRepaymentRequest['repaymentTermMonths']>({
  default: 0,
  required: true,
});
</script>

<template>
  <div class="repayment-term-months-input">
    <select
      id="loanTermMonths"
      v-model="model"
      class="select"
    >
      <option
        value=""
        disabled
        selected
      >
        Select a loan term
      </option>
      <option
        v-for="(option, i) in props.options"
        :key="i"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
