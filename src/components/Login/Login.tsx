import React, {useState} from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("test")
  const [password, setPassword] = useState("psw")
  return (
    <div>
        test
      <input type="text" value={email}/>
      <input type="text" value={password}/>
      <button onChange={()=> {}}>Login</button>
    </div>
  )
}

export default Login;