import { combineReducers } from 'redux'

import itensData from './modules/itensData'
import pedido from './modules/pedido'

const reducers = {
  itensData,
  pedido
}

const rootReducer = combineReducers(reducers)
export default rootReducer
