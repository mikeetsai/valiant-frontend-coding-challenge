import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getPersistedState, setPersistedState } from '@/utils';

import type { Ref } from 'vue';
import type { CalcRepaymentRequest } from '@/types/RepaymentCalculatorTypes';

export const useRCFormStore = defineStore('repaymentCalculatorForm', () => {
  const persistedState: CalcRepaymentRequest = getPersistedState('repaymentCalculatorForm');

  const defaultForm: CalcRepaymentRequest = {
    loanAmount: '',
    annualRate: 0,
    repaymentPeriod: 0,
    repaymentTermMonths: 0,
  };

  const form: Ref<CalcRepaymentRequest> = ref(persistedState || defaultForm);

  function setFormData (data: CalcRepaymentRequest): void {
    form.value = data;
    setPersistedState('repaymentCalculatorForm', data);
  }

  return { form, setFormData };
});
