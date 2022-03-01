import React, { useState } from 'react'
import { Container } from '../components/Container/Container'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../operations/mutations/LOGIN/LOGIN'

export const Login: React.FC = () => {
  
  interface formData {
    username: string
    email: string
    password: string
    passwordConfirm: string
  }

  const [formState, setFormState] = useState<formData>({ username: '', email: '', password: '', passwordConfirm: '' })
  const [isLoggingIn, toggleLoginState] = useState<boolean>(true)
  const [login, { error }] = useMutation(LOGIN)
  
  return (
    <Container { ...{ title: isLoggingIn ? 'LOG IN' : 'SIGN UP' } }>
      <form>
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
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='************'
            name='password'
            type='password'
            id='password'
          />
        </div>
        { isLoggingIn ? (
          null
        ) : (
        <div>
          <label htmlFor='passwordConfirm'>Password</label>
          <input
            placeholder='************'
            name='passwordConfirm'
            type='password'
            id='passwordConfirm'
          />
        </div>
        ) }
      </form>
      { isLoggingIn ? (
        <>
          <div>
            <input 
              name='login'
              type='submit'
              id='login'
            >Login</input>
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
            <input 
              name='signup'
              type='submit'
              id='signup'
            >Login</input>
          </div>
          <div>
            <p>
              Already have an Account? 
              <button onClick={() => toggleLoginState(true)}>Click here to login!</button>
            </p>
          </div>
        </>
      ) }
    </Container>
  )
}