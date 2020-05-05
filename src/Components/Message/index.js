import React from 'react';
import {View} from 'react-native';
import TextMessage from './Types/TextMessage';
import AudioMessage from './Types/AudioMessage';
import moment from 'moment';
import {Container, SenderInfo, DateInfo, ContainerMessage} from './styles';
import {useAuth} from '~/Contexts/AuthContext';
const Message = ({data}) => {
  const {user} = useAuth();

  return (
    <Container owner={user.userId == data?.user?.id}>
      {user.userId != data?.user?.id && (
        <SenderInfo>{data?.user.username}</SenderInfo>
      )}
      <ContainerMessage>
        {data.type === 'text' && <TextMessage>{data.message}</TextMessage>}
        {data.type === 'audio' && <AudioMessage>{data.message}</AudioMessage>}
      </ContainerMessage>
      <DateInfo>{moment(data?.date).format('HH:mm')}</DateInfo>
    </Container>
  );
};

export default Message;
