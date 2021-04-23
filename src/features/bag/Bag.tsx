import Tile, { TileInterface } from '../tile/Tile'

type BagProps = {
  bag: TileInterface[]
}

export function Bag({ bag }: BagProps) { 

  return (
    <div>
      { bag.map((tile) => (
        <Tile key={tile.id} tile={tile} dragable={false} />
      ))}
    </div>
  )
}
