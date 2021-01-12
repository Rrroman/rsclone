export default function autoResize(el: HTMLTextAreaElement) {
  // eslint-disable-next-line no-param-reassign
  el.style.height = 'auto';
  // eslint-disable-next-line no-param-reassign
  el.style.height = `${el.scrollHeight}px`;
}
