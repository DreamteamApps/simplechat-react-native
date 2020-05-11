import {Platform} from 'react-native';
import {SERVER_URL} from '~/Utils/constants';

export function uploadSound(filePath, duration) {
  return new Promise((resolve, reject) => {
    try {
      const data = new FormData();
      const audio = {
        uri: Platform.OS === 'android' ? `file://${filePath}` : filePath,
        type: 'audio/mp4',
        name: 'voice.mp4',
      };
      data.append('file', audio);
      data.append('duration', duration);
      console.log('duration_seconds',duration)
      data.append('type', 'audio');
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${SERVER_URL}file/upload`);
      xhr.send(data);
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;   
        }
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.log('error', xhr.responseText);
          reject();
        }
      };
    } catch (error) {
      //not working in react native 0.62 version :(
      // var response = await axios.post(`${SERVER_URL}file/upload`, data);
      console.log(error.message);
      reject();
    }
  });
}
