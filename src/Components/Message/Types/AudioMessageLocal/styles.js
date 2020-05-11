import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.View`
  width: ${(props) => props.theme.wpx(200)};
  padding: 0 ${(props) => props.theme.hpx(10)} 5px;
  flex-direction: row;
  align-items: center;
`;

export const Track = styled.View`
  width: ${(props) => props.theme.wpx(160)};
  height: ${(props) => props.theme.hpx(1)};
  border: ${(props) => props.theme.colors.audioButton};
  border-radius: ${(props) => props.theme.hpx(1)};
  border-width: ${(props) => props.theme.hpx(1)};
  margin-left: 5%;
  position: relative;
`;

export const TrackBall = styled(Animated.View)`
  position: absolute;
  top: -${(props) => props.theme.hpx(5)};
  width: ${(props) => props.theme.hpx(10)};
  height: ${(props) => props.theme.hpx(10)};
  border: ${(props) => props.theme.colors.audioButton};
  border-radius: ${(props) => props.theme.hpx(10)};
  border-width: ${(props) => props.theme.hpx(5)};
`;

export const TimeelapsedContainer = styled.View`
  width: ${(props) => props.theme.hpx(40)};
  height: ${(props) => props.theme.hpx(10)};
  margin-top: ${(props) => props.theme.hpx(25)};
`;

