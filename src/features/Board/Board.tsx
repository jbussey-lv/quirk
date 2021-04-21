import styles from './Board.module.css';

import { TileInterface } from '../tile/Tile'
import { Square } from './Square';

type BoardProps = {
  grid: (TileInterface|null)[][]
}

export function Board({ grid }: BoardProps) { 


  return (
    <div>
      <table className={styles.table}>
        <tbody>
          { grid.map((row, i) => (
            <tr key={i}> 
              {row.map((tile, j) => (
                <Square key={j} tile={tile} position={{row: i, col: j}}/>
              ))}
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  )
}