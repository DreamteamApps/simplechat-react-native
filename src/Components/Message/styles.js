import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 5px 10px;
  border-radius: 10px;
  margin: 10px;
  max-width: 80%;

  align-self: ${(props) => (props.owner ? 'flex-end' : 'flex-start')};
  background: ${(props) =>
    props.owner
      ? props.theme.colors.bgOwnerMessage
      : props.theme.colors.bgSenderMessage};
`;
export const ContainerMessage = styled.View`
  padding-vertical: 5px;
`;
export const SenderInfo = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.fonts.xxxsmall};
  align-self: flex-end;
`;
export const DateInfo = styled.Text`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.fonts.xxxsmall};
  align-self: flex-end;
  font-weight: bold;
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-shadow: 0px 0px 1px #fff;
`;
