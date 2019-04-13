let name = 'token';

export const get = () => localStorage.getItem(name);
export const set = value => {
  console.log('set token', value);
  localStorage.setItem(name, value);
};
export const remove = () => localStorage.removeItem(name);

export const exists = () => get();
