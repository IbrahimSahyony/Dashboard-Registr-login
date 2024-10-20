import { useContext, useState } from "react";
import "../../../style.css";
import axios from "axios";
import Header from "../../../Components/Header";
import { User } from "../Context/Context";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Login() {


 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Errstatus,SetErrstatus]=useState()
  const [Errmsg,SetErrMsg]=useState()
  const [accept,setAccept]=useState(false)

  const UserNow = useContext(User)
  const location =useLocation();
  const nav=useNavigate();
  const cookie = new Cookies();

  

 async function submit(e) {
    e.preventDefault();
    setAccept(true);
    
    
    try{
 
       let res = await axios.post(`http://127.0.0.1:8000/api/login`,{
            
            email:email,
            password:password,

          }

    
        )
        if(res.status===200) {
                window.localStorage.setItem("email",email)
                 //window.location.pathname="/"
                 nav('/')        
            }
        
            const token = res.data.data.token
            const userDetails=res.data.data.user
            cookie.set("Bearer" , token);
            
            UserNow.setAuth({token, userDetails})
            console.log(UserNow.auth)
        
        
      
    }catch(err){ {
        SetErrstatus(err.response.status)
        SetErrMsg(err.response.data.message)
        
    }}
    console.log(window.localStorage.getItem('email'))
  }

  return (
    <div>
    <Header/>
    <div className="container">
     
      <div className="parent">
      
        <form onSubmit={submit}>

          

          <label htmlFor="email">email</label>
          <input
            placeholder="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          

          <label htmlFor="pass">password</label>
          <input
            placeholder="password"
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {Errstatus===401 && <p className="err">{Errmsg}</p>}

          
        </form>
        <button className="buttom" type="submit" onClick={submit}>
          Login
        </button>
      </div>
    </div>
    </div>
  );
}
