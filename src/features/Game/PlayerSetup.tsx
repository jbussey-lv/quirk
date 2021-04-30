import { PlayerPrimitive } from '../Players/playersSlice'
import { useInput } from '../../app/hooks'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface PlayerSetupProps {
  canStartGame: boolean;
  players: PlayerPrimitive[];
  addPlayer: ActionCreatorWithPayload<string, string>;
  removePlayer: any;
  startGame: any;
}

export default function PlayerSetup({players, addPlayer, removePlayer, canStartGame, startGame}: PlayerSetupProps){

  const { value, bind, reset } = useInput('');

  function clickAddPlayer(){
    if(value !== ""){
      addPlayer(value);
      reset();
    }
  }

  function clickRemovePlayer(player: PlayerPrimitive){
    removePlayer(player);
  }

  function clickStartGame(){
    if(canStartGame){
      startGame();
    }
  }

  return (
    <div>
      <input type="text" {...bind} />
      &nbsp;&nbsp;
      <button onClick={clickAddPlayer}>Add Player</button>
      <ul>
        { players.map(player => (
          <li key={player.id}>{player.name} <button onClick={() => clickRemovePlayer(player)}>remove</button></li>
        ))}
      </ul>
      <button onClick={clickStartGame} disabled={!canStartGame}>Start Game</button>
    </div>
  )
}
