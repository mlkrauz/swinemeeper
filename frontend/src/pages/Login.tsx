import React, { useState } from 'react'
import { Container } from '../components/Container/Container'
import { useMutation, MutationTuple } from '@apollo/client'
import { LOGIN } from '../operations/mutations/LOGIN/LOGIN'
import { CREATE_USER } from '../operations/mutations/CREATE_USER/CREATE_USER'
import auth from '../utils/auth'

export const Login: React.FC = () => {
  
  interface formData {
    username: string
    email: string
    password: string
    passwordConfirm: string
  }

  const formDefaults: formData = { username: '', email: '', password: '', passwordConfirm: '' }

  const [formState, setFormState] = useState<formData>(formDefaults)
  const [isLoggingIn, toggleLoginState] = useState<boolean>(true)
  const [login, loginError ] = useMutation(LOGIN)
  const [newUser, newUserError ] = useMutation(CREATE_USER)
  const [displayedError, setDisplayedError] = useState<string | null>(null)
  
  const handleFormSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (isLoggingIn) {
        // Try logging in.
        const mutationResponse = await login({
          variables: { email: formState.email,
          password: formState.password }
        })

        // Get token
        const token: string = mutationResponse.data.login.token
        const userId: string = mutationResponse.data.login.user._id

        // Log in
        auth.login(token, userId)

        // Reset form
        setFormState(formDefaults)
        setDisplayedError(null)

      } else {
        // Check if passwords match
        if (formState.password !== formState.passwordConfirm) {
          throw new Error('Passwords do not match.')
        }

        // Create new user. We don't need anything from the response at this time.
        await newUser({
          variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password
          }
        })

        const loginResponse = await login({
          variables: { email: formState.email,
          password: formState.password }
        })

        // Get token
        const token: string = loginResponse.data.login.token
        const userId: string = loginResponse.data.login.user._id

        // Log in
        auth.login(token, userId)

        // Reset form
        setFormState(formDefaults)
        setDisplayedError(null)

      }
    } catch (error: any) {
      setDisplayedError(error?.message ?? 'An unknown error occured!')
    }
  }

  const formChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value
    } as formData)
  }

  return (
    <Container { ...{ title: isLoggingIn ? 'LOG IN' : 'SIGN UP' } }>
      <form name='login' onSubmit={handleFormSubmit}>
        { isLoggingIn ? (
          null
        ) : (
          <div>
            <label htmlFor='username'>Username</label>
            <input
              placeholder=''
              name='username'
              type='text'
              id='username'
              onChange={formChanged}
            />
          </div>
        ) }
        <div>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='myemail@fakemail.com'
            name='email'
            type='email'
            id='email'
            onChange={formChanged}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='************'
            name='password'
            type='password'
            id='password'
            onChange={formChanged}
          />
        </div>
        { isLoggingIn ? (
          null
        ) : (
        <div>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input
            placeholder='************'
            name='passwordConfirm'
            type='password'
            id='passwordConfirm'
            onChange={formChanged}
          />
        </div>
        ) }
      
      { displayedError ? (
        <p>{ displayedError }</p>
      ) : null }
      { isLoggingIn ? (
        <>
          <div>
            <button 
              name='login'
              type='submit'
              id='login'
            >Login</button>
          </div>
          <div>
            <p>
              New to Swinemeeper? 
              <button onClick={() => toggleLoginState(false)}>Click here to sign up!</button>
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <button 
              name='signup'
              type='submit'
              id='signup'
            >Sign up</button>
          </div>
          <div>
            <p>
              Already have an Account? 
              <button onClick={() => toggleLoginState(true)}>Click here to login!</button>
            </p>
          </div>
        </>
      ) }
      </form>
    </Container>
  )
}