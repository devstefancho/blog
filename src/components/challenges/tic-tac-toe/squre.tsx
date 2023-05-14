import React from 'react'
import * as styles from './index.module.scss'
import { TicTacToeActionType, useTicTacToe } from './tic-tac-toe.container'
import { getCurrentTurnValue, getWinner } from './tic-tac-toe.util'

interface Props {
  index: number
}

const Square = ({ index }: Props) => {
  const context = useTicTacToe()
  const { state, dispatch } = context
  const winner = getWinner(state)

  const handleClick = () => {
    if (state.squares[index] || winner) {
      return
    }
    dispatch({
      type: TicTacToeActionType.SET_SQUARES,
      payload: {
        index,
        value: getCurrentTurnValue(state),
      },
    })
  }

  return (
    <button
      className={`${styles.square} ${index % 2 === 0 ? styles.playerA : ''}`}
      onClick={handleClick}
    >
      {state.squares[index]}
    </button>
  )
}

export default Square
