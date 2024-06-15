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