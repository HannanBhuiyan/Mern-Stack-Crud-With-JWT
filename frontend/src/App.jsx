import React from "react";
import ListStudent from "./components/students/ListStudent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"; 
import CreateStudent from "./components/students/CreateStudent";
import Registration from "./components/auth/Registration/Registration";
import Login from "./components/auth/Login/Login";
import { getToken } from "./components/helpers/SessionHelper";
import EditStudent from "./components/students/EditStudent";
import Profile from "./components/profile/Profile";


const App = () => {

  if(getToken()){
    return(
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListStudent /> } />
            <Route path="/create-student" element={<CreateStudent /> } /> 
            <Route path="/edit/:id" element={<EditStudent /> } /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/registration" element={<Navigate to={'/'} replace />} /> 
            <Route path="/login" element={<Navigate to={'/'} />} replace />  
          </Routes> 
        </BrowserRouter>
      </>
    )
  }
  else {
    return(
      <>
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<Navigate to={'/login'} replace /> } />
            <Route path="/registration" element={<Registration />} /> 
            <Route path="/login" element={<Login />} /> 
          </Routes> 
        </BrowserRouter>
      </>
    )
  }
}

export default App;