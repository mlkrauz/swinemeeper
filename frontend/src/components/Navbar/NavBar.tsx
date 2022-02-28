import React from 'react'
import auth from '../../utils/auth'
import './NavBar.css'

export function Navbar() {
  return (
    <header className='header'>
      <h3 className='header__item header__item--left'>
        <a href='#'><span>🠔</span>PORTFOLIO</a>
      </h3>
      <ul className='header__item header__item--center header__ul'>
        <li className='header__li'>
          <a href='/'>
            <h2 className='header__h2'>SWINEMEEPER</h2>
          </a>
        </li>
        <li className='header__li'>
          <a href='/'>
            <h2 className='header__h2'>LEADERBOARDS</h2>
          </a>
        </li>
        <li className='header__li'>
          <a href='/'>
            <h2 className='header__h2'>PERSONAL STATS</h2>
          </a>
        </li>
        <li className='header__li'>
          <a href='/'>
            <h2 className='header__h2'>LOGIN</h2>
          </a>
        </li>
      </ul>
      <button className='header__item header__item--right'>OPTIONS</button>
    </header>
  )
}