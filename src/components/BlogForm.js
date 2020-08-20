import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
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
      <button id='create-blog-btn' type="submit">Create</button>
    </form>
  )
}

export default BlogForm