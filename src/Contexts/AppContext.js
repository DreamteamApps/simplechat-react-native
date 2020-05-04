import React, {createContext, useContext, useState, useEffect} from 'react';
import styles from '~/Utils/styles';
import {connect, hubEmit} from '~/Service/SocketIOClient';

import {ThemeProvider} from 'styled-components';
import AuthProvider from './AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Loading from '~/Components/Loading';

export const AppContext = createContext();

export default function AppProvider({children}) {
  const [hubConnect, setHubConnect] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function connectHub() {
      let hubConnect = await connect();
      console.log('conectar no socket');
      setHubConnect(hubConnect);
    }
    connectHub();
  }, []);

  const emit = (path, body) => {
    hubEmit(hubConnect, path, body);
  };

  return (
    <AppContext.Provider value={{loading, setLoading, emit, hubConnect}}>
      <ThemeProvider theme={styles}>
        <SafeAreaProvider>
          {loading && <Loading />}
          <AuthProvider>{children}</AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
