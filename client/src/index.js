import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './redux/store'
import { configureHistory } from './routes/configureHistory'

import 'semantic-ui-css/semantic.min.css'
import './assets/styles.css'

const Root = () => (
  <Provider store={store}>
    <Router history={configureHistory()}>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
