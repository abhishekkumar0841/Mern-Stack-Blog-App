import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const HomeLayout = ({children}) => {
  return (
    <div className='mx-auto w-full max-w-[1540px] min-h-[100vh] bg-green-300'>
        <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}

export default HomeLayout
