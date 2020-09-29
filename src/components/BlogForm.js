import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={addBlog}>
      <Form.Group>
      <h2>Add a new blog</h2>

      <Form.Label>title</Form.Label>
        <Form.Control
          id='title'
          value={title}
          name="Title"
          type="text"
          onChange={({ target }) => setTitle(target.value)}
        />


      <Form.Label>author</Form.Label>
        <Form.Control
          id='author'
          value={author}
          name="Author"
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
        />


      <Form.Label>url</Form.Label>
        <Form.Control
          id='url'
          value={url}
          name="Url"
          type="text"
          onChange={({ target }) => setUrl(target.value)}
        />

      <Button id='create-blog-btn' type="submit">Create</Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm