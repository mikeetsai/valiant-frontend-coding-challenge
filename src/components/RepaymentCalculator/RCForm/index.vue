<script setup lang="ts">
import { ref, onMounted, readonly, defineModel, watch } from 'vue';
import { useGetLoanPurposesApi, useGetRequestedRepaymentPeriodsApi, useGetRequestedTermMonthsApi } from '@/services/RepaymentCalculator';
import { PMT } from '@/utils';
import { Form } from 'vee-validate';

import LoanAmountInput from '@/components/RepaymentCalculator/RCForm/LoanAmountInput.vue';
import LoanPurposeInput from '@/components/RepaymentCalculator/RCForm/LoanPurposeInput.vue';
import RepaymentPeriodInput from '@/components/RepaymentCalculator/RCForm/RepaymentPeriodInput.vue';
import RepaymentTermMonthsInput from '@/components/RepaymentCalculator/RCForm/RepaymentTermMonthsInput.vue';

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
          <LoanAmountInput v-model="form.loanAmount" />
        </div>
        <div class="flex items-center gap-3">
          <div class="text-nowrap font-bold text-primary-500">
            for
          </div>
          <LoanPurposeInput
            v-model="form.annualRate"
            :options="loanPurposes"
          />
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
          <RepaymentPeriodInput
            v-model="form.repaymentPeriod"
            :options="paymentPeriods"
          />
        </div>
        <div class="flex items-center gap-3">
          <label
            for="repaymentPeriod"
            class="text-nowrap font-bold text-primary-500"
          >
            over
          </label>
          <RepaymentTermMonthsInput
            v-model="form.repaymentTermMonths"
            :options="termMonths"
          />
        </div>
      </div>
    </Form>
  </div>
</template>
