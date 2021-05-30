import styles from './Board.module.css';

import { TileProps } from '../tile/Tile'
import { Square } from './Square';

type BoardProps = {
  grid: (TileProps|null)[][]
}

export function Board({ grid }: BoardProps) { 


  return (
    <div>
      <table className={styles.table}>
        <tbody>
          { grid.map((tiles, row) => (
            <tr key={row}> 
              {tiles.map((tileProps, col) => (
                <Square key={col} tileProps={tileProps} position={{row, col}}/>
              ))}
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  )
}