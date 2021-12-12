import  { Component } from "react";
import {connect} from 'react-redux'
import { createPost, showAlert, newPost } from "../redux/actions";


class PostForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: ''
    }
  }

  submitHandler = event => {
    event.preventDefault()
    
    const {title} = this.state

    if (!title.trim()) {
      return this.props.showAlert('Название поста не может быть пустым')
    }
    
    const newPost = {
      title, id: Date.now().toString()
    }

    this.props.newPost(newPost) // эта функция будет вызывать диспатч изменяя наш стейт
    this.setState({title: ''})
  }

  chengeInputHandler = event => {
    event.persist()
    this.setState(prev => ({...prev,...{
      [event.target.name]: event.target.value 
    }}))
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {
          this.props.alert &&
            <div className="alert alert-warning" role="alert">
               {this.props.alert}
            </div>
        }
        
        <div className="form-group">
          <label htmlFor="title">Заголовок поста</label>
          <input 
          type="text" 
          className="form-control" 
          id="title"
          value={this.state.title}
          name="title"
          onChange={this.chengeInputHandler}
          />
        </div>
        <button className="btn btn-success" type="submit">Создать</button>
      </form>
    )
  }
}

const mapDispatchToProps = { // наш экшн передаем его в диспатч
  createPost, showAlert, newPost
}

const mapStateToProps = state => ({
  alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm) //первый параметр стейт второй диспач