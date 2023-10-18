import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import CurrentUser from '../../../main/config/user';
import userMessage from '../../../main/messages/userMessage';
import userHTTPService from '../../../main/services/userHTTPService';

import './User.css';
import AddUser from '../AddUser/AddUser_ofc';


const deleteUser = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
}

const UserOfc = () => {

  const [users, setUsers] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonAdd = useRef(null);
  const closeModalAdd = (data) => {
    resfresh()
    closeButtonAdd.current.click()
  }

  useEffect(() => {
    retrieveUsers()
  }, []);




  const retrieveUsers = () => {
    setLoading(true)
    userHTTPService.getAllUser()
      .then(response => {
        setUsers(response.data.users);
        console.log(response.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e);
      });
  };

  





  const resfresh = () => {
    retrieveUsers()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {

      userHTTPService.removeUser(data).then(data => {
        showMessage('Confirmation', userMessage.delete, 'success')
        retrieveUsers()
      })
      //removeOne(data)
      resfresh()
    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }
  const columns = [
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'designation', headerName: 'Designation', width: 200 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'averageRating', headerName: 'Rating', width: 200 },
  ];

  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = users.find(item => item._id == e[0])
      setUpdatedItem(selectedItem)
      console.log(updatedItem);
    }
    setUpdatedItemIds(e)

  }
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const removeAll = (e) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {

      /*   certificateHTTPService.removeAllCertificates().then(data => {
          getAllPatient()
        }) */
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <h4><i class="menu-icon fas fa-restroom"></i> Collaborators</h4>
      </div>
      <div className="card-body">

        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addUser"><i class="far fa-plus-square"></i>  Create</button>
        {/* <button onClick={e => remove(e, updatedItemId)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Remove</button> */}
        {loading ?
          <LinearProgress />
          : <div style={{ height: 530, width: '100%' }}><DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}




        <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">New</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddUser closeModal={closeModalAdd} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>



        {/* <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditUser project={updatedItem} />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="viewUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ViewUser />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
};


export default UserOfc;