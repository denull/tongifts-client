export function makeScroller(list, loader) {
  let isLoading = false;
  let isLoaded = false;
  return async function listScrolled(ev) {
    if (isLoading || isLoaded) return;
    let el = ev.target;
    if (el.scrollTop + el.clientHeight + 240 > el.scrollHeight) {
      isLoading = true;
      const next = await loader(list.value.length);
      if (next.length) {
        list.value.push(...next);
      } else {
        isLoaded = true;
      }
      isLoading = false;
    }
  }
}