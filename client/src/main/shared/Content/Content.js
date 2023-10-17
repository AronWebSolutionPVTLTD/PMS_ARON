import React from 'react';
import { Route, Routes } from "react-router-dom";
import Client from '../../../modules/client/Client/Client';
// import Note from '../../../modules/note/Note/Note';
import Projects from '../../../modules/project/Projects/Projects';
import DashBoard from '../../../modules/shared/DashBoard/DashBoard';
// import Profile from '../../../modules/shared/Profile/Profile';
// import SearchProject from '../../../modules/shared/SearchProject/SearchProject';
import User from '../../../modules/user/User/User';
// import Login from '../Login/Login';
import './Content.css';
const Content = ({ connected }) => (
  <div className="col-md-12" style={{ display: (connected ? 'block' : 'none') }}>

    <Routes>
      <Route path="/dashboard" element={<DashBoard/>} />
     <Route path="/projects" element={<Projects/>} />
      <Route path="/client" element={<Client/>} />
      <Route path="/user" element={<User/>} />
 </Routes>


  </div>
);


export default Content;
