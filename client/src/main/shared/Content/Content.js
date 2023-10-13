import React from 'react';
import { Route } from "react-router-dom";
import Client from '../../../modules/client/Client/Client';
import Note from '../../../modules/note/Note/Note';
import Projects from '../../../modules/project/Projects/Projects';
import DashBoard from '../../../modules/shared/DashBoard/DashBoard';
import Profile from '../../../modules/shared/Profile/Profile';
import SearchProject from '../../../modules/shared/SearchProject/SearchProject';
import User from '../../../modules/user/User/User';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Content.css';
const Content = ({ connected }) => (
  <div className="col-md-12" style={{ display: (connected ? 'block' : 'none') }}>

    <div>
      <Route exact path="/" component={DashBoard} />
      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/note" component={Note} />
      <Route exact path="/client" component={Client} />
      <Route exact path="/user" component={User} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/result/:input" component={SearchProject} />
    </div>


  </div>
);

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
