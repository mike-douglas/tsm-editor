import Vue from 'vue';

const EditorEventBus = new Vue();

export default EditorEventBus;

export const events = {
  /* Sets the internal state of the contenteditable editor element.
   * Payload: { string: newStringValue, caret: { start: offsetValue, length: lengthValue } }
   */
  SET_EDITOR_STATE: 'Editor.SetState',

  /* Copies content to the system clipboard from the editor element.
   */
  SET_EDITOR_COPY_TO_CLIPBOARD: 'Editor.CopyToClipboard',

  /* Fired from the editor when an input event occurs.
   * Payload: newStringValue (the current value in the editor element)
   */
  EDITOR_INPUT: 'Events.OnInput',

  /* Fired when the height of the editor element changes as a result of input.
   * Payload: newHeightValue (the new height of the editor element)
   */
  EDITOR_SCROLLHEIGHT_CHANGED: 'Editor.ScrollHeightChanged',

  /* Fired when the caret changes as the result of input.
   * Payload: { position: Position(x, y), range: Range }
   */
  EDITOR_CARET_CHANGED: 'Editor.SelectionCaretChanged',

  /* Fired on keydown event from editor element.
   * Payload: Event
   */
  EDITOR_KEYDOWN: 'Editor.KeyDown',

  /* Fired on keyup event from editor element.
   * Payload: Event
   */
  EDITOR_KEYUP: 'Editor.KeyUp',

  /* Fired on click event inside of editor element.
   * Payload: Event
   */
  EDITOR_CLICK: 'Editor.OnClick',

  /* Fired on blur event from inside of editor element.
   * Payload: Event
   */
  EDITOR_BLUR: 'Editor.OnBlur',
};
