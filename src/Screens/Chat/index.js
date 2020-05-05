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
import UserActivityMessage from '~/Components/UserActivityMessage';
import {useChat} from '~/Contexts/ChatContext';

function Chat() {
  const {user} = useAuth();
  const {emit, hubConnect} = useApp();
  const {startTyping} = useChat();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const isMe = (userId) => {
    return userId == user.id;
  };
  useEffect(() => {
    emit('join-room', {userId: user.id});
    hubConnect.on('user-joined', (data) => {
      console.log('user-joined', JSON.stringify(data, null, 2));
      if (isMe(data.user.id)) {
        setMessages(data.lastMessages);
      } else {
        setMessages((messages) => [
          {
            type: 'userActivity',
            user: data.user,
            action: 'joined',
          },
          ...messages,
        ]);
      }
    });

    hubConnect.on('user-leaved', (data) => {
      setMessages((messages) => [
        {
          type: 'userActivity',
          user: data.user,
          action: 'left',
        },
        ...messages,
      ]);
    });

    hubConnect.on('user-send-message', (message) => {
      console.log('mensagem', message);
      setMessages((messages) => [message, ...messages]);
    });

    hubConnect.on('user-writing-message', (data) => {
      console.log('user-writing-message', data);
      startTyping(data);
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
            showsVerticalScrollIndicator={false}
            data={messages}
            inverted
            onEndReachedThreshold={0.1}
            //onEndReached={this.handleLoadMore}
            renderItem={({item}) => {
              if (item.type == 'userActivity') {
                return <UserActivityMessage key={item.id} data={item} />;
              }
              return <Message key={item.id} data={item} />;
            }}
            contentContainerStyle={{paddingBottom: 3}}
          />
        </View>
        <BoxInputMessage />
      </KeyboardAwareScrollView>
    </Container>
  );
}

export default Chat;
