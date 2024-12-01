import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
import { db, storage } from "../../../Firebase"
import { toast } from "react-toastify"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { FadeLoader } from "react-spinners"
export default function EditProp(){
    const [typeName, setTypeName] = useState("")
    const [propName, setPropName] = useState("")
    const [address, setAddress] = useState("")
    const [cityName, setCityName] = useState("")
    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState({})
    const [url, setUrl] = useState("")
    const [cost, setCost] = useState("")
    const [sellerDetails, setSellerDetails] = useState("")
    const [desc, setDesc] = useState("")
    const[previousImage,setPreviousImage]=useState("")
    const [type, setType] = useState([])
    const [city, setCity] = useState([])
    const[load,setLoad]=useState(false)

    const param=useParams();
    const id=param.id
    const nav=useNavigate()
    useEffect(() => {
        getData()
    },[]
)
const getData = async () => {
    setLoad(true)
    let docRef = doc(db, "Property", id)
    let data = await getDoc(docRef)
    if (data.exists()) {
        let finalData = data.data()
        setTypeName(finalData.TypeName)
        setPropName(finalData.PropertyName)
        setAddress(finalData.Address)
        setCityName(finalData.CityName)
        setSellerDetails(finalData.SellerDetails)
        setDesc(finalData.Description)
        setCost(finalData.Cost)
        setPreviousImage(finalData.Image)
        setTimeout(
            ()=>{
                setLoad(false)
            },1000
        )

    } else {
        toast.error("No data found")
        setTimeout(
            ()=>{
                setLoad(false)
            },1000
        )
    }
}
useEffect(() => {
    const que = query(collection(db, "Property"), orderBy("Address", "asc"))
    onSnapshot(que, doc => {
        setType(doc.docs.map((el, index) => {
            return { id: el.id, data: el.data() }
        }))
    })
}, [])
useEffect(
    () => {
        const qry = query(collection(db, "City"), orderBy("CityName", "asc"))
        onSnapshot(qry, doc => {
            setCity(doc.docs.map((el, index) => {
                return (
                    { id: el.id, data: el.data() }
                )
            }))
        })
    }, []
)
useEffect(
        () => {
            const qry = query(collection(db, "Type"), orderBy("TypeName", "asc"))
            onSnapshot(qry, doc => {
                setType(doc.docs.map((el, index) => {
                    return { id: el.id, data: el.data() }
                }))
            })
        }, []
    )
    const changeFile = (e) => {
        setFileName(e.target.value)
        setFile(e.target.files[0])
    }
    const editProp=(e)=>{
        e.preventDefault()
        setLoad(true)
        if (!!fileName) {
            const storageRef = ref(storage, 'prop_images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log(snapshot);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    toast.error("Something went wrong", error.code)
                    setLoad(false)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setUrl(downloadURL)
                    });
                }
            );
          
        } 
        else {
            saveData()
           
        }
    }
    const saveData = async () => {
        try {
            let data = {
                TypeName: typeName,
                CityName: cityName,
                PropertyName: propName,
                SellerDetails: sellerDetails,
                Cost: cost,
                Description: desc,
                Address: address,
                status: true,
                createdAt: Timestamp.now()
            }
            if (!!url) {
                data.image = url
            }
            const docRef = doc(db, "Property", id)
            await updateDoc(docRef, data)
            toast.success("Data updated successfully")
            nav("/admin/manageprop")
        }
        catch (err) {
            toast.error("Something went wrong")
        }
        finally{
            setLoad(false)
        }
    }
    useEffect(() => {
        if (!!url) {
            saveData()
        }
    }, [url])
    return(
        <>
        <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Edit Property</h1>
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
                                        Edit Property
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
                            <form onSubmit={editProp} className="php-email-form">
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>Type Name</label>
                                    </div>
                                    <div className="col-md">
                                        <select className="form-control" value={typeName} onChange={(e) => { setTypeName(e.target.value) }} >
                                            <option value={""} selected disabled>Choose Type</option>
                                            {type?.map((el, index) => (
                                                <option>{el?.data?.TypeName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label> City Name</label>
                                    </div>
                                    <div className="col-md">
                                        <select className="form-control" value={cityName} onChange={(e) => { setCityName(e.target.value) }}>
                                            <option value={""} selected disabled>Choose City</option>
                                            {city?.map((el, index) => (
                                                <option>{el?.data?.CityName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>Property Name</label>
                                    </div>
                                    <div className="col-md">
                                        <input className="form-control" value={propName} onChange={(e) => { setPropName(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label> Address</label>
                                    </div>
                                    <div className="col-md">
                                        <input className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>Image</label>
                                    </div>
                                    <div className="col-md">
                                        <input type="file" className="form-control" value={fileName} onChange={changeFile} />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>Cost</label>
                                    </div>
                                    <div className="col-md">
                                        <input type="text" className="form-control" value={cost} onChange={(e) => { setCost(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>Seller Details</label>
                                    </div>
                                    <div className="col-md">
                                        <input type="text" className="form-control" value={sellerDetails} onChange={(e) => { setSellerDetails(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>Description</label>
                                    </div>
                                    <div className="col-md">
                                        <input className="form-control" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
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