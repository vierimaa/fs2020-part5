import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleSubmit = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      console.log('error', exception)
      dispatch(showNotification({ content: 'Wrong username or password!', class:'error' }, 5))
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        handleSubmit={handleSubmit}
      />
    </Togglable>
  )

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(showNotification({ content:`New blog ${returnedBlog.title} added`, class:'notification' }, 5))
    } catch (exception) {
      console.log('error', exception)
    }
  }

  const likeBlog = async (id) => {
    try {
      const blogToLike = blogs.find((blog) => blog.id === id)
      
      const updatedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }

      const likedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => blog.id === id ? likedBlog : blog))

    } catch (exception) {
      console.log('error', exception)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))

    } catch (exception) {
      console.log('error', exception)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Create' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}

    </div>
  )

  return (
    <div>
      <Notification />
      <h1>Blog website</h1>
      {user === null ?
        loginForm() :
        <div>
          {user.name} Logged in
          <button onClick={handleLogout}>
            Logout
          </button>
          {blogForm()}
          {blogList()}
        </div>
      }

    </div>
  )
}

export default App