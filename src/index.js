import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {compose, createStore, applyMiddleware} from 'redux'
import { rootReducer } from './redux/rootReducer';
import {Provider} from 'react-redux' //библиотека для связки реакта с редаксом
import thunk from "redux-thunk" //объект мидлвеера
import { forbiddenWordsMiddleware } from './redux/middleware';
import createSagaMiddleware from 'redux-saga'
import { sagaWatcher } from './redux/sagas';

const saga = createSagaMiddleware()

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk, forbiddenWordsMiddleware, saga // добавляем сагу в миддлвеер
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)) // создаем стор редакса это хранилище

saga.run(sagaWatcher) //привязываем наш вотчер

const app = ( //оборачиваем наше приложение в провайдер
  <Provider store={store}>
    <App/>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
