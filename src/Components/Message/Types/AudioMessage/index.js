import React from 'react';

import {Container, Text} from './styles';

const AudioMessage = ({children}) => {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
};

export default AudioMessage;
