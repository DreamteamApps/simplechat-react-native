import {PERMISSIONS, request} from 'react-native-permissions';
import {Platform} from 'react-native';
import {Recorder, Player} from '@react-native-community/audio-toolkit';

let recorder = null;
let path = null;
let durationInterval = null;
let duration = 0;
let initialized = false;
let player = null;
let playerProgressInterval = null;
let oldStopPlayerCallback = null;

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const getFormatedDuration = (duration) => {
  if (isNaN(duration) || duration < 0) duration = 0;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration) - minutes * 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

function play(path, onStart, onPlaying, onStop) {
  if (player) {
    oldStopPlayerCallback();
    clearInterval(playerProgressInterval);
    onPlaying({progress: 0});
    player.destroy();
  }
  oldStopPlayerCallback = onStop;
  player = new Player(path);
  player.on('ended', () => {
    clearInterval(playerProgressInterval);
    onPlaying({progress: 1});
    onStop();
  });

  player.prepare((err) => {
    player.play((err) => {
      onStart();
      playerProgressInterval = setInterval(() => {
        if (player) {
          let currentProgress =
            Math.max(0, player.currentTime) / player.duration;
          if (isNaN(currentProgress) || currentProgress < 0) {
            currentProgress = 0;
          }
          const currentTime =
            player.currentTime < 0 ? 0 : player.currentTime / 1000;
          onPlaying({
            progress: currentProgress,
            time: currentTime,
          });
        }
      }, 10);
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
  recorder?.destroy();
  recorder = new Recorder(`${uuidv4()}.mp4`, {
    bitrate: 256000,
    channels: 2,
    sampleRate: 44100,
    quality: 'max',
  });
  await recorder.prepare((error, fspath) => {
    path = fspath;
    recorder.record(() => {
      duration = 0;
      durationInterval = setInterval(() => {
        duration++;
        if (durationCallback) durationCallback(duration);
      }, 1000);
    });
  });
}

async function stop(callback) {
  recorder?.stop(async () => {
    await callback(duration, path);
    clearInterval(durationInterval);
    duration = 0;
  });
  console.log('pause');
}

function stopPlayer() {
  oldStopPlayerCallback();
  clearInterval(playerProgressInterval);
  player.destroy();
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
  stopPlayer,
  getFormatedDuration,
};
