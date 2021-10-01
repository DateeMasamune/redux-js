import {takeEvery, put, call} from 'redux-saga/effects' //функция которая должна обрабатывать каждый экшн вступающий в стор
import {  hideLoader, showLoader } from './actions'
import { FETCH_POSTS, REQUEST_POSTS } from './types'

export function* sagaWatcher () {
  yield takeEvery(REQUEST_POSTS, sagaWorker) //на каждый сайд эффект будем выполнять воркер
}

function* sagaWorker () {
  yield put(showLoader()) // метод позволящий диспатчить событие в стор показываем лоадер
  const payload = yield call(fetchPosts) //дальше мы говорим что нужно подождать пока мы выполнима функцию в кол 
  yield put({type: FETCH_POSTS, payload}) // передаем тип экшена и посты котрые получаем с сервера
  yield put(hideLoader()) //скрываем лоадер
}

async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return await response.json()
}