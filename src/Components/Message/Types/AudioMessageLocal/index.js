import React from 'react';
import {Animated} from 'react-native';

import {Container, Track, TrackBall} from './styles';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const AudioMessage = ({children}) => {
  return (
    <Container>
      <IconIonicons name="md-play" size={30} color="#25B7D3" />
      <Track>
        <TrackBall Animated={Animated.View}></TrackBall>
      </Track>
    </Container>
  );
};

export default AudioMessage;
