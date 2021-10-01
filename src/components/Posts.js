import React from "react";
import {connect} from 'react-redux' //функция высшего порядка для соединение компонента со стором
import Post from "./Post";

const Posts = ({syncPosts}) => {
  if (!syncPosts.length) {
    return <p className="text-center">постов пока нет</p>
  }
  return syncPosts.map(post => <Post post={post} key={post.id} />)
}

const mapStateToProps = state => { //функция которая преобразовывает весь стейт в пропсы
  return {
    syncPosts: state.posts.posts //теперь вместо стандартных пропсов можем передать в компонент данные которые вернула функция
  }
}

export default connect(mapStateToProps, null)(Posts) // синтаксис для преобразования компонента 