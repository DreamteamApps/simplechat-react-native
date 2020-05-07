import {Platform} from 'react-native';
import {SERVER_URL} from '~/Utils/constants';

export async function uploadSound(filePath, duration) {
  const data = new FormData();
  const audio = {
    uri: Platform.OS === 'android' ? `file://${filePath}` : filePath,
    type: 'audio/wav',
    name: 'teste2.wav',
  };
  data.append('file', audio);
  data.append('duration_seconds', duration);
  data.append('type', 'audio');
  console.log('filePath', filePath);
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${SERVER_URL}file/upload`);
    xhr.send(data);
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        console.log('success', xhr.responseText);
      } else {
        console.log('error', xhr.responseText);
      }
    };

    //not working in react native 0.62 version :(
    // var response = await axios.post(`${SERVER_URL}file/upload`, data);
  } catch (error) {
    console.log(Object.keys(error));
    console.log(error.message);
  }
}
