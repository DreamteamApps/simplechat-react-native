import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';

const ImageItem = createImageProgress(FastImage);

export const Container = styled.View``;
export const Text = styled.Text``;
export const Image = styled(ImageItem)`
  width: ${(props) => props.theme.wpx(200)};
  height: ${(props) => props.theme.hpx(200)};
  resize-mode: cover;
`;
