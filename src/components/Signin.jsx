import Navbar from './Navbar'
import DeliveryBar from './DeliveryBar'
import './Signin.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { MyContext } from '../Context'

const Signin = () => {


  const nav = useNavigate()

  const { user,admin,setIsAdmin,setIsUser,setCurrentAccount} = useContext(MyContext)


  

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = () => {

    const foundUser = user.find((data) => data.mail === mail);

    const loggedUser = user.find((data) => data.mail === mail && data.password === password)
    const loggedAdmin = admin.find((data) => data.mail === mail && data.password === password)


    if(loggedAdmin){
      alert("Admin login Successfull")
      setIsAdmin(true)
      setCurrentAccount([{mail,password}])
      nav("/");
    }


    else if (loggedUser) {
      alert("Login Successfull")
      setCurrentAccount([{mail,password}])
      setIsUser(true)
      nav("/")
    }
    
    else if(!foundUser){
      alert("Entered mail is not registered Please register to continue")
      nav("/register")
    }
    else{
      alert("login failed Incorrect Password!")
    }


  }





  return (
    <>
      <DeliveryBar />
      <Navbar />
      <div className="login-container">
        <div className="login">
          <div className="login-heading">
            <h1>Login</h1>
          </div>
          <div className="login-email">
            <label> Email :</label>
            <input type="text" placeholder='Enter your mail' value={mail} onChange={(e) => setMail(e.target.value)} />
          </div>
          <div className="login-password">
            <label >Password :</label>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
          <div className="newuser">
            <p>Are u a new User ?</p>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default Signin