import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export const logUser = (loginObject) => {
  return async dispatch => {
    try {
    const userResponse = await loginService.login(loginObject)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(userResponse)
    )
    blogService.setToken(userResponse.token)
    dispatch({
      type: 'SET_USER',
      data: userResponse
    })
    } catch(exception) {
      console.log('Error:', exception)
      dispatch(showNotification({ content: 'Wrong username or password!', class:'error' }, 5))
    }
  }
}

export const initUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'SET_USER',
        data: loggedUser
      })
    }
  }
}

export const clearUser = () => {
  return async dispatch => {
    localStorage.clear()
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

export default userReducer