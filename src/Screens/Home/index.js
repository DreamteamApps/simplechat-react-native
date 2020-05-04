import React, {useState, useEffect} from 'react';
import {
  Container,
  ButtonsContainer,
  ContentContainer,
  LottieItem,
} from './styles';

import CustomButton from '../../Components/CustomButton';
import InputText from '~/Components/InputText';
import Snackbar from 'react-native-snackbar';
import {saveUser} from '~/Storage/UserStorage';
import {useApp} from '~/Contexts/AppContext';
import {useAuth} from '~/Contexts/AuthContext';
export default function Home({navigation}) {
  const [username, setUsername] = useState('');
  const {setLoading} = useApp();
  const {setUser} = useAuth();

  const getUserData = async (username) => {
    setLoading(true);
    if (username) {
      try {
        //let pushToken = await getPushToken();
        //const dataReturn = await getData(username, pushToken);
        await saveUser({username: username});
        setUser({username: username});
        navigation.navigate('Chat');
      } catch (error) {
        console.log(error);
      }
    } else {
      Snackbar.show({
        text: 'Type your name',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    setLoading(false);
  };

  return (
    <Container>
      <ContentContainer>
        <LottieItem
          source={require('../../Assets/Animations/chat.json')}
          autoPlay
          loop
        />
        <InputText
          placeholder="type your name"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
          onSubmitEditing={() => getUserData(username)}
          autoFocus={true}
        />
      </ContentContainer>
      <ButtonsContainer>
        <CustomButton onPress={() => getUserData(username)}>Enter</CustomButton>
      </ButtonsContainer>
    </Container>
  );
}
