import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [viewFullBlog, setviewFullBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {
    const cofirmDelete = window.confirm(`Do you really want to delete blog "${blog.title}"?`)
    if(cofirmDelete) {
      deleteBlog(blog)
    } else {
      return
    }
  }

  const showDelete = () => {
    if((typeof blog !== 'undefined' || typeof user !== 'undefined') && (user.id.toString() === blog.user.id || user.id.toString() === blog.user)) {
      return(
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )
    }
    return null
  }

  const fullBlog = (
    <div>
      <div>
        {blog.url}
      </div>
      <div className='likes'>
        Likes {blog.likes}<button onClick={() => likeBlog(blog)}>Like</button>
      </div>
      
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
      <div>
        {blog.author}
      </div>
      {
        viewFullBlog ?
          fullBlog
          :
          null
      }
      <div className='view'>
        <button className='view-btn' onClick={() => setviewFullBlog(!viewFullBlog)}>View</button>
      </div>
      <div>
        {showDelete()}
      </div>

    </div>
  )}

export default Blog