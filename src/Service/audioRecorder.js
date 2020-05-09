import {PERMISSIONS, request} from 'react-native-permissions';
import {uploadSound} from './fileApi';
import {Platform} from 'react-native';
import {Recorder, Player} from '@react-native-community/audio-toolkit';

let recorder = new Recorder('voice.mp4', {
  bitrate: 256000,
  channels: 2,
  sampleRate: 44100,
  quality: 'max',
});

let path = null;
let durationInterval = null;
let duration = 0;
let initialized = false;

async function init() {
  clearInterval(durationInterval);

  if (Platform.OS === 'android') {
    if (
      (await request(PERMISSIONS.ANDROID.RECORD_AUDIO)) === 'granted' &&
      (await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
        'granted' &&
      (await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)) === 'granted'
    ) {
      initialized = true;
    }
  } else {
    if ((await request(PERMISSIONS.IOS.MICROPHONE)) === 'granted') {
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
  await recorder.prepare((error, fspath) => {
    path = fspath;
    recorder.record();
  });
}

async function stop(callback) {
  recorder.stop(async () => {
    // teste de som
    let plauer = new Player(path);
    plauer.prepare(() => {
      plauer.play();
    });
    //
    clearInterval(durationInterval);
    duration = 0;
    await callback(duration, path);
    await uploadSound(path, duration);
  });
}

async function cancel(callback) {
  recorder.stop(() => {
    clearInterval(durationInterval);
    duration = 0;
    callback(duration);
  });
}

export default {
  stop,
  start,
  cancel,
};
