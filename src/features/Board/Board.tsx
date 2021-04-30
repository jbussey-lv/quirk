import styles from './Board.module.css';

import Tile, { TilePrimitive, TileProps } from '../tile/Tile'
import { addTile, removeTile, Position, selectGrid } from './boardSlice';
import { useDrop } from 'react-dnd';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';

type BoardProps = {
  grid: (TileProps|null)[][];
  addTile: any;
  removeTile: any;
}


type SquareProps = {
  tileProps: TileProps|null;
  position: Position;
}

function Square({ tileProps, position }: SquareProps) {

  const[{isOver}, drop] = useDrop({
    accept: "tile",
    drop: (tile: TilePrimitive, monitor) => {
      addTile({tile, position});
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

export function Board({ grid, addTile, removeTile }: BoardProps) { 

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

function mapStateToProps(state: RootState) {
  return {
    grid: selectGrid(state)
  }
}

const mapDispatchToProps = {
  addTile,
  removeTile
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)