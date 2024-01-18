import Navbar from './Navbar'
import DeliveryBar from './DeliveryBar'
import './Register.css'
import { useState } from 'react'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const nav = useNavigate()

  const { user, setUser } = useContext(MyContext)

  const [mail, setMail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")




  function handleRegister() {

    const foundUser = user.find((data) => data.mail === mail);

    if (mail !== '' && username !== '' && password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return;
      }

      if (foundUser) {
        alert("Mail already registered. Please login with another mail");
      } else {
        const registrationData = { mail, username, password };
        setUser([...user, registrationData]);
        alert("You have successfully registered");
        nav("/signin");
      }

    }
  }











  return (
    <>
      <DeliveryBar />
      <Navbar />
      <div className="register-container">
        <div className="register">
          <div className="register-heading">
            <h1>Register</h1>
          </div>
          <div className="email">
            <label> Email :</label>
            <input type='text' placeholder='Enter your mail' value={mail} onChange={(e) => setMail(e.target.value)} />
          </div>
          <div className="username">
            <label> Username :</label>
            <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="password">
            <label >Password :</label>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="confirm-password">
            <label >Confirm Password :</label>
            <input type="password" placeholder='Enter your password to confirm' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button onClick={handleRegister}>Register</button>
          <div className="newuser">
            <p>Already a User ?</p>
            <Link to="/signin">Login</Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register