import { SquareValue, TicTacToeState } from './tic-tac-toe.container'

const getCurrentTurnValue = (state: TicTacToeState) =>
  state.squares.filter((value) => value).length % 2 === 0
    ? SquareValue.X
    : SquareValue.O

const getWinner = (state: TicTacToeState) => {
  const { squares: squares } = state
  const winningLines = [
    [0, 1, 2], // Horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal
    [2, 4, 6],
  ]

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

export { getCurrentTurnValue, getWinner }
