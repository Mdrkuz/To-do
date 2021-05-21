import React, {useState} from 'react';
import {createStore} from 'redux';
import {connect} from 'react-redux';
import {filtered} from './index'
const createTodo = title => ({
  type: 'CREATE_TODO',
  title
})
const removeTodo = id => ({
  type: 'REMOVE_TODO',
  id
})
const removeAll = () => ({
  type: 'REMOVE_ALL_TODO',
})
const toggleTodo = (complete, id) => ({
  type: 'TOGGLE_TODO',
  complete,
  id
})
export const changeVisibleTodo = (filter) => ({
  type: 'CHANGE_TYPE',
  filter
})
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    list: filtered(state.filter, state.todo.list),
    type: state.filter,
    counter: state.todo.list.filter(it => !it.complete).length
  }
}
const mapDispatchToProps = dispatch => ({
  create: text => dispatch(createTodo(text)),
  delete: id => dispatch(removeTodo(id)),
  deleteComplete: () => dispatch(removeAll()),
  toggle: (complete, id) => dispatch(toggleTodo(complete, id)),
  filter: type => dispatch(changeVisibleTodo(type))
})
function App(props) {
  const [text, changeText] = useState('')
  const change = event => changeText(event.target.value)
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={change} value={text}/>
        <button onClick={() => {
          changeText('')
          props.create(text)
        }}>add todo</button>
        {props.list.map(it =>
          <div
            style={{textDecoration: it.complete ? 'line-through' : ''}}
            onClick = {() => props.toggle(!it.complete, it.id)}>
            {it.title}
            <button onClick={() => props.delete(it.id)}>delete</button>
          </div>)}
        <div>
          <button onClick = {() => props.filter(VisibilityFilters.SHOW_ALL)}>All</button>
          <button onClick = {() => props.filter(VisibilityFilters.SHOW_COMPLETED)}>Completed</button>
          <button onClick = {() => props.filter(VisibilityFilters.SHOW_ACTIVE)}>Active</button>
          <button onClick = {() => props.deleteComplete()}>Delete All</button>
        </div>
        <div>todos left: {props.counter}</div>
      </header>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);