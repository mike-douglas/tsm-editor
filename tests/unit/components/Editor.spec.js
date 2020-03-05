import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Editor from '@/components/editor/Editor.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Editor', () => {
  let actions;
  let mutations;

  // Mock for clipboard data
  const clipboardData = data => ({
    getData: () => data,
  });

  beforeEach(() => {
    actions = {
      loadFromLocation: jest.fn(),
      saveToLocation: jest.fn(),
    };

    mutations = {
      saveString: jest.fn(),
      setSelectCallback: jest.fn(),
    };
  });

  it('reformats a string when pasted in with beautify ON', async () => {
    const sampleString = 'dbmarket+100g';
    const expectedString = 'DBMarket + 100g';

    const wrapper = mount(Editor, {
      localVue,
      store: new Vuex.Store({
        actions,
        mutations,
        state: {
          cleanUpFlag: true,
          priceString: '',
        },
      }),
    });

    const editorRenderLayer = wrapper.find('.editor-renderer');
    const editorEventLayer = wrapper.find('.editor-event');

    editorEventLayer.trigger('paste', { clipboardData: clipboardData(sampleString) });

    await localVue.nextTick();

    expect(editorRenderLayer.text()).toMatch(expectedString);
  });

  it('reformats a string when pasted in with beautify OFF', async () => {
    const sampleString = 'dbmarket+100g';
    const expectedString = 'dbmarket+100g';

    const wrapper = mount(Editor, {
      localVue,
      store: new Vuex.Store({
        actions,
        mutations,
        state: {
          cleanUpFlag: false, // Testing this.
          priceString: '',
        },
      }),
    });

    const editorRenderLayer = wrapper.find('.editor-renderer');
    const editorEventLayer = wrapper.find('.editor-event');

    editorEventLayer.trigger('paste', { clipboardData: clipboardData(sampleString) });

    await localVue.nextTick();

    expect(editorRenderLayer.text()).toMatch(expectedString);
  });

  // it('displays the autocomplete dropdown on >= 3 matching characters', async () => {
  //   const wrapper = mount(Editor, {
  //     localVue,
  //     store: new Vuex.Store({
  //       actions,
  //       mutations,
  //       state: {
  //         cleanUpFlag: true,
  //         priceString: 'DB',
  //       },
  //     }),
  //   });

  //   const editorEventLayer = wrapper.find('.editor-event');
  //   const dropdown = wrapper.find('.dropdown');

  //   editorEventLayer.trigger('input');
  //   editorEventLayer.trigger('keyup', {
  //     keyCode: 'M',
  //   });

  //   await localVue.nextTick();

  //   expect(dropdown.props('visible')).toBe(true);
  // });
});
