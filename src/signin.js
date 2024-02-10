import React, { useState } from 'react';
import './App.css';
import { app } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  let auth = getAuth();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleInputs = (event) => {
    let inputs = {[event.target.name]: event.target.value}

    setData({...data, ...inputs})
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
        window.location.href = '/contacts';
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className='App'>
      <input
        className="input-field"
        type="email"
        name='email'
        placeholder='email'
        onChange={handleInputs}
      />
      <input
        className="input-field"
        type="password"
        name='password'
        placeholder='password'
        onChange={handleInputs}
      />
      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login;
