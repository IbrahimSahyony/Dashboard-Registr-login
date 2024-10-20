import { Link } from 'react-router-dom'
import '../style.css'
export default function Header(){
    function hundlelogout(){
        window.localStorage.removeItem('email')
        window.location.pathname="/Login"
        console.log(window.localStorage.getItem('email'))
    }
    return( 
    <div className='nav-container'>
    <nav>
    
    <div className='d-flex'>
    <Link to=''  style={{textDecoration:"none", color:"black"}}><h6>Home</h6> </Link>
    <Link  style={{textDecoration:"none", color:"black"}}><h6>About</h6> </Link>
   
   
    </div>
    {
        /**!window.localStorage.getItem("email")? */
    <div className='d-flex'>
    <Link className="buttom" to="/register" >Register</Link>
    <Link className="buttom" to="/Login">Login</Link>
    <Link className="buttom" to="/Dashboard">Dashboard</Link>
    </div>

    // : <div className='d-flex'>
    // <Link className="buttom"  onClick={hundlelogout} >Logout</Link>
    // </div>
    }

   
    
    </nav>
    </div>
    )
}