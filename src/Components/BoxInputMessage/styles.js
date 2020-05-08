import styled from 'styled-components/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const ContainerComponents = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: nowrap;
`;
export const InputContainer = styled.View`
  flex: 1;
  margin-right: ${(props) => props.theme.wpx(15)};
`;
export const Typing = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.fonts.xxxsmall};
`;
export const MessageButton = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: 0.7,
}))`
  width: ${(props) => props.theme.hpx(50)};
  height: ${(props) => props.theme.hpx(50)};
  border-radius: ${(props) => props.theme.hpx(25)};
  background: ${(props) => props.color ?? props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const InputBox = styled.View`
  height: ${(props) => props.theme.hpx(50)};
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 20px;
  margin-vertical: ${(props) => props.theme.wpx(20)};
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-shrink: 1;
  flex-basis: auto;
  flex-grow: 0;
`;

export const MessageInput = styled.TextInput`
  color: ${(props) => props.theme.colors.default};
  font-size: ${(props) => props.theme.fonts.medium};
  padding: ${(props) => props.theme.hpx(10)};
  text-align: left;
  flex-shrink: 1;
  flex: 1;
`;

export const InternalButton = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: 0.7,
}))`
  height: ${(props) => props.theme.hpx(40)};
  border-radius: ${(props) => props.theme.hpx(25)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: ${(props) => props.theme.hpx(10)};
  margin-left: ${(props) => props.theme.hpx(10)};
`;

export const TimeText = styled.Text`
  color: ${(props) => props.theme.colors.default};
  font-size: ${(props) => props.theme.fonts.medium};
  text-align: left;
  flex-shrink: 1;
  align-items: center;
  flex: 1;
`;

export const CancelContainer = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: 0.7,
}))`
  flex-shrink: 1;
  margin-right: ${(props) => props.theme.wpx(15)};
`;

export const CancelText = styled.Text`
  color: ${(props) => props.theme.colors.default};
  font-size: ${(props) => props.theme.fonts.medium};
  text-align: right;
`;
