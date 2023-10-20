import React, { useRef } from 'react';
import './DashboardSummary.css';
import userHTTPService from '../../../main/services/userHTTPService';
import { useState } from 'react';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { useEffect } from 'react';
import clientHTTPService from '../../../main/services/clientHTTPService';
import MonthlyRevenueChart from './MonthlyRevenue';

const DashboardSummary = () => {
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const ref = useRef(null);
const ref2 = useRef(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await userHTTPService.getAllUser();
        const clientsResponse = await clientHTTPService.getAllClient();
        const projectsResponse = await projectHTTPService.getAllProject();
        const dataResponse = await projectHTTPService.uploadFile2();
        const dataResponse2 = await projectHTTPService.uploadFile3();
        setUsers(usersResponse.data.users);
        setClients(clientsResponse.data);
        setData(dataResponse.data)
        setProjects(projectsResponse.data);
        console.log(dataResponse2)
        ref.current = dataResponse2?.data?.currentYearTotalAmount
        ref2.current = dataResponse2?.data?.currentYearPendingAmount
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="DashboardSummary">
      {loading?'loading...':
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-1">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{projects.length || 0}</span>
                    </div>
                    <div className="stat-heading">Projets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-2">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{clients.length || 0}</span>
                    </div>
                    <div className="stat-heading">Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-3">
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{0}</span>
                    </div>
                    <div className="stat-heading">Tasks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-4">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{users.length}</span>
                    </div>
                    <div className="stat-heading">Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <div className="mt-xl-5 row align-items-center justify-content-around">
      <MonthlyRevenueChart data={data} />
      <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-4">
                  <i className="fas fa-money"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{ref.current}</span>
                    </div>
                    <div className="stat-heading">Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-4">
                  <i className="fas fa-money"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{ref2.current}</span>
                    </div>
                    <div className="stat-heading">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

DashboardSummary.propTypes = {};

DashboardSummary.defaultProps = {};

export default DashboardSummary;
