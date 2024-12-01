import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
    const userId =sessionStorage.getItem("userId")
    const a = useNavigate()
    const logout = () => {
        sessionStorage.clear()
        toast.success("Logout Succssfully")
        a("/login")
    }
    return (
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
                    <Link className="navbar-brand text-brand" to="/">
                        Home<span className="color-b">Spaces</span>
                    </Link>
                    <div
                        className="navbar-collapse collapse justify-content-center"
                        id="navbarDefault"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link " to="/" >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/about" >
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/city" >
                                    City
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/type">
                                    Type
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/property">
                                    Property
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    to="/addenquiry"
                                    className="nav-link "
                                >
                                    Add Enquiry
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                    {!userId ?
                            <Link to="/login"
                            type="button"
                            // className="btn btn-b-n btn-large fs-5 p-3 navbar-toggle-box navbar-toggle-box-collapse"
                            className="btn btn-large btn-b-n fs-5 "
                        // data-bs-toggle="collapse"
                        // data-bs-target="#navbarTogglerDemo01"
                        >  Login

                        </Link>
                        :
                        <a
                                onClick={logout}
                                className="btn btn-large btn-b-n fs-5 "
                            >  Log Out

                            </a>
                    }
                    </div>
                </div>
            </nav>
            {/* End Header/Navbar */}
        </>


    )
}