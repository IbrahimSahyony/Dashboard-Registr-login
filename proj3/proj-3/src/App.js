import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/WebSite/Home";
import Register from "./Pages/WebSite/Auth/SignUp";
import Login from "./Pages/WebSite/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import UserUpdate from "./Pages/Dashboard/Users/UserUpdate";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import RequireAuth from "./Pages/WebSite/Auth/RequireAuth";
import PersistLogin from "./Pages/WebSite/Auth/persistLogin";

export default function App() {
  return (
    <div>
     <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login/>}/>

        {/**protected routs */}
    
      <Route element={<RequireAuth/>}>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="users" element={<Users/>}/>
          <Route path="CreateUser" element={<CreateUser/>}/>
          <Route  path="users/:id" element={<UserUpdate/>}/>
        </Route>
      </Route>
   
        
       
      </Routes>
    </div>
  );
}
