<script setup lang="ts">
import { ref, onMounted, readonly, defineModel, watch } from 'vue';
import { useGetLoanPurposesApi, useGetRequestedRepaymentPeriodsApi, useGetRequestedTermMonthsApi } from '@/services/RepaymentCalculator';
import { PMT } from '@/utils';
import { Form } from 'vee-validate';
import { useRCFormStore } from '@/stores/repaymentCalculator';

// @components
import LoanAmountInput from '@/components/RepaymentCalculator/RCForm/LoanAmountInput.vue';
import LoanPurposeInput from '@/components/RepaymentCalculator/RCForm/LoanPurposeInput.vue';
import RepaymentPeriodInput from '@/components/RepaymentCalculator/RCForm/RepaymentPeriodInput.vue';
import RepaymentTermMonthsInput from '@/components/RepaymentCalculator/RCForm/RepaymentTermMonthsInput.vue';

// @types
import type { Ref, ModelRef } from 'vue';
import type {
  LoanPurposesApiResponse,
  CalcRepaymentRequest,
  CalcRepaymentResult,
  RequestedTermMonthsApiResponse,
  RequestedRepaymentPeriodsApiResponse,
} from '@/types/RepaymentCalculatorTypes';

const $_RCFormStore = useRCFormStore();
const form: Ref<CalcRepaymentRequest> = ref({ ...$_RCFormStore.form });
const calcModel: ModelRef<CalcRepaymentResult> = defineModel<CalcRepaymentResult>('calculate', {
  default: {} as CalcRepaymentResult,
  required: true,
});

const { loanPurposes, paymentPeriods, termMonths } = fetchData();

calculateOnMounted();
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
  watch(form, (v) => {
    if (v.loanAmount && v.annualRate && v.repaymentPeriod && v.repaymentTermMonths) {
      calculate();
      $_RCFormStore.setFormData(form.value);
    }
  }, { deep: true });
}

function calculateOnMounted () {
  onMounted(() => {
    if (form.value.loanAmount && form.value.annualRate && form.value.repaymentPeriod && form.value.repaymentTermMonths) {
      calculate();
    }
  });
}

function calculate () {
  const calc = PMT(
    form.value.annualRate / form.value.repaymentPeriod,
    form.value.repaymentTermMonths,
    Number(form.value.loanAmount)
  );
  calcModel.value.monthlyRepayment = Math.abs(Math.trunc(calc));
  calcModel.value.totalRepayment = calcModel.value.monthlyRepayment * form.value.repaymentTermMonths;
  calcModel.value.repaymentTermMonths = form.value.repaymentTermMonths;
}
</script>

<template>
  <div>
    <h1 class="mb-10 ml-3 text-center text-2xl font-bold text-primary-500">
      Repayment Calculator
    </h1>
    <Form class="repayment-calculator px-6">
      <div class="mb-3 grid gap-3 md:mb-8 md:grid-cols-2">
        <div class="flex shrink-0 gap-3 md:items-center">
          <label
            for="loanAmount"
            class="block w-14 shrink-0 text-nowrap text-right font-bold text-primary-500"
          >
            I need
          </label>
          <LoanAmountInput
            v-model="form.loanAmount"
            class="w-full"
          />
        </div>
        <div class="flex w-full gap-3 md:items-center">
          <div class="block w-14 shrink-0 text-nowrap text-right font-bold text-primary-500">
            for
          </div>
          <LoanPurposeInput
            v-model="form.annualRate"
            :options="loanPurposes"
            class="w-full"
          />
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <div class="flex gap-3 md:items-center">
          <label
            for="repaymentPeriod"
            class="block w-14 shrink-0 text-nowrap text-right font-bold text-primary-500"
          >
            repaid
          </label>
          <RepaymentPeriodInput
            v-model="form.repaymentPeriod"
            :options="paymentPeriods"
            class="w-full"
          />
        </div>
        <div class="flex gap-3 md:items-center">
          <label
            for="repaymentPeriod"
            class="block w-14 shrink-0 text-nowrap text-right font-bold text-primary-500"
          >
            over
          </label>
          <RepaymentTermMonthsInput
            v-model="form.repaymentTermMonths"
            :options="termMonths"
            class="w-full"
          />
        </div>
      </div>
    </Form>
  </div>
</template>
