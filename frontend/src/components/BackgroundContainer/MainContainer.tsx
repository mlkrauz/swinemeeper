import React from 'react'
import './MainContainer.css'
import { Outlet } from 'react-router'

export const MainContainer: React.FC = ({ children }) => {
  return (
    <section className='main'>
      { children }
      <Outlet />
    </section>
  )
}