import React from 'react'
import { useParams } from "react-router-dom"

const UserPage = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (users.length > 0){
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map(blog => <li key={blog.id} >{blog.title}</li>)}
        </ul>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default UserPage