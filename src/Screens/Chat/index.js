import React, {useEffect} from 'react';

import {Container} from './styles';
import {Text} from 'react-native';
import {useAuth} from '~/Contexts/AuthContext';
import {useApp} from '~/Contexts/AppContext';

export default function Chat() {
  const {user} = useAuth();
  const {emit, hubConnect} = useApp();

  useEffect(() => {
    emit('username', user.username);
    hubConnect.on('user-joined', (data) => {
      console.log(data);
    });

    return () => {
      hubConnect.off('user-joined');
    };
  }, []);

  return (
    <Container>
      <Text>{user.username}</Text>
    </Container>
  );
}
