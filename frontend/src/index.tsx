import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'

import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client'
import { cache } from './cache'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter } from 'react-router-dom'

// Graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
})

// Get auth token for apollo context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Create client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
