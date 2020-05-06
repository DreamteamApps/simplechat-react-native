import AudioRecord from 'react-native-audio-record';
import {PERMISSIONS, request} from 'react-native-permissions';
import {uploadSound} from './fileApi';
import {Platform} from 'react-native';
const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: 'voiceRecorded.wav', // default 'audio.wav'
};

let durationInterval = null;
let duration = 0;

async function init() {
  console.log('init audio');

  if (Platform.OS === 'android') {
    if (
      (await request(PERMISSIONS.ANDROID.RECORD_AUDIO)) === 'granted' &&
      (await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
        'granted' &&
      (await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)) === 'granted'
    ) {
      AudioRecord.init(options);
    }
  } else {
    if ((await request(PERMISSIONS.IOS.MICROPHONE)) === 'granted') {
      AudioRecord.init(options);
    }
  }
}

function start(durationCallback) {
  duration = 0;
  durationInterval = setInterval(() => {
    duration++;
    console.log(duration);
    if (durationCallback) durationCallback(duration);
  }, 1000);
  AudioRecord.start();
}

async function stop() {
  var path = await AudioRecord.stop();
  clearInterval(durationInterval);
  duration = 0;
  try {
    await uploadSound(path, duration);
  } catch (error) {
    console.log('error', error);
  }
}

export default {
  init,
  stop,
  start,
};