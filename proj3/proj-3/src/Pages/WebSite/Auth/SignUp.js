import { useContext, useState } from "react";
import "../../../style.css";
import axios from "axios";
import Header from "../../../Components/Header";
import { User } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Rigester() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const[accept,setAccept]=useState(false)
  
  const[EmailErr,SetEmailErr]=useState()
  const[ErrMsg,SetErrMsg]=useState()


  const UserNow = useContext(User)
  const nav=useNavigate();
  const cookie = new Cookies();

 async function submit(e) {
    e.preventDefault();
    setAccept(true)

    try{
 
       let res = await axios.post(`http://127.0.0.1:8000/api/register`,{
            name: name,
            email:email,
            password:password,
            password_confirmation:passwordr
          });
          
          if(res.status===200){
            
            // window.location.pathname="/" 
            nav('/')
          } 
          

            const token = res.data.data.token
            const userDetails=res.data.data.user
            cookie.set("Bearer" , token);
            
            UserNow.setAuth({token, userDetails})
            console.log(UserNow.auth)

    }catch(err){if(err.response.status===422) {
        SetEmailErr(true);
        SetErrMsg(err.response.data.message)
    }}

  }

  return (
    <div>
    <Header/>
    <div className="container">
      <div className="parent">
      
        <form onSubmit={submit}>

          <label htmlFor="name">Name</label>
          <input
            placeholder="Name..."
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {name === ""&&accept&& <p className="err">Enter your Name</p>}

          <label htmlFor="email">email</label>
          <input
            placeholder="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          {accept&&EmailErr&&<p className="err">{ErrMsg}</p>}

          <label htmlFor="pass">password</label>
          <input
            placeholder="password"
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {password.length<8 && accept && <p className="err">password must be longer</p>}

          <label htmlFor="passr">repeatpassword</label>
          <input
            placeholder="repeatpassword"
            type="password"
            id="passr"
            value={passwordr}
            onChange={(e) => setPasswordr(e.target.value)}
          ></input>
           { accept && password!==passwordr && <p className="err">password dont macthed</p> }

        </form>
        <button className="buttom" type="submit" onClick={submit}>
          Rejister
        </button>
      </div>
    </div>
    </div>
  );
}
