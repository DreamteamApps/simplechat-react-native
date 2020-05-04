import React from 'react';
import {View} from 'react-native';
import {Container, MessageButton, InputContainer} from './styles';
import InputText from '../InputText';
import {useChat} from '~/Contexts/ChatContext';
import {useApp} from '~/Contexts/AppContext';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const BoxInputMessage = () => {
  const {message, setMessage} = useChat();
  const {emit} = useApp();
  return (
    <Container>
      <InputContainer>
        <InputText
          onChangeText={(text) => setMessage(text)}
          value={message}
          autoCapitalize="none"
          onSubmitEditing={() => {
            emit('send-message', {
              message: message,
              type: 'text',
            });
            setMessage('');
          }}
          placeholder="Type your message"
        />
      </InputContainer>

      <MessageButton>
        <IconIonicons name="md-send" size={30} color="#fff" />
      </MessageButton>
    </Container>
  );
};

export default BoxInputMessage;
