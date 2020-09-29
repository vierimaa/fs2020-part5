import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
      <Form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />

          <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

          <Button id="login-button" type="submit">Login</Button>
        </Form.Group>
      </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm