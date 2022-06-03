import React, {useState, useEffect} from 'react';
import './App.css';
import { Timer } from './components/Timer';
import BoardComponent from './components/BoardComponent';
import { LostFigures } from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [BlackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCell()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer);
  }

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? BlackPlayer : whitePlayer)
  }

  useEffect(() => {
    restart()
  }, [])

  return (
    <div className="app">
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />
      <BoardComponent 
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
      </div>
      <div>
        <LostFigures
          title="Белые фигуры"
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
