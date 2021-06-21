import { useDrop } from "react-dnd";
import Tile, { TilePrimitive, TileProps } from "../tile/Tile";
import { Position } from "./boardSlice";

type SquareProps = {
  tileProps: TileProps|null;
  position: Position;
  addTile: any;
  removeTile: any;
}

export default function Square({ tileProps, position, addTile, removeTile }: SquareProps) {

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