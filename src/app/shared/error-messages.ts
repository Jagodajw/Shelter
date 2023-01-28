export interface ErrorMessages {
  [key: string]: string;
}

const messages: ErrorMessages = {
  required: 'validators.required',
};

export const getErrorMessage: (
  validatorId: string,
  errorValue?: any
) => string = (validatorId, errorValue = undefined) => {
  if (validatorId === 'errorMessage') {
    return `${errorValue}`;
  }

  if (errorValue && errorValue.message) {
    return errorValue.message;
  }

  return messages[validatorId] ?? `[${validatorId}] -> ${errorValue}`;
};
