import React, {createContext, useState, useContext, useEffect} from 'react';
import {getUser} from '~/Storage/UserStorage';
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({userId: 1, username: 'default'});

  // useEffect(() => {
  //   getLocalUserData();
  // }, []);

  // const getLocalUserData = async () => {
  //   const user = await getUser();
  //   if (user) {
  //     setUser(user);
  //   }
  // };
  const isMe = (userId) => {
    return userId == user.id;
  };

  return (
    <AuthContext.Provider value={{user, setUser, isMe}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
