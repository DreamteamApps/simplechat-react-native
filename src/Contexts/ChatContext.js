import React, {createContext, useState, useContext, useEffect} from 'react';
export const ChatContext = createContext();

const ChatProvider = ({children}) => {
  const [message, setMessage] = useState('');

  return (
    <ChatContext.Provider value={{message, setMessage}}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;

export function useChat() {
  const context = useContext(ChatContext);
  return context;
}
