import axios from 'axios';
import {SERVER_URL} from '~/Utils/constants';

export async function uploadSound(filePath, duration) {
  const data = new FormData();
  const audio = {
    uri: 'file://' + 'storage/emulated/0/WhatsappClone/123.jpg',
    type: 'image/jpeg',
    name: '123.jpg',
  };
  data.append('file', audio);
  data.append('duration_seconds', duration);
  data.append('type', 'audio');

  try {
    await axios.post(`${SERVER_URL}file/upload`, data);
  } catch (error) {
    console.log(Object.keys(error));
    console.log(error.message);
  }
}
