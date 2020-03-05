import { shallowMount } from '@vue/test-utils';
import Tooltip from '@/components/Tooltip.vue';

describe('Tooltip', () => {
  it('renders tooltip text when passed', () => {
    const text = 'new message';
    const wrapper = shallowMount(Tooltip, {
      propsData: { text },
    });
    expect(wrapper.text()).toMatch(text);
  });

  it('shows the tooltip when the user hovers', () => {
    const wrapper = shallowMount(Tooltip, {
      propsData: { text: 'some message' },
    });

    const tooltip = wrapper.find('.tooltip');
    const tooltipText = wrapper.find('.tooltip-text');

    tooltip.trigger('mouseover');
    expect(tooltipText.isVisible()).toBe(true);
  });
});
