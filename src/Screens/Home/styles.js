import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  justify-content: space-between;
`;

export const ContentContainer = styled.View`
  padding-horizontal: ${(props) => props.theme.hpx(20)};
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.hpx(100)};
`;
export const ButtonsContainer = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.hpx(5)} ${(props) => props.theme.hpx(20)};
`;
export const LottieItem = styled(LottieView)`
  height: ${(props) => props.theme.hpx(200)};
`;
