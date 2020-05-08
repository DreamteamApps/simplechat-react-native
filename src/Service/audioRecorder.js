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
let initialized = false;

async function init() {
  console.log('init audio');
  clearInterval(durationInterval);

  if (Platform.OS === 'android') {
    if (
      (await request(PERMISSIONS.ANDROID.RECORD_AUDIO)) === 'granted' &&
      (await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
        'granted' &&
      (await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)) === 'granted'
    ) {
      AudioRecord.init(options);
      initialized = true;
    }
  } else {
    if ((await request(PERMISSIONS.IOS.MICROPHONE)) === 'granted') {
      AudioRecord.init(options);
      initialized = true;
    }
  }
}

async function start(durationCallback) {
  if (!initialized) await init();
  duration = 0;
  durationInterval = setInterval(() => {
    duration++;
    console.log(duration);
    if (durationCallback) durationCallback(duration);
  }, 1000);
  AudioRecord.start();
}

async function stop(callback) {
  var path = await AudioRecord.stop();
  clearInterval(durationInterval);
  duration = 0;
  callback(duration);
  try {
    await uploadSound(path, duration);
  } catch (error) {
    console.log('error', error);
  }
}

async function cancel(callback) {
  await AudioRecord.stop();
  clearInterval(durationInterval);
  duration = 0;
  callback(duration);
  
}

export default {
  stop,
  start,
  cancel,
};
