import React, { useState, useCallback, useRef } from 'react';
import { Cell, GridContainer } from './styles';
import produce from 'immer';
const rowSize = 50;
const colSize = 50;

const Life = () => {
  const [running, setRunning] = useState(false);
  const operations = [
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const initGrid = () => {
    const rows: number[][] = [];
    for (let i = 0; i < rowSize; i++) {
      rows.push(Array.from(Array(colSize), () => 0));
    }
    return rows;
  };
  const randomizeGrid = () => {
    const rows: number[][] = [];
    for (let i = 0; i < rowSize; i++) {
      rows.push(Array.from(Array(colSize), () => (Math.random() > 0.7 ? 1 : 0)));
    }
    return setGrid(rows);
  };
  const [grid, setGrid] = useState(initGrid);
  const onClickCell = (row: number, col: number) => {
    const newGrid = produce(grid, (gridCopy: number[][]) => {
      gridCopy[row][col] = grid[row][col] ? 0 : 1;
    });
    setGrid(newGrid);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gcopy: number[][]) => {
        for (let i = 0; i < rowSize; i++) {
          for (let j = 0; j < colSize; j++) {
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < rowSize && newJ >= 0 && newJ < colSize) {
                neighbours += g[newI][newJ];
              }
            });
            if (neighbours > 3 || neighbours < 2) {
              gcopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbours === 3) {
              gcopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);
  const runningRef = useRef(running);
  runningRef.current = running;

  const onClickButton = () => {
    setRunning((running) => !running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  return (
    <>
      <button onClick={onClickButton}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={() => setGrid(initGrid)}>Reset</button>
      <button onClick={randomizeGrid}>Randomize</button>
      <GridContainer colSize={colSize}>
        {grid.map((row, i) =>
          row.map((col, j) => <Cell key={`${i}-${j}`} value={col} onClick={() => onClickCell(i, j)} />),
        )}
      </GridContainer>
    </>
  );
};

export default Life;
