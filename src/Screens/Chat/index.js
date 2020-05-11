import React, {useEffect, useState, useCallback, memo} from 'react';

import {Container} from './styles';
import {FlatList, View, Platform} from 'react-native';
import {useAuth} from '~/Contexts/AuthContext';
import {useApp} from '~/Contexts/AppContext';
import Message from '~/Components/Message';
import BoxInputMessage from '~/Components/BoxInputMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserActivityMessage from '~/Components/UserActivityMessage';
import {useChat} from '~/Contexts/ChatContext';

function Chat() {
  const {user, isMe} = useAuth();
  const {emit, hubConnect} = useApp();
  const {startTyping} = useChat();
  const {messages, setMessages} = useChat();

  const setUserActivity = (userData, action) => {
    setMessages((messages) => [
      {
        type: 'userActivity',
        user: userData,
        action: action,
      },
      ...messages,
    ]);
  };

  useEffect(() => {
    emit('join-room', {userId: user.id});

    hubConnect.on('user-joined', (data) => {
      if (isMe(data.user.id)) {
        setMessages(data.lastMessages);
      } else {
        setUserActivity(data.user, 'joined');
      }
    });

    hubConnect.on('user-leaved', (data) => {
      setUserActivity(data.user, 'left');
    });

    hubConnect.on('user-send-message', (message) => {
      setMessages((messages) => [message, ...messages]);
    });

    hubConnect.on('user-writing-message', (data) => {
      startTyping(data.user);
    });

    return () => {
      emit('leave-room');

      hubConnect.off('user-joined');
      hubConnect.off('user-send-message');
      hubConnect.off('user-leaved');
      hubConnect.off('user-send-message');
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
            showsHorizontalScrollIndicator={false}
            data={messages}
            inverted
            onEndReachedThreshold={0.1}
            //onEndReached={this.handleLoadMore}
            renderItem={({item}) => {
              if (item.type === 'userActivity') {
                return (
                  <UserActivityMessage
                    key={Math.random().toString()}
                    data={item}
                  />
                );
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
