import React, {useEffect, useState, useCallback, memo} from 'react';

import {Container} from './styles';
import {Text, Button, FlatList, View, Dimensions} from 'react-native';
import {useAuth} from '~/Contexts/AuthContext';
import {useApp} from '~/Contexts/AppContext';
import Message from '~/Components/Message';
import Snackbar from 'react-native-snackbar';
import InputText from '~/Components/InputText';
import BoxInputMessage from '~/Components/BoxInputMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function Chat() {
  const {user} = useAuth();
  const {emit, hubConnect} = useApp();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    emit('join-room', {username: user.username});
    hubConnect.on('user-joined', (data) => {
      console.log('user-joined', JSON.stringify(data, null, 2));
      setMessages(data.lastMessages);
      Snackbar.show({
        text: `${data.username} joined`,
        duration: Snackbar.LENGTH_SHORT,
      });
    });

    hubConnect.on('user-leaved', (data) => {
      // Snackbar.show({
      //   text: `${data.username} has leaved`,
      //   duration: Snackbar.LENGTH_SHORT,
      // });
    });

    hubConnect.on('user-send-message', (message) => {
      setMessages((messages) => [message, ...messages]);
    });

    return () => {
      hubConnect.off('user-joined');
      hubConnect.off('user-send-message');
      hubConnect.off('user-leaved');
    };
  }, []);

  return (
    <Container>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}
        viewIsInsideTabBar={true}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
        extraScrollHeight={80}
        enableOnAndroid={false}>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={messages}
            inverted
            onEndReachedThreshold={0.1}
            //onEndReached={this.handleLoadMore}
            renderItem={({item}) => <Message key={item.id} data={item} />}
            contentContainerStyle={{paddingBottom: 3}}
            // ref={(ref) => {
            //   this.flatListReference = ref;
            // }}
          />
        </View>
        <BoxInputMessage />
      </KeyboardAwareScrollView>
    </Container>
  );
}

export default Chat;
