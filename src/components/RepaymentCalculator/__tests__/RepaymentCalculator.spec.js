import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import RepaymentCalculator from '@/components/RepaymentCalculator';
import '@/plugins/VeeValidate';

describe('RepaymentCalculator', () => {
  const result = {
    monthlyRepayment: 1384,
    totalRepayment: 33216,
    repaymentTermMonths: 24,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('render correctly', () => {
    const wrapper = mount(RepaymentCalculator);
    expect(wrapper.find('[data-name="repayment-calculator-form-component"]').exists()).toBe(true);
  });

  test('return added commas on monthly repayment value', async () => {
    const wrapper = mount(RepaymentCalculator);

    wrapper.vm.getResult = result;

    await flushPromises();

    const monthlyRepaymentText = wrapper.find('[data-name="monthly-repayment-value"]').text();
    expect(monthlyRepaymentText).toContain('1,384');
  });

  test('return added commas on total repayment value', async () => {
    const wrapper = mount(RepaymentCalculator);

    wrapper.vm.getResult = result;

    await flushPromises();

    const totalRepaymentText = wrapper.find('[data-name="total-repayment-value"]').text();
    expect(totalRepaymentText).toContain('33,216');
  });
});
