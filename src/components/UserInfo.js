import React from 'react'
import { Link } from "react-router-dom"

// <Link to={`/anecdotes/${anecdote.id}`}><li key={anecdote.id} >{anecdote.content}</li></Link>

const UserInfo = ({ user }) => {
  return (
    <tr>
        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
  )

  
}

export default UserInfo