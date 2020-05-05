import axios from 'axios';
import {SERVER_URL} from '~/Utils/constants';

export function getData(username) {
  return axios.post(`${SERVER_URL}user/create`, {
    username: username,
  });
}
