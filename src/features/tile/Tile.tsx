import styles from './Tile.module.css';

import { useDrag } from 'react-dnd'

const repeats = 3;

export enum Shape {
  Cross = "✚",
  Square = "▪",
  Circle = "●",
  Burst = "✸",
  Clover = "✤",
  Diamond = "✦"
}

export enum Color {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
  Blue = "#006eff",
  Purple = "#9149ad",
  Orange = "orange"
}

export interface TileInterface {
  color: Color;
  shape: Shape;
  id: number;
}

export type TileProps = {
  tile: TileInterface;
  dragable: boolean;
}

export function getFullTileSet(): TileInterface[] {
  let tileSet: TileInterface[] = [];
  let id = 0;
  for (let colorVal in Color) {
    for (let shapeVal in Shape) {
      for(let i = 0; i < repeats; i++){
        id++;
        let color:Color = Color[colorVal as keyof typeof Color];
        let shape:Shape = Shape[shapeVal as keyof typeof Shape];
        tileSet.push({color, shape, id})
      }
    }
  }

  return tileSet;
}

export const Tile = ({ tile, dragable }: TileProps) => {
  return dragable ?
         <DragableTile {...tile} /> :
         <InnertTile {...tile} />
}

function InnertTile(tile: TileInterface) {
  return (
    <div style={{display: 'inline-block'}}>
      <InnerTile {...tile} />
    </div>
  )
}

function DragableTile(tile: TileInterface) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "tile",
    item: tile,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag} 
      style={{
        opacity: isDragging ? 0.2 : 1,
        cursor: 'move',
        display: 'inline-block'
      }}
    >
      <InnerTile {...tile} />
    </div>
  )
}

const InnerTile = ({color, shape}: TileInterface) => {
  return (
    <div className={styles.tile} style={{color, }}>{ shape }</div>
  )
}

export default Tile;