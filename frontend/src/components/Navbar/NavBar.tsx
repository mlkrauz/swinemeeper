import auth from '../../utils/auth'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Navbar() {

  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const loggedIn2: boolean = await auth.loggedIn()

      setLoggedIn(loggedIn2)
    }

    checkIfLoggedIn().catch((error) => console.log(error))
  }, [])

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
          { loggedIn ? (
              <button onClick={() => auth.logout()}>
                <h2 className='header__h2'>LOGOUT</h2>
              </button>
            ) : (
              <Link to={'/login'}>
                <h2 className='header__h2'>LOGIN</h2>
              </Link>
            )
          }
        </li>
      </ul>
      <button className='header__item header__item--right'>OPTIONS</button>
    </header>
  )
}