import { useEffect, useState } from 'react'
import './App.css'
import AuthTest from './auth/AuthTest'
import APIUtils from './auth/ApiUtils';

function App() {

  useEffect(() => {
    APIUtils.get("validateToken")
      .then((response) => {
          if(!response.data){
            localStorage.removeItem("token");
            localStorage.removeItem('role');
            localStorage.removeItem('name');
          }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem('role');
        localStorage.removeItem('name');
      })
  }, []);

  return (
    <div>
      <AuthTest />
    </div>
  )
}

export default App
