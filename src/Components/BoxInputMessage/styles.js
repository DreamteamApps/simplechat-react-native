import styled from 'styled-components/native';

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
