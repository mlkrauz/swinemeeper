import React from 'react'
import './MainContainer.css'

export const MainContainer: React.FC = ({ children }) => {
  return (
    <section className='main'>
      { children }
    </section>
  )
}