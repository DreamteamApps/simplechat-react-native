import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Animated} from 'react-native';
import AudioRecord from '~/Service/audioRecorder';

import {Container, Track, TrackBall} from './styles';
import {DateInfo} from '../../styles';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from 'react-native';

const AudioMessage = ({duration, file} = props) => {
  const [playing, setPlaying] = useState(false);
  const [timeelpsed, setTimeelepse] = useState(false);
  const slideAnim = useRef(new Animated.Value(-0)).current;

  const play = useCallback(() => {
    if (playing) backSlide();
    else playAudio();
    setPlaying((playing) => !playing);
  }, [playing]);

  const playAudio = () => {
    console.log(file);
    AudioRecord.play(file, () => {
      startSlide();
    });
  };

  const startSlide = () => {
    console.log('duration', duration);
    Animated.timing(slideAnim, {
      useNativeDriver: false,
      toValue: 100,
      duration: duration * 1000 + 1000,
    }).start();
  };

  const backSlide = () => {
    Animated.timing(slideAnim, {
      useNativeDriver: false,
      toValue: -1,
      duration: 300,
    }).start();
  };

  useEffect(() => {
    console.log(slideAnim);
  }, [slideAnim]);

  return (
    <TouchableWithoutFeedback onPress={play}>
      <Container>
        <IconIonicons name="md-play" size={30} color="#25B7D3" />
        <Track>
          <TrackBall
            style={{
              left: slideAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['-1%', '99%'],
              }),
            }}
            Animated={Animated.View}></TrackBall>
        </Track>
        <DateInfo>{timeelpsed}</DateInfo>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AudioMessage;
