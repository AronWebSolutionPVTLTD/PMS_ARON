import React from 'react';
import { NavLink } from "react-router-dom";
import './Navigation.css';
const Navigation = ({ connected }) => {
 
  return (

    <aside id="left-panel" className="left-panel" style={{ display: (connected ? 'block' : 'none') }}>
      <nav className="navbar navbar-expand-sm navbar-default">

        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink activeClassName="activeLink" to="/dashboard"><i className="menu-icon fa fa-laptop"></i>Dashboard </NavLink>
            </li>
            <li className="menu-item-has-children dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-folder"></i>Projects</a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <NavLink activeClassName="activeLink" to="/projects">List</NavLink>
                </li>
              </ul>
            </li>

            <li>
              {/* <NavLink activeClassName="activeLink" to="/note"><i className="menu-icon fa fa-clipboard-list"></i>Notes </NavLink> */}
            </li> 

            <li>
              <NavLink activeClassName="activeLink" to="/user"><i className="menu-icon fas fa-restroom"></i>Collaborators</NavLink>
            </li>


            <li>
              <NavLink activeClassName="activeLink" to="/client"><i className="menu-icon fa fa-handshake-o"></i>Clients </NavLink>
            </li>

            <li>
              <NavLink activeClassName="activeLink" to="/users"><i className="menu-icon fa fa-user"></i>Users </NavLink>
            </li>

          </ul>
        </div>
      </nav>
    </aside>);


}

export default Navigation;
