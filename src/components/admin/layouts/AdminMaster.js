import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Footer from "../../layouts/Footer";
import { toast } from "react-toastify";

export default function AdminMaster(){
    let userId=sessionStorage.getItem("userId")
    let userType=sessionStorage.getItem("userType")
    if(!userId || userType!=1){
        setTimeout(
            ()=>{
                toast.error("Please Login")
            },1000
        )
        return <Navigate to="/login"/>
    }
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <Footer/>
        </>
    )
}