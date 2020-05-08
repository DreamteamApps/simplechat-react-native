import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Button} from 'react-native';
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
import AudioRecord from '~/Service/audioRecorder';
import {useTheme} from 'styled-components';
import {duration} from 'moment';

const BoxInputMessage = () => {
  const theme = useTheme();
  const {message, setMessage, typing} = useChat();
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
      AudioRecord.stop((duration) => setRecordingDuration(duration));
    else await AudioRecord.start((duration) => setRecordingDuration(duration));
    setIsRecordingAudio(!isRecordingAudio);
  }, [isRecordingAudio]);

  const cancelAudioRecord = useCallback(async () => {
    AudioRecord.cancel((duration) => setRecordingDuration(duration));
    setIsRecordingAudio(false);
  }, []);

  const getFormatedDuration = useCallback((recordingDuration) => {
    const minutes = Math.floor(recordingDuration / 60);
    const seconds = recordingDuration - minutes * 60;
    return `${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
                <TimeText>{getFormatedDuration(recordingDuration)}</TimeText>
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
