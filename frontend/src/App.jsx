import React from "react";
import ListStudent from "./components/students/ListStudent";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import CreateStudent from "./components/students/CreateStudent";
import Registration from "./components/auth/Registration/Registration";
import Login from "./components/auth/Login/Login";


const App = () => {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListStudent /> } />
          <Route path="/create-student" element={<CreateStudent /> } /> 
          <Route path="/registration" element={<Registration />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App;