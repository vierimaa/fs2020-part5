import React from 'react'
import { useParams } from "react-router-dom"

const SingleBlog = ({ blogs, likeBlog }) => {
  const id = useParams().id
  const blog = blogs.find(u => u.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (blogs.length > 0) {
    return (
      <div className='blog' style={blogStyle}>
        <h2>
          {blog.title}
        </h2>
        <div>
          {blog.url}
        </div>
        <div className='likes'>
          Likes {blog.likes}<button onClick={() => likeBlog(blog)}>Like</button>
        </div>
        <div>
          added by {blog.author}
        </div>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}


  

export default SingleBlog