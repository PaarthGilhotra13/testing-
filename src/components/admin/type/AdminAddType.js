import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FadeLoader } from "react-spinners";

export default function AddType() {
    const [name, setName] = useState("");
    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState({})
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState("")
    const[load,setLoad]=useState(false)
    const changeFile = (e) => {
        setFileName(e.target.value)
        setFile(e.target.files[0])
    }
    const addtype = (e) => {
        e.preventDefault()
        setLoad(true)
        if (!fileName) {
            toast.error("Please upload image")
            return;
        }
        const storageRef = ref(storage, 'type_images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                toast.error(error.message)

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)
                });
            }
        );
    }
    const saveData = async () => {
        try {
            let data = {
                TypeName: name,
                image: url,
                status: true,
                createdAt: Timestamp.now()
            }
            
            await addDoc(collection(db, "Type"), data)
            toast.success("Data added")
            setName("")
            setFileName("");
            setTimeout(() => {
                setLoad(false)
            }, 1000)
           
        }
        catch (err) {
            toast.error("Something went wrong")
            setTimeout(() => {
                setLoad(false)
            }, 1000)
        }

    }

    useEffect(() => {
        if (!!url) {
            saveData();
        }
    },[url])
    
    return (
        <>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Add Type</h1>
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
                                        Add Type
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
                            <form onSubmit={addtype} className="php-email-form">
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