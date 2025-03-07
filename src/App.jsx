import React from 'react'
import { Routes, Route,Link } from "react-router-dom";
import Counter from './Components/Counter'
import Person from './Components/Person';
import ApiMock from './Components/ApiMock';

function App() {


  return (
    <>
    <div className='text-center'>
      <h1 className='p-3 text-2xl'>My App</h1>
    <div className='flex gap-3 justify-center mb-2'>
      <Link to='/counter'  className='bg-red-400 rounded p-4'>counter</Link>

      <Link to='/person' className='bg-red-400 rounded p-4'>person</Link>

      <Link to='/api' className='bg-red-400 rounded p-4'>api</Link>
    </div>
    
    </div>
    
    <Routes>
      <Route path="/counter" element={<Counter />} />
      <Route path="/person" element={<Person />} />
      <Route path="/api" element={<ApiMock />} />
    </Routes>
      
    </>
  )
}

export default App
