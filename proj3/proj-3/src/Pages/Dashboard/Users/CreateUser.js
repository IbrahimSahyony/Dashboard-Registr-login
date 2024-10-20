import { useState } from "react";
import "../../../style.css";
import axios from "axios";

export default function CreateUser() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const [accept,setAccept]=useState(false)
  const[EmailErr,SetEmailErr]=useState()
  const[ErrMsg,SetErrMsg]=useState()



 async function submit(e) {
    e.preventDefault();
    
    setAccept(true);
    let flag =true;
    if(name==='' || password.length<8 || passwordr!==password){
        flag=false
    }
    try{
 if(flag){
       let res = await axios.post(`http://127.0.0.1:8000/api/user/create`,{
            name: name,
            email:email,
            password:password,
            password_confirmation:passwordr
          }).then((t) => {if(t.status===200) {window.location.pathname="Dashboard/Users"}})
        }
    }catch(err){if(err.response.status===422) {
        SetEmailErr(true);
        SetErrMsg(err.response.data.message)
    }}

  }

  return (
    <div>
    <h2>New User</h2>
    <div className="container">
      <div className="parent-create">
      
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
           { accept && password!==passwordr && passwordr==='' && <p className="err">password dont macthed</p>}

        </form>
        <button className="buttom" type="submit" onClick={submit}>
          Rejister
        </button>
      </div>
    </div>
    </div>
  );
}
