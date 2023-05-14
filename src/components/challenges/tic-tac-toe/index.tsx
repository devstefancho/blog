import React from 'react'
import Board from './board'
import { TicTacToeProvider } from './tic-tac-toe.container'
import Dashboard from './dashboard'
import BoardStatus from './board-status'

const TicTacToeGame = () => {
  return (
    <TicTacToeProvider>
      <Dashboard />
      <BoardStatus>
        <Board />
      </BoardStatus>
    </TicTacToeProvider>
  )
}

export default TicTacToeGame
