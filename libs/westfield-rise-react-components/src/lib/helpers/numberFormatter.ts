export const trauncateFractionAndFormat = (
  parts: { type: string; value: string }[],
  digits: number,
) => {
  return parts
    .map(({ type, value }) => {
      if (type !== 'fraction' || !value || value.length < digits) {
        return value;
      }

      let retVal = '';
      for (
        let idx = 0, counter = 0;
        idx < value.length && counter < digits;
        idx++
      ) {
        if (value[idx] !== '0') {
          counter++;
        }
        retVal += value[idx];
      }
      return retVal;
    })
    .reduce((string, part) => string + part);
};

export const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 10,
});
