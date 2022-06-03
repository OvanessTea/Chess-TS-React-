import React, {FC} from 'react'
import {Cell} from '../models/Cell'

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

export const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div 
      className={['cell', cell.color, selected ? "selected" : ""].join(' ')}
      onClick={() => click(cell)}
      style={{background: cell.available && cell.figure ? '#793beb' : ''}}
    >
        {cell.available && !cell.figure && <div className="avaliable" />}
        {cell.figure?.logo && <img src={cell.figure.logo} alt='' />}
    </div>
  )
}
