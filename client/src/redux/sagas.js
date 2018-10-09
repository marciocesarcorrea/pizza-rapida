import { all } from 'redux-saga/effects'

import { itensSagas } from './modules/itensData'

export default function * rootSaga () {
  yield all([
    ...itensSagas
  ])
}
