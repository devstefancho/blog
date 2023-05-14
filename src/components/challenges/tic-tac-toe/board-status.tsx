import React, { FC, PropsWithChildren } from 'react'
import {
  HistoryItem,
  TicTacToeActionType,
  useTicTacToe,
} from './tic-tac-toe.container'
import { getCurrentTurnValue, getWinner } from './tic-tac-toe.util'
import * as styles from './index.module.scss'

const BoardStatus: FC<PropsWithChildren> = ({ children }) => {
  const { state, dispatch } = useTicTacToe()
  const winner = getWinner(state)
  const handleClick = (id: HistoryItem['id']) => {
    dispatch({ type: TicTacToeActionType.GO_TO_HISTORY, payload: { id } })
  }

  return (
    <section className={styles.boardStatus}>
      <p className={styles.description}>Turn: {getCurrentTurnValue(state)}</p>
      {children}
      {winner ? (
        <caption>🎉 {winner} wins</caption>
      ) : (
        'winner will be displayed'
      )}
      <h3>History</h3>
      <ol>
        {state.history.map((h) => (
          <li key={h.id} onClick={() => handleClick(h.id)}>
            {JSON.stringify(h.value)}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default BoardStatus
