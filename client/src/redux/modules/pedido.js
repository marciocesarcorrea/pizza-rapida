import config from '../../config'
import axios from 'axios'
import { takeLatest, put } from 'redux-saga/effects'
import { createAction, handleActions } from 'redux-actions'

export const fazPedido = createAction('PEDIDO')
export const pedidoError = createAction('PEDIDO/ERROR')
export const pedidoDone = createAction('PEDIDO/DONE')

const INITIAL_STATE = {
  confirmado: false,
  loading: false,
  error: undefined
}
export default handleActions({
  [fazPedido]: () => ({...INITIAL_STATE, loading: true}),
  [pedidoDone]: () => ({...INITIAL_STATE, confirmado: true}),
  [pedidoError]: (state, { payload }) => ({...INITIAL_STATE, error: payload})
}, INITIAL_STATE)

function fazerPedido (data) {
  return axios.post(`${config.webservice}pizza`, data).then(
    result => ({ result })
  ).catch(error => ({ error }))
}

export function * pedidoSaga ({payload}) {
  const { result, error } = yield fazerPedido(payload)
  if (error || !result || !result.data) {
    yield put(pedidoError(error.message))
    return
  }
  yield put(pedidoDone(result.data))
}

export const pedidoSagas = [
  takeLatest(fazPedido, pedidoSaga)
]
