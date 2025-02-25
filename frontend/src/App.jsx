import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Buy from './components/Buy'
import Courses from './components/Courses'
import Home from './components/Home'
import Login from './components/Login'
import Purchase from './components/Purchase'
import Signup from './components/Signup'

const App = () => {
  return (
    
    <div>
      <Routes>
      <Route path='/' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* other Routes */}
         <Route path='/courses' element={<Courses/>}/>
          <Route path='/buy' element={<Buy/>}/> 
          <Route path ='/purchase' element={<Purchase/>}/>  



      </Routes>
    </div>
  )
}

export default App