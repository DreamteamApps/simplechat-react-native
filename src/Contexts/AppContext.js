import React, {createContext, useContext, useState} from 'react';
import styles from '~/Utils/styles';
import {ThemeProvider} from 'styled-components';
// import AuthProvider from './AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Loading from '~/Components/Loading';

export const AppContext = createContext();

export default function AppProvider({children}) {
  const [loading, setLoading] = useState(false);
  return (
    <AppContext.Provider value={{loading, setLoading}}>
      <ThemeProvider theme={styles}>
        <SafeAreaProvider>
          {loading && <Loading />}
          {children}
        </SafeAreaProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
