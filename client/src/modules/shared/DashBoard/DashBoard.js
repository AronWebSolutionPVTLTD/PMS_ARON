import React, { useEffect } from 'react';


//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { useHistory } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';
import ProjectInProgress from '../../../modules/project/ProjectInProgress/ProjectInProgress';
import DashboardSummary from '../../../modules/shared/DashboardSummary/DashboardSummary';
//import faker from 'faker';

//ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 3, 4, 5, 11, 3, 2],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }

  ],
};
export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const DashBoard = () => {
  let history = useHistory()


  useEffect(() => {
    if (localStorage.getItem('connected') == undefined) {
      history.push("/login")
    }
  }, []);
 


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

DashBoard.propTypes = {};

DashBoard.defaultProps = {};

export default DashBoard;
