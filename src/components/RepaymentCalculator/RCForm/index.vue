<script setup lang="ts">
import { ref, onMounted, defineModel, watch } from 'vue';
import { useGetLoanPurposesApi, useGetRequestedRepaymentPeriodsApi, useGetRequestedTermMonthsApi } from '@/services/RepaymentCalculator';
import { PMT } from '@/utils';
import { Form } from 'vee-validate';
import { useRCFormStore } from '@/stores/repaymentCalculator';

// @components
import LoanAmountInput from '@/components/RepaymentCalculator/RCForm/LoanAmountInput.vue';
import LoanPurposeInput from '@/components/RepaymentCalculator/RCForm/LoanPurposeInput.vue';
import RepaymentPeriodsInput from '@/components/RepaymentCalculator/RCForm/RepaymentPeriodsInput.vue';
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
const resultModel: ModelRef<CalcRepaymentResult> = defineModel<CalcRepaymentResult>('result', {
  default: {} as CalcRepaymentResult,
  required: true,
});
const rcFormRef = ref<InstanceType<typeof Form>>();
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
    loanPurposes,
    paymentPeriods,
    termMonths,
  };
}

function calculateOnFormWatch () {
  watch(form, async (v) => {
    const isValidate = await validate();

    if (!isValidate.valid) {
      $_RCFormStore.resetFormData();
      resultModel.value = {} as CalcRepaymentResult;
      return false;
    }

    if (v.loanAmount && v.annualRate && v.repaymentPeriod && v.repaymentTermMonths) {
      await calculate();
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

async function calculate () {
  const calc = PMT(
    form.value.annualRate / form.value.repaymentPeriod,
    form.value.repaymentTermMonths,
    Number(form.value.loanAmount)
  );
  resultModel.value.monthlyRepayment = Math.abs(Math.trunc(calc));
  resultModel.value.totalRepayment = resultModel.value.monthlyRepayment * form.value.repaymentTermMonths;
  resultModel.value.repaymentTermMonths = form.value.repaymentTermMonths;

  $_RCFormStore.setFormData(form.value);
}

async function validate () {
  return await rcFormRef.value?.validate();
}
</script>

<template>
  <div>
    <h1
      class="mb-10 ml-3 text-center text-2xl font-bold text-primary-500"
      data-name="rc-form-title"
    >
      Repayment Calculator
    </h1>
    <Form
      ref="rcFormRef"
      class="rc-form px-6"
      data-name="rc-form"
    >
      <div class="mb-3 grid gap-3 md:mb-8 md:grid-cols-2">
        <div class="flex shrink-0 gap-3 md:items-center">
          <label
            for="loanAmount"
            class="block w-14 shrink-0 text-nowrap text-right font-bold text-primary-500"
          >
            I need
          </label>
          <LoanAmountInput
            ref="loanAmountInput"
            v-model="form.loanAmount"
            class="w-full"
            data-name="loan-amount-input"
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
            data-name="loan-purpose-input"
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
          <RepaymentPeriodsInput
            v-model="form.repaymentPeriod"
            :options="paymentPeriods"
            class="w-full"
            data-name="repayment-periods-input"
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
            data-name="repayment-term-months-input"
          />
        </div>
      </div>
    </Form>
  </div>
</template>
