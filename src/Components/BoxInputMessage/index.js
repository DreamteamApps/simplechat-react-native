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
import {useAuth} from '~/Contexts/AuthContext';
import AudioRecord from '~/Service/audioRecorder';

const BoxInputMessage = () => {
  const {message, setMessage, typing} = useChat();
  const {isMe} = useAuth();
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const {emit} = useApp();
  const sendMessage = () => {
    emit('send-message', {
      message: message,
      type: 'text',
    });
    setMessage('');
  };

  useEffect(() => {
    AudioRecord.init();
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
    if (isRecordingAudio) AudioRecord.stop();
    else AudioRecord.start();
    setIsRecordingAudio(!isRecordingAudio);
  }, [isRecordingAudio]);

  const actionButton = useCallback(() => {
    if (message?.length > 0) {
      return (
        <MessageButton onPress={() => sendMessage()}>
          <IconIonicons name="md-send" size={30} color="#fff" />
        </MessageButton>
      );
    } else if (isRecordingAudio)
      return (
        <MessageButton color="#FF5252" onPress={() => toogleAudioRecord()}>
          <IconIonicons name="md-mic" size={30} color="#fff" />
        </MessageButton>
      );
    else {
      return (
        <MessageButton onPress={() => toogleAudioRecord()}>
          <IconIonicons name="md-mic" size={30} color="#FFF" />
        </MessageButton>
      );
    }
  }, [message, isRecordingAudio]);

  return (
    <Container>
      {typing?.username && !isMe(typing?.id) && (
        <Typing>{typing?.username} is typing...</Typing>
      )}
      <ContainerComponents>
        <InputContainer>
          <InputText
            editable={!isRecordingAudio}
            onChangeText={(text) => onStartTyping(text)}
            value={message}
            autoCapitalize="none"
            onSubmitEditing={() => sendMessage()}
            placeholder="Type your message"
          />
        </InputContainer>
        {actionButton()}
      </ContainerComponents>
    </Container>
  );
};

export default BoxInputMessage;
