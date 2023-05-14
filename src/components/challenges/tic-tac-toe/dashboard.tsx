import React from 'react'
import { TicTacToeActionType, useTicTacToe } from './tic-tac-toe.container'
import * as styles from './index.module.scss'

const Dashboard = () => {
  const { dispatch } = useTicTacToe()
  const handleClick = () => {
    dispatch({ type: TicTacToeActionType.RESET_SQUARES })
  }

  return (
    <section className={styles.dashboard}>
      <h2 className={styles.title}>Tic Tac Toe</h2>
      <button className={styles.resetButton} onClick={handleClick}>
        ⟳
      </button>
    </section>
  )
}

export default Dashboard
