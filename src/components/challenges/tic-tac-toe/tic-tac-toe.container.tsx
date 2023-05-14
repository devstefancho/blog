import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

export enum SquareValue {
  X = 'X',
  O = 'O',
}

type Squares = string[]

export type HistoryItem = {
  id: string
  value: Squares
}
export type TicTacToeState = {
  squares: Squares
  history: HistoryItem[]
}

export enum TicTacToeActionType {
  SET_SQUARES = 'SET_SQUARES',
  RESET_SQUARES = 'RESET_SQUARES',
  GO_TO_HISTORY = 'GO_TO_HISTORY',
}

type Action = SetSquares | ResetSquares | GoToHistory
type SetSquares = {
  type: TicTacToeActionType.SET_SQUARES
  payload: {
    index: number
    value: SquareValue
  }
}
type ResetSquares = {
  type: TicTacToeActionType.RESET_SQUARES
}
type GoToHistory = {
  type: TicTacToeActionType.GO_TO_HISTORY
  payload: {
    id: string
  }
}

type TicTacToeContextType = {
  state: TicTacToeState
  dispatch: React.Dispatch<Action>
}
type Reducer = (state: TicTacToeState, action: Action) => TicTacToeState

const initialState: TicTacToeState = {
  squares: Array(9).fill(''),
  history: [],
}

const dummyDispatch = () => {
  throw new Error('TicTacToeProvider not found')
}

const TicTacToeContext = createContext<TicTacToeContextType>({
  state: initialState,
  dispatch: dummyDispatch,
})

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case TicTacToeActionType.SET_SQUARES: {
      const newSquare = state.squares.map((square, index) => {
        if (index === action.payload.index) {
          return action.payload.value
        }
        return square
      })
      return {
        squares: newSquare,
        history: [...state.history, { id: uuidv4(), value: newSquare }],
      }
    }
    case TicTacToeActionType.RESET_SQUARES: {
      return {
        ...initialState,
      }
    }
    case TicTacToeActionType.GO_TO_HISTORY: {
      const selectedIndex = state.history.findIndex(
        (h) => h.id === action.payload.id
      )
      return {
        ...state,
        squares: state.history[selectedIndex].value,
        history: state.history.slice(0, selectedIndex + 1),
      }
    }
    default:
      return state
  }
}

const TicTacToeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <TicTacToeContext.Provider value={value}>
      {children}
    </TicTacToeContext.Provider>
  )
}

const useTicTacToe = () => useContext(TicTacToeContext)

export { TicTacToeProvider, useTicTacToe }
