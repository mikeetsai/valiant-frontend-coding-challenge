import { mount } from '@vue/test-utils';
import LoanAmountInput from '@/components/RepaymentCalculator/RCForm/LoanAmountInput.vue';
import '@/plugins/VeeValidate';

describe('LoanAmountInput', () => {
  test('render correctly', () => {
    const wrapper = mount(LoanAmountInput, {
      props: {
        modelValue: '',
      },
    });

    expect(wrapper.find('[data-name="loan-amount-field"]').exists()).toBe(true);
  });

  test('return input value correctly', async () => {
    const wrapper = mount(LoanAmountInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    const loanAmountInput = wrapper.find('[data-name="loan-amount-field"]');
    await loanAmountInput.setValue(30000);
    expect(wrapper.props('modelValue')).toBe('30000');
  });

  test('input digits only', async () => {
    const wrapper = mount(LoanAmountInput, {
      props: {
        modelValue: '',
        // 'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    });
    const loanAmountInput = wrapper.find('[data-name="loan-amount-field"]');
    await loanAmountInput.trigger('keypress', { key: 'a' });
    expect(wrapper.props('modelValue')).toBe('');
  });
});
