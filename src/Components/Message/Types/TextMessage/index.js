import React from 'react';

import {Container, Text} from './styles';

const TextMessage = ({children}) => {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
};

export default TextMessage;
