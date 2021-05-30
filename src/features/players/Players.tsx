import { useAppDispatch, useInput } from "../../app/hooks";
import { addPlayer, removePlayer, startGame, resetGame, finishMove, PlayerInterface, GameStatus, MoveInterface } from "../../slices/gameSlice";
import { DragableTile } from "../tile/Tile";
import styles from './Player.module.css';

type PlayersProps = {
  players: PlayerInterface[];
  gameStatus: GameStatus;
}

export function Players({players, gameStatus}: PlayersProps) {

  const dispatch = useAppDispatch();

  const { value, bind, reset } = useInput('');

  let clickAddPlayer = () => {
    if(value !== ""){
      dispatch(addPlayer(value));
      reset();
    }
  }

  let clickRemovePlayer = (player: PlayerInterface) => {
    dispatch(removePlayer(player));
  }

  let clickStartGame = () => {
    dispatch(startGame());
  }

  let clickResetGame = () => {
    dispatch(resetGame());
  }

  let clickFinishMove = () => {
    dispatch(finishMove());
  }

  return (
    <div>
      <h1>Game Status: { gameStatus } </h1>
      <input type="text" {...bind} />
      <button onClick={clickAddPlayer}>Add Player</button>

      <br />
      <br />

      <div>
        <button id="startGame" onClick={clickStartGame} style={{display: "none"}}>Start Game</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={clickResetGame}>Rest Game</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={clickFinishMove}>Finish Move</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Player</th>
            {players.map((player:PlayerInterface) => (
              <td key={player.id} className={player.atBat ? styles.atBat : ""}>
                <p>{player.name}</p>
                <button onClick={() => clickRemovePlayer(player)}>
                  Remove
                </button>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Moves</th>
            {players.map((player:PlayerInterface) => (
              <td className={player.atBat ? styles.atBat : ""} key={player.id}>
                {player.moves.map((move:MoveInterface, j:number) => (
                  <p key={j}>{move.points}</p>
                ))}
              </td>
            ))}
          </tr>
          <tr>
            <th>Total</th>
            {players.map((player:PlayerInterface) => (
              <td className={player.atBat ? styles.atBat : ""} key={player.id}>
                {player.totalPoints}
              </td>
            ))}
          </tr>
          <tr>
            <th>Hand</th>
            {players.map((player:PlayerInterface) => (
              <td className={player.atBat ? styles.atBat : ""} key={player.id}>
                { player.hand.map(tile => (
                  <DragableTile { ...tile } key={ tile.id } />
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

    </div>
  )
};