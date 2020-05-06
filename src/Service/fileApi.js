import axios from 'axios';
import {SERVER_URL} from '~/Utils/constants';

export async function uploadSound(filePath, duration) {
  const data = new FormData();
  const audio = {
    uri: filePath,
    type: 'audio/wav',
    name: 'teste2.wav',
  };
  data.append('file', audio);
  data.append('duration_seconds', duration);
  data.append('type', 'audio');
  console.log('filePath', filePath);
  try {
    var response = await axios.post(`${SERVER_URL}file/upload`, data);
    console.log(response);
  } catch (error) {
    console.log(Object.keys(error));
    console.log(error.message);
  }
}
