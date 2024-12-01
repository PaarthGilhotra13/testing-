import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore"
import { db } from "../../../Firebase"
import { toast } from "react-toastify"
import { FadeLoader } from "react-spinners"
export default function EditCity() {
    const [cityName, setCityName] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState([])
    const [load, setLoad] = useState(false)

    const param = useParams()
    const id = param.id
    const nav = useNavigate()
    useEffect(
        () => {
            getData()
        }, []
    )
    const getData = async () => {
        setLoad(true)
        let docRef = doc(db, "City", id)
        let data = await getDoc(docRef)
        if (data.exists()) {
            let finalData = data.data()
            setCityName(finalData.CityName)
            setState(finalData.State)
            setTimeout(
                ()=>{
                    setLoad(false)
                },1000
            )
        }
        else {
            toast.error("No data found")
            setTimeout(
                ()=>{
                    setLoad(false)
                },1000
            )
        }
    }
    useEffect(
        () => {
            const qry =query(collection(db, "City"), orderBy("CityName", "asc"))
            onSnapshot(qry, doc => {
                setCity(doc.docs.map(
                    (el, index) => {
                        return { id: el.id, data: el.data() }
                    }
                ))
            })
        }, []
    )
    const editCity = (e) => {
        e.preventDefault()
        setLoad(true)
        if(!!cityName){
            saveData()
            setTimeout(
                ()=>{
                    setLoad(false)
                },1000
            )
        }
        else{
            toast.error("No data Found")
            setTimeout(
                ()=>{
                    setLoad(false)
                },1000
            )
        }
    }
    const saveData = async () => {
        try {
            let data = {
                CityName: cityName,
                State: state,
                status: true,
                createdAt: Timestamp.now()
            }
            const docRef = doc(db, "City", id)
            await updateDoc(docRef, data)
            toast.success("Data Updated Successfully")
            nav("/admin/managecity")
        }
        catch (err) {
            toast.error("Something Went Wrong")
        }
    }
    return (
        <>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Edit City</h1>
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
                                        Edit City
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
                            <form onSubmit={editCity} className="php-email-form">
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