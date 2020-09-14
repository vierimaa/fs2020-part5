import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const updatedBlog = action.data
      const likeId = action.data.id
      return state.map(blog => blog.id !== likeId ? blog : updatedBlog)
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      const deleteId = action.data.id
      return state.filter(blog => blog.id !== deleteId)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    const likedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const newBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (blogObject) => {
  return async dispatch => {
    await blogService.remove(blogObject)
    dispatch({
      type: 'DELETE_BLOG',
      data: blogObject
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer