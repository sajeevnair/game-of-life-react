import React, { useState } from 'react';
import { Cell, GridContainer } from './styles';
import produce from 'immer';
const rowSize = 50;
const colSize = 50;

const Life = () => {
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState(() => {
    const rows: number[][] = [];
    for (let i = 0; i < rowSize; i++) {
      rows.push(Array.from(Array(colSize), () => 0));
    }
    return rows;
  });
  const onClickCell = (row: number, col: number) => {
    const newGrid = produce(grid, (gridCopy: number[][]) => {
      gridCopy[row][col] = grid[row][col] ? 0 : 1;
    });
    setGrid(newGrid);
  };
  const onClickButton = () => {
    setRunning((running) => !running);
  };

  return (
    <>
      <button onClick={onClickButton}>{running ? 'Stop' : 'Start'}</button>
      <GridContainer colSize={colSize}>
        {grid.map((row, i) =>
          row.map((col, j) => <Cell key={`${i}-${j}`} value={col} onClick={() => onClickCell(i, j)} />),
        )}
      </GridContainer>
    </>
  );
};

export default Life;
