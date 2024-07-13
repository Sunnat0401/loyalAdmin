import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import HomePages from './Pages/HomePages/HomePages.jsx';
import PageNotFound from './Components/PageNotFound/PageNotFound.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePages />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
