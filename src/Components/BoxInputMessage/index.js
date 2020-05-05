import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Button} from 'react-native';
import {
  Container,
  ContainerComponents,
  MessageButton,
  InputContainer,
  Typing,
} from './styles';
import InputText from '../InputText';
import {useChat} from '~/Contexts/ChatContext';
import {useApp} from '~/Contexts/AppContext';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {debounce} from 'throttle-debounce';
import AudioRecord from 'react-native-audio-record';
import {PERMISSIONS, request} from 'react-native-permissions';
import RNFS from 'react-native-fs';

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: 'voiceRecorded.wav', // default 'audio.wav'
};

const BoxInputMessage = () => {
  const {message, setMessage, typing} = useChat();
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const {emit} = useApp();
  const sendMessage = () => {
    emit('send-message', {
      message: message,
      type: 'text',
    });
    setMessage('');
  };

  async function requestAudio() {
    if (
      (await request(PERMISSIONS.ANDROID.RECORD_AUDIO)) === 'granted' &&
      (await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)) ===
        'granted' &&
      (await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) === 'granted'
    ) {
      AudioRecord.init(options);
    }
  }

  useEffect(() => {
    requestAudio();
  }, []);

  const delayedTyping = useRef(
    debounce(500, () => {
      emit('writing-message');
    }),
  ).current;
  const onStartTyping = (text) => {
    setMessage(text);
    delayedTyping(text);
  };

  const toogleAudioRecord = useCallback(async () => {
    if (isRecordingAudio) getAudio();
    else AudioRecord.start();
    setIsRecordingAudio(!isRecordingAudio);
  }, [isRecordingAudio]);

  const getAudio = async () => {
    var path = await AudioRecord.stop();
    console.log('audio path', path);
    try {
      await RNFS.copyFile(path, RNFS.DocumentDirectoryPath);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container>
      {typing?.username && <Typing>{typing?.username} is typing...</Typing>}
      <ContainerComponents>
        <InputContainer>
          <InputText
            onChangeText={(text) => onStartTyping(text)}
            value={message}
            autoCapitalize="none"
            onSubmitEditing={() => sendMessage()}
            placeholder="Type your message"
          />
        </InputContainer>

        <Button
          onPress={toogleAudioRecord}
          title={isRecordingAudio ? 'Gravar' : 'Gravando'}></Button>

        <MessageButton onPress={() => sendMessage()}>
          <IconIonicons name="md-send" size={30} color="#fff" />
        </MessageButton>
      </ContainerComponents>
    </Container>
  );
};

export default BoxInputMessage;
