import React from 'react';

import {Container, Image} from './styles';

const ImageMessage = ({children, imageUrl}) => {
  return (
    <Container>
      <Image source={{uri: imageUrl}} />
    </Container>
  );
};

export default ImageMessage;
