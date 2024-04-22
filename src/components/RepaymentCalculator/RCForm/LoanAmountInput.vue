<script setup lang="ts">
import { defineModel } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import { digitsOnly } from '@/directives';

import type { ModelRef } from 'vue';
import type { CalcRepaymentRequest } from '@/types/RepaymentCalculatorTypes';

const vDigitsOnly = digitsOnly;
const model: ModelRef<CalcRepaymentRequest['loanAmount']> = defineModel<CalcRepaymentRequest['loanAmount']>({
  default: '',
  required: true,
});
</script>
<template>
  <div class="relative">
    <Field
      id="loanAmount"
      v-model="model"
      v-digits-only
      name="Loan amount"
      type="text"
      class="input"
      placeholder="ie. 30000"
      :rules="{
        required: true,
        numeric: true,
        between: [1000, 20000000],
      }"
    />
    <ErrorMessage
      name="Loan amount"
      class="left-0 top-full block text-xs text-danger-500 first-letter:uppercase md:absolute"
    />
  </div>
</template>
