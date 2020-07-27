import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState({ content: null, type: null})

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error', exception)
      setNotification(
        { content: 'Wrong username or password!', type: 'error' }
      )
      setTimeout(() => {
        setNotification({ content: null, type: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    localStorage.clear()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(
        { content:`New blog ${returnedBlog.title} added`, type:'notification' }
      )
      setTimeout(() => {
        setNotification({ content: null, type: null })
      }, 5000)
    } catch (exception) {
      console.log('error', exception)
    }
  }


  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>Add a new blog</h2>
      <div>
        title
        <input
          id='title'
          value={title}
          name="Title"
          type="text"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id='author'
          value={author}
          name="Author"
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id='url'
          value={url}
          name="Url"
          type="text"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
        <button type="submit">Create</button>
    </form>  
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )

  return (
    <div>
      <Notification message={notification} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
          {blogList()}
        </div>
      }

    </div>
  )
}

export default App