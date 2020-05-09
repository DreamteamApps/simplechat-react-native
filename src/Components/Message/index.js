import React from 'react';
import {View} from 'react-native';
import TextMessage from './Types/TextMessage';
import AudioMessage from './Types/AudioMessage';
import AudioMessageLocal from './Types/AudioMessageLocal';
import moment from 'moment';
import {Container, SenderInfo, DateInfo, ContainerMessage} from './styles';
import {useAuth} from '~/Contexts/AuthContext';
import ImageMessage from './Types/ImageMessage';
const Message = ({data}) => {
  const {user} = useAuth();

  return (
    <Container owner={user.id == data?.user?.id}>
      {user.id != data?.user?.id && (
        <SenderInfo>{data?.user?.username}</SenderInfo>
      )}
      <ContainerMessage>
        {data.type === 'text' && <TextMessage>{data.message}</TextMessage>}
        {data.type === 'audio-local' && (
          <AudioMessageLocal file={data.file} duration={data.duration} />
        )}
        {data.type === 'audio' && <AudioMessage>{data.message}</AudioMessage>}
        {data.type === 'image' && (
          <ImageMessage
            imageUrl={data?.file?.url}
            thumbUrl={data?.file?.thumbnailUrl}
          />
        )}
      </ContainerMessage>
      <DateInfo>{moment(data?.date).format('HH:mm')}</DateInfo>
    </Container>
  );
};

export default Message;
