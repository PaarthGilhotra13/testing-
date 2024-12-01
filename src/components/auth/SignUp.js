import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "../../Firebase"
import { toast } from "react-toastify"
import { setDoc, Timestamp, doc } from "firebase/firestore"
import { FadeLoader } from "react-spinners"
export default function SignUp() {
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [load, setLoad] = useState(false)
    const a = useNavigate()
    const signUp = (e) => {
        e.preventDefault();
        setLoad(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(
                (userCredential) => {
                    // console.log(userCredential);
                    let userId = userCredential.user.uid
                    savData(userId)
                }
            )
            .catch(
                (error) => {
                    toast.error(error.message)
                    setLoad(false)
                }
            )
        const savData = async (userId) => {
            try {
                let data = {
                    name: name,
                    contact: contact,
                    email: email,
                    password: password,
                    address: address,
                    userId: userId,
                    userType: 2,
                    status: true,
                    createdAt: Timestamp.now()
                }
                // console.log(data);
                await setDoc(doc(db, "Users", userId), data)
                toast.success("Register Successfully")
                setName("")
                setContact("")
                setEmail("")
                setPassword("")
                setAddress("")
                a("/")
            }
            catch (err) {
                toast.error("Something Went Wrong")
                setLoad(false)
            }
        }
    }
    const googleSignup = () => {
        let googleProvider = new GoogleAuthProvider()
        signInWithPopup(auth, googleProvider)
            .then(
                (userCredential) => {
                    toast.success("User registered successfully!!")
                    a('/')
                }
            )
            .catch(
                (err) => {
                    toast.error(err.message)
                    setLoad(false)
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
                                <h1 className="title-single">Register Yourself</h1>
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
                                        Sign Up
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
            <section className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 section-t8">
                            <div className="row d-flex justify-content-center ">
                                <div className="col-md-6">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-12 col-sm-9 p-3" style={{ boxShadow: "2px 2px 4px 4px #88FFB4" }}>
                                            <form onSubmit={signUp}
                                                className="php-email-form"
                                            >
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                className="form-control form-control-lg form-control-a"
                                                                placeholder="Your Name"
                                                                required=""
                                                                value={name}
                                                                onChange={(e) => { setName(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-group">
                                                            <input
                                                                name="contact"
                                                                type=""
                                                                className="form-control form-control-lg form-control-a"
                                                                placeholder="Contact Number"
                                                                required=""
                                                                value={contact}
                                                                onChange={(e) => { setContact(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-3">
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                className="form-control form-control-lg form-control-a"
                                                                placeholder="Email"
                                                                required=""
                                                                value={email}
                                                                onChange={(e) => { setEmail(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-3">
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
                                                    <div className="col-md-12 mb-3">
                                                        <textarea
                                                            name="Address"
                                                            className="form-control"
                                                            cols={30}
                                                            rows={6}
                                                            placeholder="Address"
                                                            required=""
                                                            defaultValue={""}
                                                            value={address}
                                                            onChange={(e) => { setAddress(e.target.value) }}
                                                        />
                                                    </div>
                                                    <div className="col-md-12 text-center d-grid gap-2 mb-3" >
                                                        <button type="submit" className="btn btn-a " style={{ borderRadius: "10px" }}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                    <div className="col-md-12 text-center d-grid gap-2" >
                                                        <button type="submit" className="btn btn-a " onClick={googleSignup} style={{ borderRadius: "10px", backgroundColor: "#196DFF" }}>
                                                            <img src="/assets/img/Google_logo.png" width="30px" height="30px" /> Sign Up With Google
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="row d-flex justify-content-end">
                                        <div className="col-md-10 col-sm-12">
                                            <img src="/assets/img/side_design.png" className="img-fluid" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
}
        </>
    )
}