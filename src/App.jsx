import React from 'react'
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import HomePages from './Pages/HomePages/HomePages.jsx'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePages/>}/>
      </Routes>
 
    </div>
  )
}

export default App
