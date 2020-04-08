import React, { useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { MAIN_COLOR } from '../../utils/Constants.jsx'
import {
  signUp,
  validateEmail,
  validateUsername,
} from '../../utils/APIRequests/AuthRequests.jsx'
import { Redirect, useHistory } from 'react-router-dom'
import { getToken } from '../../utils/LocalStorageUtils.jsx'
import createNotification from '../../utils/Notifications.jsx'
import styles from './FormStyles.scss'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUsernameError, setIsUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [isEmailError, setIsEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [isNameError, setIsNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const history = useHistory()

  const signupCallback = (res) => {
    history.push('/')
  }

  const signupErrorCallback = (error) => {
    setIsLoading(false)
    createNotification('error')('Server error')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username) {
      setIsUsernameError(true)
      return
    }
    if (!email) {
      setIsEmailError(true)
      return
    }
    if (!name) {
      setIsNameError(true)
      return
    }
    if (!password) {
      setIsPasswordError(true)
      return
    }
    if (isPasswordError || isUsernameError || isNameError || isEmailError)
      return
    setIsLoading(true)
    signUp(
      { name, username, email, password },
      signupCallback,
      signupErrorCallback
    )
  }

  const validateUsernameCallback = (data) => {
    if (data.success) {
      setIsUsernameError(true)
      setUsernameErrorMessage('Username  is already taken')
    }
  }
  const usernameOnChange = (e) => {
    const newUsername = e.target.value
    setIsUsernameError(false)
    setUsername(newUsername)
    if (newUsername.length < 3 || newUsername.length > 15) {
      setIsUsernameError(true)
      setUsernameErrorMessage('Username length must be 3...15 symbols')
      return
    }
    validateUsername(newUsername, validateUsernameCallback)
  }

  const validateEmailCallback = (data) => {
    if (data.success) {
      setIsEmailError(true)
      setEmailErrorMessage('Email  is already in use')
    }
  }
  const emailOnChange = (e) => {
    const newEmail = e.target.value
    setIsEmailError(false)
    setEmail(newEmail)
    if (newEmail.length > 40) {
      setIsEmailError(true)
      setEmailErrorMessage('Email length must be less then 40 symbols')
      return
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(newEmail).toLowerCase())) {
      setIsEmailError(true)
      setEmailErrorMessage('Wrong email format')
      return
    }
    validateEmail(newEmail, validateEmailCallback)
  }
  const nameOnChange = (e) => {
    const newName = e.target.value
    setName(newName)
    setIsNameError(false)
    if (newName.length < 4 || newName.length > 40) {
      setNameErrorMessage('Full name must be 4...40 symbols')
      setIsNameError(true)
    }
  }
  const passwordOnChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setIsPasswordError(false)
    if (newPassword.length < 6 || newPassword.length > 20) {
      setPasswordErrorMessage('Password must be 6...20 symbols')
      setIsPasswordError(true)
    }
  }
  return (
    <div className={styles.Form}>
      {/*TODO: redirect*/}
      {getToken() && <Redirect to={{ pathname: '/boards' }} />}
      <Form onSubmit={handleSubmit}>
        <Form.Field error={isUsernameError}>
          <label>Username</label>
          <Input
            placeholder={'Enter username'}
            value={username}
            onChange={usernameOnChange}
          />
        </Form.Field>
        <p className={styles.errorMessage}>
          {isUsernameError && usernameErrorMessage}
        </p>
        <Form.Field error={isNameError}>
          <label>Full name</label>
          <input
            placeholder={'Enter full name'}
            value={name}
            onChange={nameOnChange}
          />
        </Form.Field>
        <p className={styles.errorMessage}>{isNameError && nameErrorMessage}</p>
        <Form.Field error={isEmailError}>
          <label>Email</label>
          <input
            placeholder={'Enter email'}
            value={email}
            onChange={emailOnChange}
          />
        </Form.Field>
        <p className={styles.errorMessage}>
          {isEmailError && emailErrorMessage}
        </p>
        <Form.Field error={isPasswordError}>
          <label>Password</label>
          <input
            type={'password'}
            placeholder="Password"
            value={password}
            onChange={passwordOnChange}
          />
        </Form.Field>
        <p className={styles.errorMessage}>
          {isPasswordError && passwordErrorMessage}
        </p>
        <Button color={MAIN_COLOR} type={'submit'} loading={isLoading}>
          Sign Up
        </Button>
        <Button
          basic
          color={MAIN_COLOR}
          onClick={() => history.push('/login')}
          disabled={isLoading}
        >
          Login
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm
