import React, { useState } from 'react';
import { Cell, GridContainer } from './styles';
const rowSize = 50;
const colSize = 50;

const Life = () => {
  const [grid, setgrid] = useState(() => {
    const rows: number[][] = [];
    for (let i = 0; i < rowSize; i++) {
      rows.push(Array.from(Array(colSize), () => 0));
    }
    return rows;
  });
  console.log(grid);
  return (
    <GridContainer colSize={colSize}>
      {grid.map((row, i) => row.map((col, j) => <Cell key={`${i}-${j}`} value={col} />))}
    </GridContainer>
  );
};

export default Life;
