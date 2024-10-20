import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/Context";
import Loading from "../../../Components/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  const [loading, setLosding] = useState();
  
  const cookie = new Cookies();
  
  const getToken = cookie.get("Bearer")

  const Context = useContext(User);
  const token = Context.auth.token;

  useEffect(() => {
    async function Refresh() {
      try {
        
         await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: " Bearer " + getToken ,
            },
          })
          .then((data) =>{
            cookie.set('Bearer' , data.data.token)
            Context.setAuth((prev) => {
              return { userDetails:data.data.user , token: data.data.token };
            })
          }
          );
        console.log(Context.auth);
      } catch (err) {
        console.log(err);
      }
    }

    !token ? Refresh() : setLosding(false);
  }, []);

  return (loading ? <Loading /> : <Outlet />)
}
