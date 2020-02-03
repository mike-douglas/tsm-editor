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
});
