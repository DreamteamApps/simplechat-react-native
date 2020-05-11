import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Button} from 'react-native';
import {uploadSound} from '~/Service/fileApi';
import {
  Container,
  ContainerComponents,
  CancelContainer,
  CancelText,
  InputContainer,
  Typing,
  InputBox,
  MessageInput,
  InternalButton,
  TimeText,
} from './styles';
import ActionButton from './actionButton';
import InputText from '../InputText';
import {useChat} from '~/Contexts/ChatContext';
import {useApp} from '~/Contexts/AppContext';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {debounce} from 'throttle-debounce';
import {useAuth} from '~/Contexts/AuthContext';
import VoiceRecorder from '~/Service/voiceRecorder';
import {useTheme} from 'styled-components';

const BoxInputMessage = () => {
  const theme = useTheme();
  const {setMessages, typing} = useChat();
  const [message, setMessage] = useState('');
  const {isMe} = useAuth();
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const {emit} = useApp();

  const sendMessage = () => {
    emit('send-message', {
      message: message,
      type: 'text',
    });
    setMessage('');
  };

  const sendAudio = (id) => {
    emit('send-message', {
      fileId: id,
      type: 'audio',
    });
  };

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
    if (isRecordingAudio)
      VoiceRecorder.stop(async (duration, path) => {
        console.log('toogleAudioRecord path', path);
        let message = {
          id: path,
          data: 1234,
          type: 'audio-local',
          file: path,
          duration,
          loading: true,
        };
        setMessages((messages) => [message, ...messages]);
        const response = await uploadSound(path, duration);
        sendAudio(response.id);
        message.loading = false;
        setMessages((messages) => [
          message,
          ...messages.filter((i) => i.id !== message.id),
        ]);

        setRecordingDuration(0);
      });
    else
      await VoiceRecorder.start((duration) => setRecordingDuration(duration));
    setIsRecordingAudio(!isRecordingAudio);
  }, [isRecordingAudio]);

  const cancelAudioRecord = useCallback(async () => {
    VoiceRecorder.cancel(() => setRecordingDuration(0));
    setIsRecordingAudio(false);
  }, []);

  return (
    <Container>
      {typing?.username && !isMe(typing?.id) && (
        <Typing>{typing?.username} is typing...</Typing>
      )}
      <ContainerComponents>
        <InputContainer>
          <InputBox>
            {isRecordingAudio ? (
              <>
                <InternalButton>
                  <IconIonicons
                    name="md-mic"
                    size={25}
                    color={theme.colors.red}
                  />
                </InternalButton>
                <TimeText>
                  {VoiceRecorder.getFormatedDuration(recordingDuration)}
                </TimeText>
                <CancelContainer onPress={cancelAudioRecord}>
                  <CancelText>Cancelar</CancelText>
                </CancelContainer>
              </>
            ) : (
              <>
                <MessageInput
                  // editable={!isRecordingAudio}
                  onChangeText={(text) => onStartTyping(text)}
                  value={message}
                  autoCapitalize="none"
                  onSubmitEditing={() => sendMessage()}
                  placeholder="Type your message"
                />
                <InternalButton onPress={() => console.log('open camera')}>
                  <IconIonicons
                    name="md-camera"
                    size={25}
                    color={theme.colors.primary}
                  />
                </InternalButton>
              </>
            )}
          </InputBox>
        </InputContainer>
        <ActionButton
          message={message}
          isRecordingAudio={isRecordingAudio}
          onSendMessage={sendMessage}
          onToogleAudioRecord={toogleAudioRecord}
        />
      </ContainerComponents>
    </Container>
  );
};

export default BoxInputMessage;
