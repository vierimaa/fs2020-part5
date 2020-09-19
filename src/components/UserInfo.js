import React from 'react'

const UserInfo = ({ name, numBlogs }) => {
  return (
    <tr>
        <td>{name}</td>
        <td>{numBlogs}</td>
      </tr>
  )

  
}

export default UserInfo