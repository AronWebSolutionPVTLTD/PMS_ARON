import React, { useEffect } from 'react';
import ProjectInProgress from '../../../modules/project/ProjectInProgress/ProjectInProgress';
import DashboardSummary from '../../../modules/shared/DashboardSummary/DashboardSummary';


const DashBoard = () => {
  return (

    <div className="col-md-12">
        <DashboardSummary />
      <div className="orders">
        <div className="row">
          <div className="col-lg-12">
           
            <div className="row">
              <ProjectInProgress />
            </div>
          </div>
        </div>  
      </div>
    </div>

  )
};

export default DashBoard;
