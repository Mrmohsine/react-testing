import React from 'react'
import { Routes, Route } from "react-router-dom";
import Counter from './Components/Counter'
import Person from './Components/Person';

function App() {


  return (
    <>
    <Routes>
      <Route path="/counter" element={<Counter />} />
      <Route path="/person" element={<Person />} />
    </Routes>
      
    </>
  )
}

export default App
