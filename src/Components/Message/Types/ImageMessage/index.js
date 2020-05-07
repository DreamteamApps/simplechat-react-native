import React, {useState} from 'react';

import {Container, Image} from './styles';
import {useNavigation} from '@react-navigation/native';
import Lightbox from 'react-native-lightbox';

const ImageMessage = ({imageUrl}) => {
  const navigation = useNavigation();
  const [imageResize, setImageResize] = useState('cover');

  return (
    <Container>
      <Lightbox
        springConfig={{tension: 15, friction: 7}}
        onOpen={() => setImageResize('contain')}
        onClose={() => setImageResize('cover')}
        willClose={() => setImageResize('cover')}>
        <Image resizeMode={imageResize} source={{uri: imageUrl}} />
      </Lightbox>
    </Container>
  );
};

export default ImageMessage;
