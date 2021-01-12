/**
 * @param {String} el
 * @param {String} classNames
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 * @param  {...array} dataAttr
 */
export default function create(
  el: string,
  {
    className,
    child,
    parent,
    dataAttr,
  }: {
    className?: string;
    child?: HTMLElement | string | null | HTMLElement[];
    parent?: HTMLElement | null;
    dataAttr?: string[][];
  }
) {
  let element: HTMLElement | null = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('unable to create  HTMLElement! Give a proper tag name');
  }

  if (className) element.classList.add(...className.split(' '));

  if (child && Array.isArray(child)) {
    child.forEach((childElement) => {
      if (childElement && typeof childElement === 'string' && element) {
        element.innerHTML = childElement;
      } else if (childElement && element) {
        element.appendChild(childElement);
      }
    });
  } else if (child && typeof child === 'object' && child !== null) {
    element.appendChild(child);
  } else if (child && typeof child === 'string') {
    element.innerHTML = child;
  }

  if (parent && parent !== null) {
    parent.appendChild(element);
  }

  if (dataAttr && dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '' && element) {
        element.setAttribute(attrValue, '');
      } else if (
        (attrName.match(
          /value|id|placeholder|cols|rows|autocorrect|spellcheck|for|type|draggable/
        ) ||
          attrName.match(
            /style|src|alt|href|target|size|key|autocomplete|maxlength|name/
          ) ||
          attrName.match(
            /accept|align|checked|defaultChecked|defaultValue|dir|dirName|disabled|files/
          )) &&
        element
      ) {
        element.setAttribute(attrName, attrValue);
      } else if (element) {
        element.dataset[attrName] = attrValue;
      }
    });
  }

  return element;
}
