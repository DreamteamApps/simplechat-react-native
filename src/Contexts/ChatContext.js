import React, {createContext, useState, useContext, useRef} from 'react';
export const ChatContext = createContext();

const ChatProvider = ({children}) => {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState({});
  var typingTimer;

  const startTyping = (user) => {
    typingTimer && clearTimeout(typingTimer);
    setTyping(user);
    typingTimer = setTimeout(() => {
      setTyping({});
    }, 1000);
  };

  return (
    <ChatContext.Provider
      value={{message, setMessage, typing, setTyping, startTyping}}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;

export function useChat() {
  const context = useContext(ChatContext);
  return context;
}
