import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {Container} from './styles';

export default function Loading(props) {
  return (
    <Container>
      <ActivityIndicator size="large" color={props?.color ?? '#fff'} />
    </Container>
  );
}
