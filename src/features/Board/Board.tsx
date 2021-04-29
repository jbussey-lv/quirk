import styles from './Board.module.css';

import Tile, { TileInterface, TileProps } from '../tile/Tile'
import { addPlacement, Position } from "../../slices/gameSlice";
import { useAppDispatch } from '../../app/hooks';
import { useDrop } from 'react-dnd';

type BoardProps = {
  grid: (TileProps|null)[][]
}


type SquareProps = {
  tileProps: TileProps|null;
  position: Position;
}

export function Square({ tileProps: tileProps, position }: SquareProps) {

  const dispatch = useAppDispatch();

  const[{isOver}, drop] = useDrop({
    accept: "tile",
    drop: (tile: TileInterface, monitor) => {
      dispatch(addPlacement({tile, position}));
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  if(tileProps){
    return (
      <td><Tile {...tileProps} /></td>
    )
  } else {
    return (
      <td ref={drop}></td>
    )
  }
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