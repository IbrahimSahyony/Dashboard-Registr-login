import { Link, Outlet } from "react-router-dom";
import "../Dashboard.css"
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { User } from "../../WebSite/Context/Context";

export default function Users(){

  const[users,setUsers]=useState([]);
  const[adad,setAdad]=useState(0);

  const Context = useContext(User);
  const token = Context.auth.token;
  
  useEffect(() => {
   axios.get(`http://127.0.0.1:8000/api/user/show`,{
    headers:{
      Accept:"application/json",
      Authorization:" Bearer " + token
    }
   })
   .then((data) => setUsers(data.data))
  },[adad])


  function ShowUsers(){
   return users.map((user,index) => (
    <tr key={index}>
        <td>{index+1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
        <Link to={`${user.id}`}>
       <FontAwesomeIcon
       icon={faPenToSquare}
       
       style={{ color: "#74afb9",fontSize: "20px", paddingRight: "4px",  cursor:"pointer"}}
     />
     </Link>
        <FontAwesomeIcon
          icon={faTrash}
           onClick={() => deleteUser(user.id)}
          style={{ color: "red", padding:"0px 20px 0px 20px",fontSize: "20px", paddingRight: "4px", cursor:"pointer"}}
        />{" "}
      </td>
      </tr>
    ))
  }
    async function deleteUser(id){
       const res= await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,{
        headers:{
          Authorization:" Bearer " + token ,
        }
       })
       setAdad(adad+1)
      //  setRun((prev) => prev+1);
    }

    // async function Refresh(){
    //   try{
        
    //   const res = await axios.post(`http://127.0.0.1:8000/api/refresh`,null,{
    //     headers:{
    //       Authorization:" Bearer " + token ,
    //     }
    //    })
    //   .then((data) => Context.setAuth((prev) =>{return{...prev , token: data.data.token}}))
    //   console.log(Context.auth)
      

    //   }catch(err){
    //     console.log(err)
    //   }
    // }
  
return(
    <div className="users-container">
    <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {ShowUsers()}
        </tbody>
      </table>
     {/** <button onClick={Refresh}>Refresh Token</button> */}
    
    </div>
)
}