import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'
import userService from './services/users'

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initBlogs, newBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import { logUser, initUser, clearUser } from './reducers/userReducer'

const App = () => {
  const padding = {
    padding: 5
  }

  const [allUsers, setAllUsers] = useState([])
  
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(user => setAllUsers(user))
  }, [])

  const handleSubmit = (loginObject) => {
    dispatch(logUser(loginObject))
  }

  const handleLogout = () => {
    dispatch(clearUser())
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        handleSubmit={handleSubmit}
      />
    </Togglable>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(newBlog(blogObject))
    dispatch(showNotification({ content:`New blog ${blogObject.title} added`, class:'notification' }, 5))
  }

  const handleLikeBlog = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDeleteBlog = (blog) => {
    dispatch(deleteBlog(blog))
  }

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
          likeBlog={handleLikeBlog}
          deleteBlog={handleDeleteBlog}
          user={user}
        />
      )}
    </div>
  )

  const userList = () => {
    if (allUsers.length > 0) {
      return(
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>user</th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user =>
                <UserInfo
                  name={user.name}
                  numBlogs={user.blogs.length}
                />
              )}
            </tbody>
            
          </table>
          
        </div>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Notification />
      <h1>Blog website</h1>

      <Switch>
        <Route path="/users">
        {userList()}
        </Route>
        <Route path="/">
        <div>
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
        </Route>
      </Switch>
    </Router>
    
  )
}

export default App