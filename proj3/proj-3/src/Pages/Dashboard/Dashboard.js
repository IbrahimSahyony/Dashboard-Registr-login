import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Topbar from "../../Components/Tobbar";

import './Dashboard.css'

export default function Dashboard(){
    return(
        <div>
        <Topbar/>
        <div className="Dash-container">
        <Sidebar/>
        <Outlet/>
        </div>
        </div>
    )
}