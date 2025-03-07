import React from 'react'
import { Routes, Route,Link } from "react-router-dom";
import Counter from './Components/Counter'
import Person from './Components/Person';
import Client from './Components/Client';
import Commande from './Components/Commande';

function App() {


  return (
    <>
    <div className='text-center'>
      <h1 className='p-3 text-2xl'>My App</h1>
    <div className='flex gap-3 justify-center mb-2'>
      <Link to='/counter'  className='bg-red-400 rounded p-4'>counter</Link>
      <Link to='/person' className='bg-red-400 rounded p-4'>person</Link>
      <Link to='/client' className='bg-red-400 rounded p-4'>client</Link>
      <Link to='/commande' className='bg-red-400 rounded p-4'>commande</Link>
    </div>
    
    </div>
    
    <Routes>
      <Route path="/counter" element={<Counter />} />
      <Route path="/person" element={<Person />} />
      <Route path="/client" element={<Client />} />
      <Route path="/commande" element={<Commande />} />
    </Routes>
      
    </>
  )
}

export default App
