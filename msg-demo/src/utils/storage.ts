export const get = <K>(key: string, defaultValue: K): K => {
  try {
    return (JSON.parse(localStorage.getItem(key))?? defaultValue) as K;
  } catch (e) {
    return defaultValue;
  }
};

export const set = <K>(key: string, data: K) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    return;
  }
};
