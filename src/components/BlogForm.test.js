import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  // component.debug()
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.change(author, { 
    target: { value: 'Odevelli' } 
  })
  fireEvent.change(url, { 
    target: { value: 'www.ode.velli' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('Odevelli')
  expect(createBlog.mock.calls[0][0].url).toBe('www.ode.velli')
  expect(createBlog).toHaveBeenCalledWith({"author": "Odevelli", "title": "testing of forms could be easier", "url": "www.ode.velli"})
})