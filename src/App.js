import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './auth/register';
import Contacts from './contacts/contacts';
import Login from './auth/signin';

const App = () => {
  return (  
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contacts' element={<Contacts />} />
      {/* Add more routes here */}
    </Routes>
  );
}

export default App;
