import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire(
                    'Logged out!',
                    'You have been successfully logged out.',
                    'success'
                )
                navigate("/login");
            }
        });
    };

    const isLoggedIn = localStorage.access_token ? true : false;

    return (
        <>
            <div className="navbar bg-base-100 shadow">
                <div className="navbar-start">
                    <Link to="/client" className="btn btn-ghost text-xl"><b>HOME</b></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/client" className={location.pathname === '/client' ? 'text-blue-500' : ''}><b>Client</b></Link></li>
                        <li><Link to="/room" className={location.pathname === '/room' ? 'text-blue-500' : ''}><b>Room</b></Link></li>
                        <li><Link to="/usage" className={location.pathname === '/usage' ? 'text-blue-500' : ''}><b>Room Usage</b></Link></li>
                    </ul>
                </div>
                <div className="navbar-end gap-5">
                    {isLoggedIn ? null : <Link to="/login" className="btn btn-ghost text-l"><b>Login</b></Link>}
    
                    {isLoggedIn ? <button onClick={logoutHandler} className="btn btn-ghost text-l"><b>Logout</b></button> : null}
                </div>
            </div>
        </>
    )
}
