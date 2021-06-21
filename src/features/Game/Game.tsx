import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { RootState } from '../../app/store'
import { finishMove } from '../Moves/movesSlice'
import Players, { PlayerProps } from '../Players/Players'
import { addPlayer, PlayerPrimitive, removePlayer, selectPlayers } from '../Players/playersSlice'
import { Status, selectStatus, selectCanStartGame, startGame, resetGame } from './gameSlice'
import PlayerSetup from './PlayerSetup'

interface GameProps {
  status: Status;
  canStartGame: boolean;
  players: PlayerPrimitive[];
  addPlayer: ActionCreatorWithPayload<string, string>;
  removePlayer: any;
  startGame: any;
  resetGame: any;
}



export function Game(gameProps: GameProps) {

  let { status, canStartGame, players, addPlayer, removePlayer, startGame, resetGame } = gameProps;

  function clickResetGame(){
    if(window.confirm("Reset?")){
      resetGame();
    }
  }

  function resetButton(){
    if(status !== Status.Setup){
      return (
        <button onClick={clickResetGame}>Reset Game</button>
      )
    } else {
      return null;
    }
  }


  function getPlayerSetup(){
    if(status === Status.Setup){
      return <PlayerSetup {...{players, canStartGame, addPlayer, removePlayer, startGame}} />
    } else {
      return <Players />
    }
  }

  return (
    <div>
      <h1>Game Status: {status} { resetButton() }</h1>
      { getPlayerSetup() }
    </div>
  )
}

function mapStateToProps(state: RootState) {
  return {
    status: selectStatus(state),
    canStartGame: selectCanStartGame(state),
    players: selectPlayers(state)
  }
}

const mapDispatchToProps = {
  addPlayer,
  removePlayer,
  startGame,
  resetGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)