import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../app/hooks";
import { addPlacement, PositionInterface } from "../../slices/gameSlice";
import Tile, { TileInterface, TileProps } from "../tile/Tile";

type SquareProps = {
  tileProps: TileProps|null;
  position: PositionInterface;
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