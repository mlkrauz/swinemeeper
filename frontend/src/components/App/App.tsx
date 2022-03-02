import React from 'react';
import './App.css';
import { Navbar } from '../Navbar/NavBar';
import { MainContainer } from '../BackgroundContainer/MainContainer';
import { Route, Routes } from 'react-router-dom'
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Leaderboards } from '../../pages/Leaderboards';
import { User } from '../../pages/User';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainContainer />}>
          <Route path='' element={<Home />} />
          <Route path='leaderboards' element={<Leaderboards />} />
          <Route path='user' element={<User />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
