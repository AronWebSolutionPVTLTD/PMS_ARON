import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import CurrentUser from '../../../main/config/user';
import clientMessage from '../../../main/messages/clientMessage';
import clientHTTPService from '../../../main/services/clientHTTPService';
import AddClient from '../AddClient/AddClient';
import EditClient from '../EditClient/EditClient';
import './Client.css';

const Client = () => {

  const [clients, setClients] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);


  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }

  const closeModalAdd = (data) => {
    resfresh()
    closeButtonAdd.current.click()
  }

  useEffect(() => {
    retrieveClients()
  }, []);



  const retrieveClients = () => {
    setLoading(true)
    clientHTTPService.getAllClient().then(data => {
      setLoading(false)
      setClients(data.data)

    });
    ;
  };
// console.log(clients)
  const resfresh = () => {
    retrieveClients()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {
      showMessage('Confirmation', clientMessage.delete, 'success')
      clientHTTPService.removeClient(data).then(data => {
        resfresh()
      })

    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }


  const columns = [
    { field: 'name', headerName: 'Full Name', valueGetter: (params) => {
      const client = params.row; 
      return `${client?.first_name} ${client?.last_name}`;
    }, width: 200 },
    // { field: 'last_name', headerName: 'Last name', width: 200 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Telephone', width: 200 },
    { field: 'platform', headerName: 'Platform', width: 200 },
  ]
// console.log(clients)

  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = clients.find(item => item._id == e[0])
      setUpdatedItem(selectedItem)
     
    }
    setUpdatedItemIds(e)

  }
  // console.log(updatedItem);
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const copy = (e, data) => {
    let {_id,...others}=data;
    others.email=`${others.first_name}_copy@gmail.com`
    // others.username=`${Date.now()}Demo`
    clientHTTPService.createClient(others).then(data => {
      console.log(data.data)
      resfresh()
    })
  }

  return (

    <div className="card">

      <div className="card-header">
        <h4><i class="menu-icon fa fa-handshake-o"></i> Clients</h4>
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addClient"><i class="far fa-plus-square"></i>  Create</button>
        <button onClick={e => copy(e, updatedItem)} type="button" class="btn btn-warning btn-sm"><i class="fas fa-copy"></i> Copy</button>
        <button type="button" onClick={e => update(e, updatedItem)} data-toggle="modal" data-target="#edit" class="btn btn-info btn-sm"><i class="fas fa-edit"></i> edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Remove</button>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 530, width: '100%' }}>
            <DataGrid
            rows={clients}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          />
          </div>}


        <div class="modal fade" id="addClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLongTitle">New</h4>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddClient closeModal={closeModalAdd} />
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
                <h4 class="modal-title" id="exampleModalLongTitle">Edit</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditClient client={updatedItem} closeModal={closeModalEdit} />
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

Client.propTypes = {};

Client.defaultProps = {};

export default Client;
