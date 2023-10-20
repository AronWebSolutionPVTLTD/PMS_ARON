import React, { useEffect, useState } from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Login from '../Login/Login';
import ActivationPage from './Activation';
import { NotFound } from './NotFound';



const Root = () => {

  const [connected, setConnected] = useState(false);

  const handleClick = num => {
    setConnected(num)
  };





  return (
    <div>
      <Router>
        <Routes>
      <Route path="/activation/:activation_token" element={<ActivationPage/>} />
      <Route path="*" element={<NotFound/>} />
      </Routes>
      {connected === true ?
          <div>
            <Navigation connected={connected} />
            <Header connected={connected} handleClick={handleClick} />


            <div id="right-panel" className="right-panel">
              <div className="content">

                <div className="animated fadeIn">
                  <div className="row">

                    <Content connected={connected} />

                  </div>
                </div>
              </div>

              <div className="clearfix"></div>
            </div>
          </div> :<Routes> <Route  path="/" element={<Login handleClick={handleClick} />} />
           </Routes>}
      </Router>
    </div>
  );

}



export default Root;
