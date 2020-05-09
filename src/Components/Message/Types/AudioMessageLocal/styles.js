import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${(props) => props.theme.wpx(220)};
  padding: 0 ${(props) => props.theme.hpx(10)} 5px;
  flex-direction: row;
  align-items: center;
`;

export const Track = styled.View`
  width: 70%;
  height: ${(props) => props.theme.hpx(1)};
  border: ${(props) => props.theme.colors.audioButton};
  border-radius: ${(props) => props.theme.hpx(1)};
  border-width: ${(props) => props.theme.hpx(1)};
  margin-left: 5%;
  position: relative;
`;

export const TrackBall = styled.View`
  position: absolute;
  top: -${(props) => props.theme.hpx(5)};
  left:-1%;
  width: ${(props) => props.theme.hpx(10)};
  height: ${(props) => props.theme.hpx(10)};
  border: ${(props) => props.theme.colors.audioButton};
  border-radius: ${(props) => props.theme.hpx(10)};
  border-width: ${(props) => props.theme.hpx(5)};
`;

export const Text = styled.Text``;
