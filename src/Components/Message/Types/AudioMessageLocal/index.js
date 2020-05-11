import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Animated, ActivityIndicator} from 'react-native';
import VoiceRecorder from '~/Service/voiceRecorder';
import Loading from '~/Components/Loading';
import {Container, Track, TrackBall, TimeelapsedContainer} from './styles';
import {DateInfo} from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'styled-components';

const AudioMessage = ({duration, file, loading, data} = props) => {
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);
  const [timeelapsed, setTimeelapsed] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  console.log(data)
  const play = useCallback(() => {
    if (playing) {
      VoiceRecorder.stopPlayer();
    } else playAudio();
  }, [playing]);

  const onStartPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const onPlaying = useCallback(
    (data) => {
      slideAnim.setValue(data.progress * 100);
      setTimeelapsed(data.time);
    },
    [slideAnim],
  );

  const onStopPlaying = useCallback((callback) => {
    Animated.timing(slideAnim, {
      useNativeDriver: false,
      toValue: 0,
      duration: 300,
    }).start(() => {
      if (callback) callback();
      setPlaying(false);
    });
  }, []);

  const playAudio = useCallback(() => {
    VoiceRecorder.play(file, onStartPlay, onPlaying, onStopPlaying);
  }, [file, onStartPlay, onPlaying, onStopPlaying]);

  return (
    <TouchableWithoutFeedback onPress={play}>
      <Container>
        {loading && <Loading color={theme.colors.primary} />}
        <Ionicons
          name={playing ? 'md-square' : 'md-play'}
          size={30}
          color="#25B7D3"
        />
        <Track>
          <TrackBall
            style={{
              left: slideAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['-1%', '99%'],
              }),
            }}
            Animated={Animated.View}></TrackBall>
          <TimeelapsedContainer>
            <DateInfo>
              {playing
                ? VoiceRecorder.getFormatedDuration(timeelapsed)
                : VoiceRecorder.getFormatedDuration(duration)}
            </DateInfo>
          </TimeelapsedContainer>
        </Track>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AudioMessage;
