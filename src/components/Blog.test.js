import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Olli',
    url: 'www.react.com',
    likes: 420,
    id: 'asdasd',
    user: {
      id: 'abc123'
    }
  }
  
  const user = {
    id: 'abc123'
  }
  
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler} />
    )
    // component.debug()
  })

  test('renders title and author, but not url or likes', () => {

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  
  })

  test('renders url and likes, when view is clicked', () => {

    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
  
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)

  })

  test('renders url and likes, when view is clicked', () => {
    
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  
  })

})
