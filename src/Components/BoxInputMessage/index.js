import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
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

const BoxInputMessage = () => {
  const {message, setMessage, typing} = useChat();
  const {isMe} = useAuth();

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
  return (
    <Container>
      {typing?.username && !isMe(typing?.id) && (
        <Typing>{typing?.username} is typing...</Typing>
      )}
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

        <MessageButton onPress={() => sendMessage()}>
          <IconIonicons name="md-send" size={30} color="#fff" />
        </MessageButton>
      </ContainerComponents>
    </Container>
  );
};

export default BoxInputMessage;
