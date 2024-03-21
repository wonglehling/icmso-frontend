import { useState } from "react";
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({
    email:'',
    password:'',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = data
    try {
      const {data} = await axios.post('/login', {email, password})
    } catch (error) {
      
    }
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
