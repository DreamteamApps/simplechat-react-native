import React from 'react';
import io from 'socket.io-client';
import {SERVER_URL} from '~/Utils/constants';

export const connect = () => {
  try {
    const con = io.connect(SERVER_URL, {forceNode: true});
    return con;
  } catch (error) {
    console.log('SOCKETCON', error);
  }
};

export const hubEmit = (con, path, body) => {
  try {
    con.emit(path, body);
  } catch (error) {
    console.log('socketError', error);
  }
};
