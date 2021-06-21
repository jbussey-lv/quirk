import styles from './Board.module.css';

import Tile, { TilePrimitive, TileProps } from '../tile/Tile'
import { addTile, removeTile, Position, selectGrid } from './boardSlice';
import { useDrop } from 'react-dnd';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import Square from './Square';

type BoardProps = {
  grid: (TileProps|null)[][];
  addTile: any;
  removeTile: any;
}

export function Board({ grid, addTile, removeTile }: BoardProps) { 

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          { grid.map((tiles, row) => (
            <tr key={row}> 
              {tiles.map((tileProps, col) => (
                <Square key={col} tileProps={tileProps} position={{row, col}} addTile={addTile} removeTile={removeTile} />
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