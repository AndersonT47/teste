export const tabNavigation = (e: any, tab: number) => {
  console.log("e", e);

  if (e.target.nextSibling) {
    e.target.nextSibling.tabIndex = e.target.dataset.index;
  }

  if (e.key == "Tab" && e.shiftKey && tab !== 0) {
    e.preventDefault();
    e.stopPropagation();
    (e.target.previousSibling as HTMLElement)?.focus();
  } else if (e.code == "Tab" && !e.shiftKey) {
    if (e.target.nextSibling) {
      e.preventDefault();
      e.stopPropagation();
      (e.target.nextSibling as HTMLElement)?.focus();
    } else {
      e.target.removeAttribute("tabIndex");
    }
  }
};
