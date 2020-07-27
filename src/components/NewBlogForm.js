import React, { useState } from 'react'

const BlogForm = () => (
  <form onSubmit={addBlog}>
    <input
      value={newNote}
      onChange={handleNoteChange}
    />
    <button type="submit">save</button>
  </form>  
)


export default BlogForm;