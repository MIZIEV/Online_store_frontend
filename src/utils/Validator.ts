const urlPattern = new RegExp(
  '^(https?:\\/\\/)' +
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
  '((\\d{1,3}\\.){3}\\d{1,3}))' +
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
  '(\\?[;&a-z\\d%_.~+=-]*)?' +
  '(\\#[-a-z\\d_]*)?$', 'i'
);

export const isValidUrl = (url: string): boolean => {
  return urlPattern.test(url);
};

const colorPattern = /^#([0-9A-F]{6}|[0-9A-F]{3})$/i;

export const isValidColor = (color: string): boolean => {
  return colorPattern.test(color);
};

// validators for payments
export const validateCardNumber = (cardNumber: string) => {
  const cardNumberRegex = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;
  return cardNumberRegex.test(cardNumber);
}

export const validateExpirationDate = (expirationDate: string) => {
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  return expirationDateRegex.test(expirationDate);
}

export const validateCVV = (cvv: string) => {
  const cvvRegex = /^[0-9]{3,4}$/;
  return cvvRegex.test(cvv);
}

const phonePattern = /^\+380\d{9}$/;

export const validatePhoneNumber = (phoneNumber: string) => {
  return phonePattern.test(phoneNumber);
};