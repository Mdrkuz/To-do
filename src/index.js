import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createStore} from "redux";
import {VisibilityFilters} from './App'
import {combineReducers} from "redux"
const todoReducer = (state = {list: []}, action) => {
  switch(action.type) {
    case 'CREATE_TODO':
      if(!state.list.find(it => it.title === action.title)) {
        return {
          ...state,
          list: [
            ...state.list,
            {
              title: action.title,
              id: Math.random(),
              complete: false
            }
          ]
        }
      } else {
        return {
          ...state,
        }
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        list: state.list.filter(it => it.id !== action.id)
      }
    case 'REMOVE_ALL_TODO':
      return {
        ...state,
        list: state.list.filter(it => !it.complete)
      }
    case 'TOGGLE_TODO':
      const todo = state.list.find(it => it.id === action.id)
      if(todo) {
      }
      return {
        ...state,
        list: state.list.map(it => {
          if(it.id === action.id) {
            return {
              ...it,
              complete: action.complete
            }
          } else {
            return it;
          }
        })
      }
    default:
      return state
  }
}
export const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
    switch (action.type) {
      case 'CHANGE_TYPE':
        return action.filter
      default:
        return state
    }
  }
export const filtered = (type, list) => {
  switch (type) {
  case VisibilityFilters.SHOW_ALL:
    return list
  case VisibilityFilters.SHOW_COMPLETED:
    return list.filter(it => it.complete)
  case VisibilityFilters.SHOW_ACTIVE:
    return list.filter(it => !it.complete)
  }
}
const mega = combineReducers({
  todo: todoReducer,
  filter: visibilityFilter
})
const store = createStore(mega)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();