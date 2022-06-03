import React, {FC, useEffect, useRef, useState} from 'react';
import { callbackify } from 'util';
import { Colors } from '../models/Colors';
import {Player} from "../models/Player"

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

export const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  function startTimer() {
    if(timer.current) {
      clearInterval(timer.current);
    }
      const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
      timer.current = setInterval(callback, 1000)
  }
  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }
  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  useEffect(() => {
    if (blackTime === 0) {
      alert("Черный проиграл");
      handleRestart();
    }
    if (whiteTime === 0) {
      alert("Белый проиграл");
      handleRestart();
    }
  }, [whiteTime, blackTime])

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
    </div>
  )
}
