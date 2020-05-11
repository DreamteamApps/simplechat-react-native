import React from 'react';

import {Container, Text} from './styles';

const AudioMessage = ({children, data} = props) => {
  console.log('data message', data);
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
};

export default AudioMessage;
