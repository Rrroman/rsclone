export default function createIcon(className: string, svg: string) {
  const div = document.createElement('div');
  div.innerHTML = svg;

  div.classList.add(className);
  return div;
}
