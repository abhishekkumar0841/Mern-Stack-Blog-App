import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import NotFoundPage from './Pages/NotFoundPage'
import Contact from './Pages/Contact'
import MyBlog from './Pages/MyBlog'
import About from './Pages/About'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/myblogs' element={<MyBlog/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/about' element={<About/>} />


      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
  )
}

export default App