import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import CurrentUser from '../../../main/config/user';
import userHTTPService from '../../../main/services/userHTTPService';

import userMessageOfc from '../../../main/messages/usersMessageOfc';
import AddUser from '../AddUser/AddUser_ofc';
import EditUser from '../EditUser/EditUser';
import './User.css';


const deleteUser = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
}

const UserOfc = () => {

  const [users, setUsers] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonAdd = useRef(null);
  
  const closeButtonEdit = useRef(null);

  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }
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
        // console.log(response.data)
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
        showMessage('Confirmation', userMessageOfc.delete, 'success')
        retrieveUsers()
      })
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
      // console.log(updatedItem);
    }
    setUpdatedItemIds(e)

  }
  // console.log(updatedItem)
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



  const copy = (e, data) => {
    let {_id,...others}=data;
    others.email=`${others?.email?.split("@")[0]}_copy@gmail.com`
    others.username=`${others?.username}_copy`
    userHTTPService.createUser2(others).then(data => {
      // console.log(data.data)
      resfresh()
    })
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4><i class="menu-icon fas fa-restroom"></i> Users</h4>
      </div>
      <div className="card-body">

        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addUser"><i class="far fa-plus-square"></i>  Create</button>     
        <button onClick={e => copy(e, updatedItem)} type="button" class="btn btn-warning btn-sm"><i class="fas fa-copy"></i> Copy</button>
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" class="btn btn-info btn-sm"><i class="fas fa-edit"></i> Edit</button>
 

        <button onClick={e => remove(e, updatedItemId)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Remove</button>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 530, width: '100%' }}><DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelection}
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

        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <EditUser user={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


export default UserOfc;
