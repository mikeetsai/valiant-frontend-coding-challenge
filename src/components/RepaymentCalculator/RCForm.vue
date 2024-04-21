<script setup lang="ts">
import { ref, onMounted, readonly, defineModel, watch } from 'vue';
import { useGetLoanPurposesApi, useGetRequestedRepaymentPeriodsApi, useGetRequestedTermMonthsApi } from '@/services/RepaymentCalculator';
import { PMT } from '@/utils';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { digitsOnly } from '@/directives';

import type { Ref, ModelRef } from 'vue';
import type {
  LoanPurposesApiResponse,
  CalcRepaymentRequest,
  CalcRepaymentResult,
  RequestedTermMonthsApiResponse,
  RequestedRepaymentPeriodsApiResponse,
} from '@/types/RepaymentCalculatorTypes';

const form: Ref<CalcRepaymentRequest> = ref({
  loanAmount: '',
  annualRate: 0,
  repaymentPeriod: 0,
  repaymentTermMonths: 0,
});

const calcModel: ModelRef<CalcRepaymentResult> = defineModel<CalcRepaymentResult>('calculate', {
  default: {} as CalcRepaymentResult,
  required: true,
});

const { loanPurposes, paymentPeriods, termMonths } = fetchData();

calculateOnFormWatch();

// Directives
const vDigitsOnly = digitsOnly;

function fetchData () {
  const loanPurposes: Ref<LoanPurposesApiResponse[]> = ref([]);
  const paymentPeriods: Ref<RequestedRepaymentPeriodsApiResponse[]> = ref([]);
  const termMonths: Ref<RequestedTermMonthsApiResponse[]> = ref([]);

  onMounted(async () => {
    [loanPurposes.value, paymentPeriods.value, termMonths.value] = await Promise.all([
      useGetLoanPurposesApi(),
      useGetRequestedRepaymentPeriodsApi(),
      useGetRequestedTermMonthsApi(),
    ]);
  });

  return {
    loanPurposes: readonly(loanPurposes),
    paymentPeriods: readonly(paymentPeriods),
    termMonths: readonly(termMonths),
  };
}

function calculateOnFormWatch () {
  const calculate = () => {
    const calc = PMT(
      form.value.annualRate / form.value.repaymentPeriod,
      form.value.repaymentTermMonths,
      Number(form.value.loanAmount)
    );
    calcModel.value.monthlyRepayment = Math.abs(Math.trunc(calc));
    calcModel.value.totalRepayment = calcModel.value.monthlyRepayment * form.value.repaymentTermMonths;
    calcModel.value.repaymentTermMonths = form.value.repaymentTermMonths;
  };

  watch(form, (v) => {
    if (v.loanAmount && v.annualRate && v.repaymentPeriod && v.repaymentTermMonths) {
      calculate();
    }
  }, { deep: true });
}

</script>

<template>
  <div>
    <h1 class="mb-10 ml-3 text-center text-2xl font-bold text-primary-500">
      Repayment Calculator
    </h1>
    <Form class="repayment-calculator px-6">
      <div class="mb-8 grid gap-3 md:grid-cols-2">
        <div class="flex items-center gap-3">
          <label
            for="loanAmount"
            class="text-nowrap font-bold text-primary-500"
          >
            I need
          </label>
          <div class="relative w-full">
            <Field
              id="loanAmount"
              v-model="form.loanAmount"
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
              class="absolute left-0 top-full block text-xs text-danger-500 first-letter:uppercase"
            />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-nowrap font-bold text-primary-500">
            for
          </div>
          <select
            id="loanPurpose"
            v-model="form.annualRate"
            class="select"
          >
            <option
              value=""
              disabled
              selected
            >
              Select loan purpose
            </option>
            <option
              v-for="(option, i) in loanPurposes"
              :key="i"
              :value="option.annualRate"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <div class="flex items-center gap-3">
          <label
            for="repaymentPeriod"
            class="text-nowrap font-bold text-primary-500"
          >
            repaid
          </label>
          <select
            id="repaymentPeriod"
            v-model="form.repaymentPeriod"
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
              v-for="(option, i) in paymentPeriods"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <label
            for="repaymentPeriod"
            class="text-nowrap font-bold text-primary-500"
          >
            over
          </label>
          <select
            id="loanTerm"
            v-model="form.repaymentTermMonths"
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
              v-for="(option, i) in termMonths"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </Form>
  </div>
</template>
