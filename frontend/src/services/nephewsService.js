import * as http from './httpService';

export const get = uuid => {
  return http.getPrivate('/nephews/' + uuid);
};

export const getAll = () => {
  return http.getPrivate('/nephews');
};

export const remove = id => {
  return http.deletePrivate('/nephews/' + id);
};

export const add = data => {
  return http.postPrivate('/nephews', data);
};

export const edit = data => {
  return http.putPrivate('/nephews/' + data.id, data);
};