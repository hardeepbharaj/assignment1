function normalizeAll(normalizers) {
  return (value, previousValue, allValues, previousAllValues) => { // note that these arguments are passed by default from redux form
    let i = 0;
    const normalizersLength = normalizers.length;
    let currentValue = value;
    while (i < normalizersLength) {
      const currentNormalizer = normalizers[i];
      if (typeof currentNormalizer === 'function') {
        currentValue = currentNormalizer(currentValue, previousValue, allValues, previousAllValues);
      }
      i += 1;
    }

    return currentValue;
  };
}

// I am using only the `value` argument in normalization functions just for the example, but you can use the rest of them if they are needed
const changeToCamelCase = value => value.replace(/\b\w/g, l => l.toUpperCase());

const notMoreThn10 = (value, previousValue) => {
  if (value.toString().trim().length > 10) {
    return previousValue;
  }
  return value;
};

const toLocaleStrings = (value) => {
  const stringVal = (typeof value === 'number') ? value.toString() : value;
  const isLastDecimal = stringVal.replace(/,/g, '').slice(-1);
  if (isLastDecimal === '.') {
    return stringVal;
  }
  const intVal = parseFloat(stringVal.replace(/,/g, ''));
  if (!Number.isNaN(intVal)) { return intVal.toLocaleString('en-IN'); }
  return '';
};

const noSpaceNoNum = (value, previousValue) => {
  if (value && !value.match(/^[A-Za-z]+$/)) {
    return previousValue;
  }
  return value;
};

const noSpace = (value, previousValue) => {
  if (value && !value.match(/^[A-Za-z0-9]+$/)) {
    return previousValue;
  }
  return value;
};

const upperCase = value => value && value.toUpperCase();
const lowerCase = value => value && value.toLowerCase();

const onlyNum = (value, previousValue) => {
  if (value && isNaN(value)) { // eslint-disable-line
    return previousValue;
  }
  return value;
};

const noForwordSpaces = value => value && value.replace(/[\s]*/, '');

const escapeRegExp = value => value && value.replace(/[.*+?^${}()%@#|[\]\\]/g, '');

const escapeAlphabets = value => value && value.replace(/[A-Za-z]/g, '');

const escapeAlphaRegExp = value => value && value.replace(/[A-Za-z.*+?^${}()@#&%|[\]\\]/g, '');

const maxLength = max => (value) => {
  if (value.length > max) { return value.substr(0, max); }
  return value;
};

const storeNumReducer = (val) => {
  if (val) {
    const number = parseFloat(val.split(',').join(''));
    const num = number.toString().split('.')[0];
    return parseInt(num, 10);
  } return val;
};

export {
  changeToCamelCase,
  notMoreThn10,
  toLocaleStrings,
  noSpaceNoNum,
  upperCase,
  lowerCase,
  onlyNum,
  noSpace,
  noForwordSpaces,
  escapeRegExp,
  escapeAlphabets,
  escapeAlphaRegExp,
  maxLength,
  storeNumReducer,
};


export default normalizeAll;
