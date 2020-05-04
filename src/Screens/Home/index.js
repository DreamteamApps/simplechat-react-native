import React from 'react';

import {
  Container,
  ButtonsContainer,
  ContentContainer,
  LottieItem,
} from './styles';
import {Text} from 'react-native';

import CustomButton from '../../Components/CustomButton';
import InputText from '~/Components/InputText';

export default function Home() {
  return (
    <Container>
      <ContentContainer>
        <LottieItem
          source={require('../../Assets/Animations/chat.json')}
          autoPlay
          loop
        />
        <InputText placeholder="type your name" />
      </ContentContainer>
      <ButtonsContainer>
        <CustomButton>Enter</CustomButton>
      </ButtonsContainer>
    </Container>
  );
}
