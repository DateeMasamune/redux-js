import { CREATE_POST, FETCH_POSTS } from "./types"

const initialState = { // начальное состояние хранилища постов
  posts: [],
  fetchedPosts: []
}

export const postsReducer = (state = initialState, action) => { // редьюсер постов который принимает начальное состояние и экшн и возвращает состояние
  switch (action.type) {
    case CREATE_POST:
      return {...state, posts: [...state.posts, action.payload]} //добавляем в стор новый пост
      case FETCH_POSTS:
        return {...state, fetchedPosts: action.payload} //посты с сервера которые мы будет вставлять в стейт
    default: return state
  }
}