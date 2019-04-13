import * as http from './httpService';

export const get = uuid => {
  return http.getPrivate('/nephews/' + uuid);
};

export const getAll = () => {
  return http.getPrivate('/nephews');
};

export const remove = uuid => {
  return http.deletePrivate('/albums/' + uuid);
};

export const add = data => {
  return http.postPrivate('/albums', data);
};

export const edit = data => {
  return http.putPrivate('/albums/' + data.uuid, data);
};