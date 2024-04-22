<script setup lang="ts">
import { defineModel } from 'vue';

import type { RequestedRepaymentPeriodsApiResponse, CalcRepaymentRequest } from '@/types/RepaymentCalculatorTypes';
import type { ModelRef } from 'vue';

const props = defineProps<{
  options: RequestedRepaymentPeriodsApiResponse[];
}>();

const model: ModelRef<CalcRepaymentRequest['repaymentPeriod']> = defineModel<CalcRepaymentRequest['repaymentPeriod']>({
  default: 0,
  required: true,
});
</script>

<template>
  <div class="repayment-period-input">
    <select
      id="repaymentPeriod"
      v-model="model"
      class="select"
    >
      <option
        value=""
        disabled
        selected
      >
        Select a repayment period
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
