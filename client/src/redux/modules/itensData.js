import config from '../../config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { takeLatest, put } from 'redux-saga/effects'
import { createAction, handleActions } from 'redux-actions'

export const searchItens = createAction('searchItens/SEARCH')
export const searchItensError = createAction('searchItens/ERROR')
export const searchItensDone = createAction('searchItens/DONE')
export const setItem = createAction('setItem')
export const setResumo = createAction('setResumo')

const INITIAL_STATE = {
  tamanho: undefined,
  tamanhos: [],
  sabor: undefined,
  sabores: [],
  extra: [],
  extras: [],
  mostraResumo: false,
  pedidoConfirmado: false,
  loading: false,
  error: undefined
}
export default handleActions({
  [searchItens]: () => ({...INITIAL_STATE, loading: true, mostraResumo: false}),
  [searchItensDone]: (state, { payload }) => ({...INITIAL_STATE, ...payload}),
  [searchItensError]: (state, { payload }) => ({...INITIAL_STATE, error: payload}),
  [setItem]: (state, {payload}) => {
    let newState = cloneDeep(state)
    if (payload.target === 'extra') {
      const extra = state.extra
      if (extra.find((f) => (f.id === payload.t.id))) newState[payload.target] = extra.filter((f) => (f.id !== payload.t.id))
      else newState[payload.target] = extra.concat(payload.t)
    } else newState[payload.target] = payload.t
    return newState
  },
  [setResumo]: (state, {payload}) => {
    let newState = cloneDeep(state)
    newState.mostraResumo = payload
    return newState
  }

}, INITIAL_STATE)

function loadItens () {
  return axios.get(`${config.webservice}itens`).then(
    result => ({ result })
  ).catch(error => ({ error }))
}

export function * loadItensSaga () {
  const { result, error } = yield loadItens()
  if (error || !result || !result.data) {
    yield put(searchItensError(error.message))
    return
  }
  yield put(searchItensDone(result.data))
}

export const itensSagas = [
  takeLatest(searchItens, loadItensSaga)
]
