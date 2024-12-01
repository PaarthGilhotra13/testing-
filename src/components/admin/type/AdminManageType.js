import { collection, deleteDoc, doc, onSnapshot, query,updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../../../Firebase"
import { toast } from "react-toastify"
import moment from "moment"
import { FadeLoader } from "react-spinners"
export default function ManageType() {
    const [type, setType] = useState([])
    const [load, setLoad] = useState(false)
    useEffect(
        () => {
            setLoad(true)
            const qry = query(collection(db,"Type"))
            onSnapshot(qry, doc=>{
                setType(doc.docs?.map(
                    (el, index) => {
                        return { id: el.id, data: el.data() }
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
    const deleteData = async (id) => {
        setLoad(true)
        if (window.confirm("Do you really want to delete the type")) {
            try {
                await deleteDoc(doc(db, "Type", id))
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
    const getDate = (date) => {
        let date1 = date.toDate().toString()
        let newDate = moment(date1).format("Do MMM, YYYY")
        return newDate
    }
    const updateStatus = async (id, status) => {
        try {
            const docRef = doc(db, "Property", id)
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
                                <h1 className="title-single">Manage Type</h1>
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
                                        Manage Type
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
                            <td>Name</td>
                            <td>Thumbnail</td>
                            <td>Status</td>
                            <td>Created At</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {type?.map((el, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el?.data?.TypeName}</td>
                                <td><img style={{ height: "100px", width: "100px" }} src={el?.data?.image} alt="error 404"/></td>
                                <td>{el?.data?.status == true ? "Enable" : "Disable"}</td>
                                <td>{getDate(el?.data?.createdAt)}</td>
                                <td>
                                    <Link className="btn btn-success" to={'/admin/edittype/'+el.id}>
                                        <i className="bi bi-pen" />
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" >
                                        <i className="bi bi-trash" onClick={() => { deleteData(el.id) }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}
