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
let player = new Player();

function play(path, onStart) {
  if (player) player.destroy();
  console.log('play path', path);
  player = new Player(path);
  player.prepare((err) => {
    player.play(() => {
      onStart();
    });
  });
}

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
    console.log("callbackdurationstop", duration)
    await callback(duration, path);
    await uploadSound(path, duration);
    clearInterval(durationInterval);
    duration = 0;
  });
}

async function cancel(callback) {
  recorder.stop(() => {
    clearInterval(durationInterval);
    duration = 0;
    callback();
  });
}

export default {
  stop,
  start,
  cancel,
  play,
};
