import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import createHistory from 'history/createBrowserHistory'

import App from './App';
import * as reducers from './redux'
import services from './services'

import 'bootswatch/dist/flatly/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css'

import { Router } from 'react-router';

const history= createHistory();

const store = createStore(combineReducers({
  ...reducers,
  form: formReducer,
}), applyMiddleware(thunk.withExtraArgument(services)))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App history={history}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

