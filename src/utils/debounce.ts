export const debounce = function (fn: Function, delay: number) {
  let timer: any = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, arguments);
    }, delay);
  };
};
