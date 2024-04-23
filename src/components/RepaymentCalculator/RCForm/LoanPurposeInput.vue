<script setup lang="ts">
import { defineModel } from 'vue';

import type { LoanPurposesApiResponse, CalcRepaymentRequest } from '@/types/RepaymentCalculatorTypes';
import type { ModelRef } from 'vue';

const props = defineProps<{
  options: LoanPurposesApiResponse[];
}>();

const model: ModelRef<CalcRepaymentRequest['annualRate']> = defineModel<CalcRepaymentRequest['annualRate']>({
  default: 0,
  required: true,
});
</script>

<template>
  <div class="loan-purpose-input">
    <select
      id="loanPurpose"
      v-model="model"
      class="select"
      data-name="loan-purpose-field"
    >
      <option
        value=""
        disabled
        selected
      >
        Select loan purpose
      </option>
      <option
        v-for="(option, i) in props.options"
        :key="i"
        :value="option.annualRate"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
