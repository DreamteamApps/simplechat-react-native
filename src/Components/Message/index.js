import React from 'react';
import {View} from 'react-native';
import TextMessage from './Types/TextMessage';
import AudioMessage from './Types/AudioMessage';

// import { Container } from './styles';

const Message = ({data}) => {
  return (
    <>
      {data.type === 'text' && <TextMessage>{data.message}</TextMessage>}
      {data.type === 'audio' && <AudioMessage>{data.message}</AudioMessage>}
    </>
  );
};

export default Message;
