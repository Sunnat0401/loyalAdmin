import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import HomePages from './Pages/HomePages/HomePages.jsx'
import { Route, Routes } from 'react-router-dom'
import Faq from './Pages/Faq/Faq.jsx'

const App = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePages/>}/>
        <Route path='' element={<Faq/>} />
      </Routes>
 
    </div>
  )
}

export default App
