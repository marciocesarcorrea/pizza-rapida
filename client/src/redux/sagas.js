import { all } from 'redux-saga/effects'

import { itensSagas } from './modules/itensData'
import { pedidoSagas } from './modules/pedido'

export default function * rootSaga () {
  yield all([
    ...itensSagas,
    ...pedidoSagas
  ])
}
