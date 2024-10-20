import { Link } from 'react-router-dom'
import '../Pages/Dashboard/Dashboard.css'
export default function Topbar(){
    return(
        <div className='d-flex-Topbar'>
        <h2>Store</h2>
        <Link className="buttom" to="/" >Go to web site</Link>
        </div>
    )
}