import React from 'react';

import {Container, Text} from './styles';

export default function UserActivityMessage({data: {user, action}}) {
  return (
    <Container>
      <Text>
        {user?.username} {action}
      </Text>
    </Container>
  );
}
