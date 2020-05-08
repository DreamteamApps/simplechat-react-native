import React from 'react';
import {MessageButton} from './styles';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const ActionButton = ({
  message,
  isRecordingAudio,
  onSendMessage,
  onToogleAudioRecord,
} = props) => {
  if (message?.length > 0) {
    return (
      <MessageButton onPress={() => onSendMessage()}>
        <IconIonicons name="md-send" size={30} color="#fff" />
      </MessageButton>
    );
  } else if (isRecordingAudio)
    return (
      <MessageButton color="#FF5252" onPress={() => onToogleAudioRecord()}>
        <IconIonicons name="md-mic" size={30} color="#fff" />
      </MessageButton>
    );
  else {
    return (
      <>
        <MessageButton onPress={() => onToogleAudioRecord()}>
          <IconIonicons name="md-mic" size={30} color="#FFF" />
        </MessageButton>
      </>
    );
  }
};

export default ActionButton;
