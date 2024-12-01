import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Master from './components/layouts/Master';
import About from './components/pages/About';
import Property from './components/pages/Property';
import Type from './components/pages/Type';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminMaster from './components/admin/layouts/AdminMaster';
import AdminHeader from './components/admin/layouts/AdminHeader';
import AddCity from './components/admin/city/AdminAddCity';
import ManageCity from './components/admin/city/AdminManageCity';
import AddProp from './components/admin/property/AdminAddProp';
import ManageProp from './components/admin/property/AdminManageProp';
import AddType from './components/admin/type/AdminAddType';
import AddEnquiry from './components/pages/AddEnquiry';
import EditCity from './components/admin/city/EditCity';
import EditType from './components/admin/type/EditType';
import EditProp from './components/admin/property/EditProperty';
import ManageType from './components/admin/type/AdminManageType';
import City from './components/pages/City';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Master />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/type' element={<Type />} />
            <Route path='/property' element={<Property />} />
            <Route path='/login' element={<Login />} />
            <Route path='/city' element={<City />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/addenquiry' element={<AddEnquiry />} />

          </Route>
          <Route path='/admin' element={<AdminMaster />}>
            <Route path='/admin' element={<AdminHeader />} />
            <Route path='/admin/addcity' element={<AddCity />} />
            <Route path='/admin/managecity' element={<ManageCity />} />
            <Route path='/admin/editcity/:id' element={<EditCity />} />
            <Route path='/admin/addprop' element={<AddProp />} />
            <Route path='/admin/manageprop' element={<ManageProp />} />
            <Route path='/admin/editprop/:id' element={<EditProp />} />
            <Route path='/admin/addtype' element={<AddType />} />
            <Route path='/admin/managetype' element={<ManageType />} />
            <Route path='/admin/edittype/:id' element={<EditType />} />

          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
    </>
  );
}

export default App;
