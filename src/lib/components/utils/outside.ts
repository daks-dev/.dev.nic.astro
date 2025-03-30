function outside(node: HTMLElement, callback: (node?: HTMLElement) => void) {
  const handle = (event: Event) => {
    if (!event?.target) return;
    if (node && !event.defaultPrevented && !node.contains(event.target as Node)) callback(node);
  };
  document.addEventListener('click', handle, true);
  return {
    destroy() {
      document.removeEventListener('click', handle, true);
    }
  };
}

outside.withnext = function (node: HTMLElement, callback: (node?: HTMLElement) => void) {
  const handle = (event: Event) => {
    if (!event?.target) return;
    if (
      node &&
      !event.defaultPrevented &&
      !node.contains(event.target as Node) &&
      !node.nextElementSibling?.contains(event.target as Node)
    )
      callback(node);
  };
  document.addEventListener('click', handle, true);
  return {
    destroy() {
      document.removeEventListener('click', handle, true);
    }
  };
};

export default outside;
