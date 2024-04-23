import { mount } from '@vue/test-utils';
import RepaymentTermMonthsInput from '@/components/RepaymentCalculator/RCForm/RepaymentTermMonthsInput.vue';

describe('RepaymentTermMonthsInput', () => {
  const options = [
    {
      label: '2 years',
      value: 24,
    },
  ];

  test('render correctly', () => {
    const wrapper = mount(RepaymentTermMonthsInput, {
      props: {
        modelValue: 0,
        options,
      },
    });

    expect(wrapper.find('[data-name="repayment-term-months-field"]').exists()).toBe(true);
  });

  test('return selected value correctly', async () => {
    const wrapper = mount(RepaymentTermMonthsInput, {
      props: {
        modelValue: 0,
        options,
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    const repaymentPeriodsField = wrapper.find('[data-name="repayment-term-months-field"]');
    await repaymentPeriodsField.setValue(24);
    expect(wrapper.props('modelValue')).toBe(24);
  });
});
