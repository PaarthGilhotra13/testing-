import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export default function AdminHeader() {
    const a = useNavigate()
    const logout = () => {
        sessionStorage.clear()
        a("/")
        toast.success("Logout Successfully")
    }
    const profile = () => {
        a('/profile')
    }
    return (
        <>
            <>
                {/* End Property Search Section */}&gt;
                {/* ======= Header/Navbar ======= */}
                <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
                    <div className="container">
                        <button
                            className="navbar-toggler collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarDefault"
                            aria-controls="navbarDefault"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                        <Link className="navbar-brand text-brand" to="/admin">
                            Home<span className="color-b">Spaces</span>
                        </Link>
                        <div
                            className="navbar-collapse collapse justify-content-center"
                            id="navbarDefault"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link " to="/admin">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        
                                        className="nav-link "
                                        dropdown-toggle
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        City
                                    </Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item " to="/admin/addcity">
                                            Add
                                        </Link>
                                        <Link className="dropdown-item " to="/admin/managecity">
                                            Manage
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link "
                                        dropdown-toggle
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Type
                                    </Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item " to="/admin/addtype">
                                            Add
                                        </Link>
                                        <Link className="dropdown-item " to="/admin/managetype">
                                            Manage
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        to="/addenquiry"
                                        className="nav-link "
                                        dropdown-toggle
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Property
                                    </Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item " to="/admin/addprop">
                                            Add
                                        </Link>
                                        <Link className="dropdown-item " to="/admin/manageprop">
                                            Manage
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/admin/userbooking">
                                        User Bookings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/admin/enquiry">
                                        Enquiry
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <a
                                onClick={profile}
                                className="btn btn-large btn-b-n fs-5 me-2 "
                            >  Profile
                            </a>
                        <a
                                onClick={logout}
                                className="btn btn-large btn-b-n fs-5 "
                            >  Log Out

                            </a>
                    </div>
                </nav>
                {/* End Header/Navbar */}
            </>
        </>
    )
}