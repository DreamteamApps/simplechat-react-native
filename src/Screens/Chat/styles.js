import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  padding-horizontal: ${(props) => props.theme.hpx(20)};
`;
