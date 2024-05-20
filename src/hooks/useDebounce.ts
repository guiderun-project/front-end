const useDebounce = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
  ) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): ReturnType<T> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let result: any;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        result = fn(...args);
      }, delay);
      return result;
    };
  };
  return debounce;
};

export default useDebounce;
