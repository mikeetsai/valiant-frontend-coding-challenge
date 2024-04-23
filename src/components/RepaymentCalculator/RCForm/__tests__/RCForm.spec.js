import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import RCForm from '@/components/RepaymentCalculator/RCForm';
import '@/plugins/VeeValidate';

describe('RCForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const result = {
    monthlyRepayment: 0,
    totalRepayment: 0,
    repaymentTermMonths: 0,
  };

  test('render RCForm correctly', async () => {
    const wrapper = mount(RCForm, {
      props: { result },
    });

    expect(wrapper.find('[data-name="rc-form-title"]').exists()).toBe(true);
    expect(wrapper.find('[data-name="loan-amount-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-name="loan-purpose-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-name="repayment-periods-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-name="repayment-term-months-input"]').exists()).toBe(true);
  });

  test('calculate the repayment correctly', async () => {
    const wrapper = mount(RCForm, {
      props: {
        result,
      },
    });

    wrapper.vm.loanPurposes = [{
      label: 'Day to day',
      value: 'general',
      annualRate: 0.1,
    }];

    wrapper.vm.paymentPeriods = [{
      label: 'Monthly',
      value: 12,
    }];

    wrapper.vm.termMonths = [{
      label: '2 years',
      value: 24,
    }];

    const loanAmountInput = wrapper.find('[data-name="loan-amount-input"]').get('input');
    const loanPurposeInput = wrapper.find('[data-name="loan-purpose-input"]').get('select');
    const RepaymentPeriodsInput = wrapper.find('[data-name="repayment-periods-input"]').get('select');
    const repaymentTermMonthsInput = wrapper.find('[data-name="repayment-term-months-input"]').get('select');

    await loanAmountInput.setValue(30000);
    await loanPurposeInput.setValue(0.1);
    await RepaymentPeriodsInput.setValue(12);
    await repaymentTermMonthsInput.setValue(24);

    await wrapper.vm.calculate();
    expect(wrapper.vm.result.monthlyRepayment).toBe(1384);
  });
});
