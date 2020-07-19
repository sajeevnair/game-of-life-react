import styled from 'styled-components';

export const Cell = styled.div<{ value: number }>`
  height: 20px;
  width: 20px;
  background-color: ${({ value }) => (value ? 'green' : 'lightgrey')};
  border: 1px solid;
`;

export const GridContainer = styled.div<{ colSize: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.colSize}, 20px);
`;
