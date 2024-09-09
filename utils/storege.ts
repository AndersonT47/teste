export const saveValue = (key: any, value: string) => {
  localStorage.setItem(key, value);
};

export const saveObject = (key: any, object: any) => {
  const jsonValue = JSON.stringify(object);
  saveValue(key, jsonValue);
};

export const saveCountry = (key: any, value: any) => {
  window.localStorage.setItem(key, value);
};

export const getCountry = (key: any, value: any) => {
  window.localStorage.setItem(key, value);
};

export const getValue = (key: any) => window.localStorage.getItem(key);

export const getObject = (key: string) => {
  const jsonValue = getValue(key);
  if (!jsonValue) {
    return null;
  }

  return jsonValue;
};

export const clear = async (key: any) => {
  window.localStorage.removeItem(key);
};
