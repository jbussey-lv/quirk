import styles from './Tile.module.css';

import { useDrag } from 'react-dnd'

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

export enum Status {
  Active = "active",
  Illegal = "illegal",
  Normal = "normal",
  Dim = "dim"
}

export interface TilePrimitive {
  color: Color;
  shape: Shape;
  id: number;
}

export interface TileProps extends TilePrimitive {
  draggable: boolean;
  status: Status;
}

const Tile = (props: TileProps) => {
  return props.draggable ?
         <DragableTile {...props} /> :
         <InnertTile {...props} />
}

function InnertTile(tileProps: TileProps) {
  return (
    <div style={{display: 'inline-block'}} className={styles[tileProps.status]}>
      <InnerTile {...tileProps} />
    </div>
  )
}

function DragableTile(tileProps: TileProps) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "tile",
    item: tileProps,
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
      className={styles[tileProps.status]}
    >
      <InnerTile {...tileProps} />
    </div>
  )
}

const InnerTile = ({color, shape}: TilePrimitive) => {
  return (
    <div className={styles.tile} style={{color}}>{shape}</div>
  )
}

export default Tile;