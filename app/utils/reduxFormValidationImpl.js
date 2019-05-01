const isRequired = ({ isZeroNotAllowed, isOnlySpacesNotAllowed } = {}) => (value) => {
  let validationText;
  const errors = {
    required: 'Field Required',
  };

  if (isZeroNotAllowed) {
    const valueNumeric = parseInt(value, 10);
    if (!isNaN(valueNumeric) && valueNumeric === 0) {
      validationText = errors.required;
    }
  }
  if (isOnlySpacesNotAllowed && typeof value === 'string' && value.length > 0 && value.trim().length === 0) {
    validationText = errors.required;
  }

  if (!validationText && !value) {
    validationText = errors.required;
  }
  return validationText;
};

const isInteger = () => (value) => {
  let validationText;
  const errors = {
    positive: 'Expected positive numeric without decimals',
  };

  const regEx = /^\d+$/;
  if (!regEx.test(value)) {
    validationText = errors.positive;
  }

  return validationText;
};


const isAlphabetsOnly = (allowedSpaces = false) => (value) => {
  let validationText;
  const errors = {
    positive: 'Expected alphabets only',
  };
  let regEx = /^[-'a-zA-Z]*$/;
  if (allowedSpaces) {
    regEx = /^[-'a-zA-Z]+((\s{1})?[-'a-zA-Z]+)*$/;
  }
  if (!regEx.test(value)) {
    validationText = errors.positive;
  }
  return validationText;
};

const isAlphaNumeric = (allowedSpaces = false) => (value) => {
  let validationText;
  const errors = {
    positive: 'Expected alphanumeric value',
  };
  let regEx = /^[-'a-zA-Z0-9]*$/;
  if (allowedSpaces) {
    regEx = /^[-'a-zA-Z0-9_]+((\s{1})?[-'a-zA-Z0-9_]+)*$/;
  }
  if (!regEx.test(value)) {
    validationText = errors.positive;
  }
  return validationText;
};

const isValueInRange = ({ minRange, maxRange } = {}) => (value) => {
  let validationText;
  const errors = {
    default: `Value should be${minRange ? ` greater than ${minRange}` : ''}${maxRange ? ` less than ${maxRange}` : ''}`,
  };

  const currentValue = parseInt(value, 10);
  if (currentValue === null || isNaN(currentValue) || (minRange && currentValue < minRange) || (maxRange && currentValue > maxRange)) {
    validationText = errors.default;
  }

  return validationText;
};

const validateUploadDropZone = ({ customErrorMessage } = {}) => (value) => {
  let validationText;
  const errors = {
    default: 'Required',
  };

  if (!value || (Array.isArray(value) && value.length === 0)) {
    validationText = customErrorMessage || errors.default;
  }

  return validationText;
};

const isMobileNumber = () => (value) => {
  let validationText;
  const errors = {
    required: 'Enter valid 10 digit mobile number',
  };
  if (value && !/^[6-9]\d{9}$/i.test(value)) {
    validationText = errors.required;
  }
  return validationText;
};

const isMobileOrLandline = () => (value) => {
  let validationText;
  const errors = {
    required: 'Enter valid 10 digit mobile or 11 digit Land-line number',
  };

  if (value && !/^\d{10,11}$/i.test(value)) {
    validationText = errors.required;
  }
  return validationText;
};

const isEmail = () => (value) => {
  let validationText;
  const errors = {
    required: 'Enter valid Email',
  };
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    validationText = errors.required;
  }
  return validationText;
};

const isPincode = () => (value) => {
  let validationText;
  const errors = {
    required: 'Enter valid pincode',
  };
  if (value && !/^\d{6}$/i.test(value)) {
    validationText = errors.required;
  }
  return validationText;
};

export {
  isRequired,
  isInteger,
  isValueInRange,
  validateUploadDropZone,
  isMobileNumber,
  isMobileOrLandline,
  isEmail,
  isPincode,
  isAlphabetsOnly,
  isAlphaNumeric,
};
