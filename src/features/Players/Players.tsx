import Tile, { Status, TilePrimitive } from "../tile/Tile";
import styles from './Player.module.css';
import { Move } from "../Moves/movesSlice";
import { PlayerPrimitive, selectPlayers, addTile, removeTile } from "../Players/playersSlice";
import { connect } from "react-redux";
import { RootState } from "../../app/store";

export interface PlayerProps extends PlayerPrimitive {
  moves: Move[];
  totalPoints: number;
  atBat: boolean;
}

interface PlayersProps {
  players: PlayerProps[],
  addTile: any;
  removeTile: any;
}

export function Players({ players }: PlayersProps) {

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className ={styles.th}>Player</th>
            {players.map((player:PlayerProps) => (
              <td key={player.id} 
                  className={styles.td + " " + (player.atBat ? styles.atBat : "")}
                  style={{width: "100px"}}>
                <p>{player.name}</p>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className ={styles.th}>Hand</th>
            {players.map((player:PlayerProps) => (
              <td className={styles.td + " " + (player.atBat ? styles.atBat : "")}
                  key={player.id}
              >
                { player.tiles.map((tile:TilePrimitive) => (
                  <Tile {...tile} draggable={player.atBat} status={Status.Normal} key={tile.id} />
                ))}
              </td>
            ))}
          </tr>
          <tr>
            <th className ={styles.th}>Moves</th>
            {players.map((player:PlayerProps) => (
              <td className={styles.td + " " + (player.atBat ? styles.atBat : "")} key={player.id}>
                {player.moves.map((move:Move, j:number) => (
                  <p key={j}>{move.points}</p>
                ))}
              </td>
            ))}
          </tr>
          <tr>
            <th className ={styles.th}>Total</th>
            {players.map((player:PlayerProps) => (
              <td className={styles.td + " " + (player.atBat ? styles.atBat : "")} key={player.id}>
                {player.totalPoints}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

    </div>
  )
};

function mapStateToProps(state: RootState) {
  return {
    players: selectPlayers(state)
  }
}

const mapDispatchToProps = {
  addTile,
  removeTile
}

export default connect(mapStateToProps, mapDispatchToProps)(Players)