import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../app/hooks";
import { addPlacement, Position } from "../../slices/gameSlice";
import Tile, { TileInterface } from "../tile/Tile";

type SquareProps = {
  tile: TileInterface|null;
  position: Position;
}

export function Square({ tile, position }: SquareProps) {

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

  let getCellContents = function(tile: TileInterface|null){
    return tile ? (<Tile {...tile} />) : "";
  }

  return (
    <td ref={drop}>
      { getCellContents(tile) }
    </td>
  )
}