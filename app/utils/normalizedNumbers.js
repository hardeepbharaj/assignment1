// eslint-disable-next-line
let normalizedInput = (inputRawValue, precision, isZeroAllowed) => {
  const rawValue = inputRawValue;
  let normalizedValue = rawValue.replace(/[a-zA-Z ]/g, '').replace(/[^\w\s]/gi, '').replace(/_/g, '');
  normalizedValue = isZeroAllowed ? normalizedValue.replace(/^0+/, '0') : normalizedValue.replace(/^0+/, '');
  const arr = normalizedValue.split('');
  if (precision > 0 && normalizedValue.length > 0) {
    arr.splice(arr.length - precision, 0, '.');
    normalizedValue = arr.join('');
    return normalizedValue;
  }
  return normalizedValue;
};
// eslint-disable-next-line
let padDecimalValueWithZeros = (inputRawValue, precision) => {
  let rawValue = inputRawValue;
  if ((inputRawValue || inputRawValue === 0) && precision) {
    rawValue = Number(rawValue).toFixed(precision).toString();
  }
  return rawValue;
};
// eslint-disable-next-line
let maskedInput = (normalizedValue, precision, prefix, thousandSeparator = ',', decimalSeparator = '.', symbol) => {
  const arr = normalizedValue.split('');
  let decimalpos = arr.length - precision - 1; // -1 needed to position the decimal separator before the digits.
  if (precision > 0) {
    arr[decimalpos] = decimalSeparator;
  } else {
    decimalpos = arr.length;
  }
  if (prefix === 'INR') {
    for (let x = decimalpos - 3; x > 0; x -= 2) {
      arr.splice(x, 0, thousandSeparator);
    }
  } else if (prefix === 'USD') {
    for (let x = decimalpos - 3; x > 0; x -= 3) {
      arr.splice(x, 0, thousandSeparator);
    }
  }
  if (arr.length !== 0 && symbol) {
    arr.unshift(symbol);
  }
    // else {
    //   for (let x = decimalpos - 3; x > 0; x -= 2) {
    //     arr.splice(x, 0, thousandSeparator);
    //   }
    // }
  return arr.join('');
};
// eslint-disable-next-line
let combinedInput = (rawValue, precision, prefix, isZeroAllowed, symbol) => {
  let normalizedValue = '';
  let maskedValue = '';
    // if (rawValue !== undefined && rawValue != null && !isNaN(rawValue)) {
  normalizedValue = normalizedInput(`${rawValue}`, precision, isZeroAllowed);
  maskedValue = maskedInput(normalizedValue, precision, prefix);
  if (symbol) {
    maskedValue = maskedInput(normalizedValue, precision, prefix, ',', '.', symbol);
  }
    // }
  return { normalizedValue, maskedValue };
};

export { combinedInput, normalizedInput, maskedInput, padDecimalValueWithZeros };
