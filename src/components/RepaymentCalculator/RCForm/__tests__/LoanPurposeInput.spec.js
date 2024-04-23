import { mount } from '@vue/test-utils';
import LoanPurposeInput from '@/components/RepaymentCalculator/RCForm/LoanPurposeInput.vue';

describe('LoanPurposeInput', () => {
  const options = [
    {
      label: 'Day-to-day capital',
      value: 'general',
      annualRate: 0.1,
    },
  ];

  test('render correctly', () => {
    const wrapper = mount(LoanPurposeInput, {
      props: {
        modelValue: 0,
        options,
      },
    });

    expect(wrapper.find('[data-name="loan-purpose-field"]').exists()).toBe(true);
  });

  test('return selected value correctly', async () => {
    const wrapper = mount(LoanPurposeInput, {
      props: {
        modelValue: 0,
        options,
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    const loanPurposeInput = wrapper.find('[data-name="loan-purpose-field"]');
    await loanPurposeInput.setValue('0.1');
    expect(wrapper.props('modelValue')).toBe(0.1);
  });
});
