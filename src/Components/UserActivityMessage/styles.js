import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const Text = styled.Text`
  color: ${(props) => props.theme.colors.default};
  font-size: ${(props) => props.theme.fonts.xxxsmall};
  padding: ${(props) => props.theme.hpx(10)};
  width: 100%;
  text-align: center;
`;
