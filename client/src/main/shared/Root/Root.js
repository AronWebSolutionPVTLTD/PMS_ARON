import React, { useState } from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from '../Login/Login';
import ActivationPage from './Activation';


const Root = () => {

  const [connected, setConnected] = useState(false);

  const handleClick = num => {
    setConnected(num)
  };

  return (
    <div>
      <Router>
      <Route exact path="/activation/:activation_token" component={ActivationPage} />

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
          </div> :<> <Route exact path="/" render={() => <Login handleClick={handleClick} />} />
           </>}
      </Router>
    </div>
  );

}



Root.propTypes = {};

Root.defaultProps = {};

export default Root;
