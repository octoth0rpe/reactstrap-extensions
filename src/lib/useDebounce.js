import * as React from 'react';

export const useDebounce = (value, delay = 500) => {
  const [instantValue, setInstantValue] = React.useState(value);
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      const handle = setTimeout(
        () => setDebouncedValue(instantValue),
        delay,
      );

      return () => clearTimeout(handle);
    },
    [instantValue, delay],
  );

  return [instantValue, setInstantValue, debouncedValue];
};

export default useDebounce;