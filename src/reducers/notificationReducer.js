let timer

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const showNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer