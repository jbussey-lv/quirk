import { useAppSelector } from './app/hooks';
import { selectGrid, selectPlayers, selectGameStatus, selectBag, PlayerInterface, selectCurrentPlayer } from './slices/gameSlice';
import { Board } from './features/Board/Board'
import { Players } from './features/players/Players'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const grid = useAppSelector(selectGrid);
  const bag = useAppSelector(selectBag);
  const players:PlayerInterface[] = useAppSelector(selectPlayers);
  const gameStatus = useAppSelector(selectGameStatus);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{width: "50%", float: "left"}}>
          <Board grid={ grid }/>
        </div>
        <div style={{width: "50%", float: "left"}}>
          <Players players={ players } gameStatus={ gameStatus }/>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
