import { Link } from "react-router-dom"
import { useState } from "react"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../../../Firebase"
import { toast } from "react-toastify"
import { FadeLoader } from "react-spinners"
export default function AddCity() {
    const [cityName, setCityName] = useState("")
    const [state, setState] = useState("")
    const[load,setLoad]=useState(false)
    const addCity = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            let data = {
                CityName: cityName,
                State: state,
                status: true,
                createdAt: Timestamp.now()
            }
            await addDoc(collection(db, "City"), data)
            toast.success("Data Added");
            setCityName("")
            setState("")
            setTimeout(
                ()=>{
                    setLoad(false)
                },1000
            )
        }
        catch (err) {
            toast.error(err.message)
            setTimeout(
                ()=>{
                    setLoad(false)
                },1000
            )
        }
    }
    return (
        <>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Add City</h1>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <nav
                                aria-label="breadcrumb"
                                className="breadcrumb-box d-flex justify-content-lg-end"
                            >
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/admin">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Add City
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <FadeLoader color="green" size={100} cssOverride={{display:"block",margin:"0 auto"}} loading={load} />
            <div className={load==true?"d-none":"container my-5"}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-3" style={{ boxShadow: "0px 0px 10px #88FFB4" }}>
                            <form onSubmit={addCity} className="php-email-form">
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>City Name</label>
                                    </div>
                                    <div className="col-md">
                                        <input className="form-control" value={cityName} onChange={(e) => { setCityName(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label> State</label>
                                    </div>
                                    <div className="col-md">
                                        <input className="form-control" value={state} onChange={(e) => { setState(e.target.value) }} />
                                    </div>
                                </div>
                                <button className="btn btn-a my-2 d-block mx-auto">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}