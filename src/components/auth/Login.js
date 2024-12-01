import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../Firebase"
import { getDoc, doc } from "firebase/firestore"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [load, setLoad] = useState(false)
    const a = useNavigate()
    const signUp = () => {
        a('/signup')
    }
    const submit = (e) => {
        e.preventDefault();
        setLoad(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(
                async (userCredentials) => {
                    console.log(userCredentials);

                    let userId = userCredentials.user.uid
                    let docRef = doc(db, "Users", userId)
                    let data = await getDoc(docRef)
                    if (data.exists()) {
                        let userData = data.data()
                        sessionStorage.setItem("name", userData.name)
                        sessionStorage.setItem("userId", userId)
                        sessionStorage.setItem("userType", userData.userType)
                        if (userData.userType == 1) {
                            a("/admin")
                            toast.success("Welcome back Admin ")
                        }
                        else {
                            a("/")
                            toast.success("Welcome back User ")
                        }
                    }
                    else {
                        setTimeout(() => {
                            setLoad(false)
                        }, 1000)
                    }

                }
            )
            .catch(
                (err) => {
                    toast.error(err.message)
                    setTimeout(() => {
                        setLoad(false)
                    }, 1000)
                }
            )
    }
    let obj = {
        display: "block",
        margin: "0 auto",

    }
    return (
        <>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Sign In</h1>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <nav
                                aria-label="breadcrumb"
                                className="breadcrumb-box d-flex justify-content-lg-end"
                            >
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Login
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {load == true ?
                <FadeLoader color="green" size={100} cssOverride={obj} loading={load} />
                :
                <>
                    <section className="contact">
                        <div className="container">
                            <div className="row"><div className="col-sm-12 section-t8" >
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-6 col-sm-9 p-3" style={{ boxShadow: "2px 2px 4px 4px #88FFB4" }}>
                                        <form onSubmit={submit} className="php-email-form">
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-11 mb-3 mt-3">
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control form-control-lg form-control-a"
                                                            placeholder="Your Email"
                                                            required=""
                                                            value={email}
                                                            onChange={(e) => { setEmail(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-11 mb-3">
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className="form-control form-control-lg form-control-a"
                                                            placeholder="Password"
                                                            required=""
                                                            value={password}
                                                            onChange={(e) => { setPassword(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    <button type="submit" className="btn btn-a" style={{ borderRadius: "10px" }}>
                                                        Login
                                                    </button>
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    <button onClick={signUp} type="button" className="btn btn-a" style={{ borderRadius: "10px" }}>
                                                        SignUp
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                </>

            }
        </>
    )
}