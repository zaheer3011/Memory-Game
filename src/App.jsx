import React from 'react'
import Gaming from './Components/Gaming'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <ToastContainer position='top-right' limit={3000}/>
      <h1>Memory Game</h1>
      <Gaming/>
    </div>
  )
}

export default App
