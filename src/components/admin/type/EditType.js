import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FadeLoader } from "react-spinners";
export default function EditType() {
    const [name, setName] = useState("");
    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState({})
    const [url, setUrl] = useState("")
    const [previousImage, setPreviousImage] = useState("")
    const [load, setLoad] = useState(false)
    const [Type, setType] = useState([])
    const param = useParams();
    const id = param.id
    const nav = useNavigate()
    useEffect(
        () => {
            getData()
        }, []
    )
    const getData = async () => {
        setLoad(true)
        let docRef = doc(db, "Type", id)
        let data = await getDoc(docRef)
        if (data.exists()) {
            let finalData = data.data()
            setName(finalData.TypeName)
            setPreviousImage(finalData.image)
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
        const que = query(collection(db, "Type"), orderBy("TypeName", "asc"))
        onSnapshot(que, doc => {
            setType(doc.docs.map((el, index) => {
                return { id: el.id, data: el.data() }
            }))
        })
    }, [])
    const changeFile = (e) => {
        setFileName(e.target.value)
        setFile(e.target.files[0])
    }
    const handleForm = (e) => {
        e.preventDefault()
        setLoad(true)
        if (!!fileName) {
            const storageRef = ref(storage, 'type_images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log(snapshot);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    toast.error("Something Went Wrong", error.code)
                    
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setUrl(downloadURL)
                    });
                }
            );
            setTimeout(
                ()=>{
                    setLoad(false)
                },2000
            )
        } 
        else {
            saveData()
            setTimeout(
                ()=>{
                    setLoad(false)
                },2000
            )
        }
    }
    const saveData = async () => {
        try {
            let data = {
                TypeName: name,
                status: true,
                createdAt: Timestamp.now()
            }
            if (!!url) {
                data.image = url
            }
            const docRef = doc(db, "Type", id)
            await updateDoc(docRef, data)
            toast.success("Data updated successfully")
            nav("/admin/managetype")
        }
        catch (err) {
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        if (!!url) {
            saveData()
        }
    }, [url])
    return (
        <>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Edit Type</h1>
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
                                        Edit Type
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <FadeLoader color="green" size={100} cssOverride={{display:"block",margin:"0 auto"}} loading={load} />
            <div className={load == true ? "d-none" : "container my-5"}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-3" style={{ boxShadow: "0px 0px 10px #88FFB4" }}>
                            <form onSubmit={handleForm} className="php-email-form">
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label> Name</label>
                                    </div>
                                    <div className="col-md">
                                        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />

                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label> Thumbnail</label>
                                    </div>
                                    <div className="col-md">
                                        <input className="form-control" value={fileName} onChange={changeFile} type="file" />
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