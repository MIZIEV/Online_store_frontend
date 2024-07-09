import { Phone } from "../shared.types";

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

export const validatePhoneData = (data: Phone): string[] => {
  const errorMessages: string[] = [];

  if (data.model.length < 5) {
    errorMessages.push("Поле 'модель' повинно бути довштим за 5 символів!");
  }
  if (data.producingCountry.length < 3) {
    errorMessages.push("Поле 'країна виробник' повинно бути довштим за 5 символів!");
  }
  if (data.screenSize <= 0) {
    errorMessages.push("Поле 'розмір екрана' не повинно бути від'ємним або нуль!");
  }
  if (data.mainCamera.length < 1) {
    errorMessages.push("Поле 'Головна камера' повинно бути довштим за 1 символ!");
  }
  if (data.frontCamera <= 0) {
    errorMessages.push("Поле 'Фронтальна камера' не повинно бути від'ємним або нуль!");
  }
  if (data.processor.length < 5) {
    errorMessages.push("Поле 'Процесор' повинно бути довштим за 5 символів!");
  }
  if (data.weight <= 0) {
    errorMessages.push("Поле 'Вага' не повинно бути від'ємним або нуль!");
  }
  if (data.batteryCapacity <= 0) {
    errorMessages.push("Поле 'Ємність акумулятора' не повинно бути від'ємним або нуль!");
  }
  if (data.price <= 0) {
    errorMessages.push("Поле 'Ціна' не повинно бути від'ємним або нуль!");
  }
  if (data.countOfCores <= 0) {
    errorMessages.push("Поле 'Кількість ядер' не повинно бути від'ємним або нуль!");
  }
  if (data.osVersion <= 0) {
    errorMessages.push("Поле 'Версія ОС' не повинно бути від'ємним або нуль!");
  }
  if (data.ram <= 0) {
    errorMessages.push("Поле 'ОЗУ' не повинно бути від'ємним або нуль!");
  }
  if (!isValidUrl(data.mainPictureURL)) {
    errorMessages.push("Не коректна URL головної картинки!");
  }
  if (data.resolution.length < 7) {
    errorMessages.push("Поле 'Роздільна здатність' повинно бути довштим за 7 символів!");
  }
  if (data.brand.length === 0) {
    errorMessages.push("Поле 'Бренд' не обране!");
  }
  if (data.os === undefined) {
    errorMessages.push("Поле 'ОС' не обране!");
  }
  if (data.communicationStandardList.length === 0) {
    errorMessages.push("Поле 'Стандарт зв'язку' не обране!");
  }
  if (data.romList.length === 0) {
    errorMessages.push("Поле 'Ппз' не обране!");
  }

  return errorMessages;
};