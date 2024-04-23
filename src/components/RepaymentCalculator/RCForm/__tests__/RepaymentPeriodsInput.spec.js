import { mount } from '@vue/test-utils';
import RepaymentPeriodsInput from '@/components/RepaymentCalculator/RCForm/RepaymentPeriodsInput.vue';

describe('RepaymentPeriodsInput', () => {
  const options = [
    {
      label: 'Monthly',
      value: 12,
    },
  ];

  test('render correctly', () => {
    const wrapper = mount(RepaymentPeriodsInput, {
      props: {
        modelValue: 0,
        options,
      },
    });

    expect(wrapper.find('[data-name="repayment-periods-field"]').exists()).toBe(true);
  });

  test('return selected value correctly', async () => {
    const wrapper = mount(RepaymentPeriodsInput, {
      props: {
        modelValue: 0,
        options,
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    const repaymentPeriodsField = wrapper.find('[data-name="repayment-periods-field"]');
    await repaymentPeriodsField.setValue(12);
    expect(wrapper.props('modelValue')).toBe(12);
  });
});
