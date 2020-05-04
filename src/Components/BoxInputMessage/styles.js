import styled from 'styled-components/native';

export const Container = styled.View`
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
export const MessageButton = styled.TouchableOpacity`
  width: ${(props) => props.theme.hpx(50)};
  height: ${(props) => props.theme.hpx(50)};
  border-radius: ${(props) => props.theme.hpx(25)};
  background: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;
