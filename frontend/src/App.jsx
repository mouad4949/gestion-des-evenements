import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import {Router} from "./router/index";


import '../src/index.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={Router}/>
    </>
  )
}

export default App
