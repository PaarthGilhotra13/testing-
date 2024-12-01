import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../../../Firebase"
import moment from "moment";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
export default function ManageCity() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    useEffect(
        () => {
            setLoad(true)
            const qry = query(collection(db, "City"))
            onSnapshot(qry, doc => {
                setData(doc.docs.map(
                    (el, index) => {
                        return (
                            { id: el.id, data: el.data() }
                        )
                    }
                ))
            })
           
            setTimeout(
                () => {
                    setLoad(false)
                }, 1000
            )
        }, []

    )
    const getDate = (date) => {
        let date1 = date.toDate().toString()
        let newDate = moment(date1).format("Do MMM, YYYY")
        return newDate
    }
    const deleteData = async (id) => {
        setLoad(true)
        if (window.confirm("Do you really want to delete the City")) {
            try {
                await deleteDoc(doc(db, "City", id))
                toast.success("Data Delete Successfully")
                setTimeout(
                    () => {
                        setLoad(false)
                    }, 1000
                )
            }
            catch (err) {
                toast.error("Something Went Wrong")
                setTimeout(
                    () => {
                        setLoad(false)
                    }, 1000
                )
            }
        }
    }
        const updateStatus = async (id, status) => {
            try {
                const docRef = doc(db, "City", id)
                let data = {
                    status: status
                }
                await updateDoc(docRef, data)
                toast.success("Status Updated")
            }
            catch (err) {
                toast.err("Server Error")
            }
        }
    
    return (
        <>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Manage City</h1>
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
                                        Manage City
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <FadeLoader color="green" size={100} cssOverride={{display:"block",margin:"0 auto"}} loading={load} />
            <div className={load==true?"d-none":"container"}>
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <td>S.No</td>
                            <td>City Name</td>
                            <td>State</td>
                            <td>Status</td>
                            <td>Created At</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((el, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el?.data?.CityName}</td>
                                <td>{el?.data?.State}</td>
                                <td>{el?.data?.status == true ? "Enable" : "Disable"}</td>
                                <td>{getDate(el?.data?.createdAt)}</td>
                                <td>
                                   <Link to={'/admin/editcity/'+el.id} className="btn btn-success">
                                        <i className="bi bi-pen"/>
                                   </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => { deleteData(el.id) }}>
                                        <i className="bi bi-trash" />
                                    </button>
                                </td>
                            </tr>
                        )
                        )
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}
