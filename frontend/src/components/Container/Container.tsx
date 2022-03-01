import React from 'react'
import './Container.css'

type props = {
  title?: string
  largeTitle?: boolean
  children?: React.ReactNode
}

export const Container: React.FC = ({ title, largeTitle, children }: props) => {
  return (
    <div className={ title ? 'container container--hasTitle' : 'container container--noTitle'}>
      { title ? 
      (
        largeTitle ? 
        <h1 className='container__title container__title--h1'>
          { title }
        </h1>
        : 
        <h2 className='container__title'>
          { title }
        </h2> 
      ) : null}
      { children }
    </div>
  )
}