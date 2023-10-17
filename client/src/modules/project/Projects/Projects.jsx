import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import CurrentUser from '../../../main/config/user';
import projectMessage from '../../../main/messages/projectMessage';
import projectHTTPService from '../../../main/services/projectHTTPService';
import ProjectSummary from '../ProjectSummary/ProjectSummary';
// import AddProject from '../AddProject/AddProject';
import AddProject from '../AddProject/AddProject';
import EditProject from '../EditProject/EditProject.jsx';
import './Projects.css';
const deleteProject = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
}


const Projects = () => {
  let [color, setColor] = useState("#ffffff");
  const [projects, setProjects] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();

  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);

  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }

  const closeModalAdd = (data) => {
    console.log('close')
    closeButtonAdd.current.click()
  }
  useEffect(() => {
    setLoading(false)
    retrieveProjects()
  }, []);
  const [loading, setLoading] = useState(false);




  const retrieveProjects = () => {
    //var projects = ProjectTestService.getAll();
    setLoading(true)
    projectHTTPService.getAllProject().then(data => {
      console.log(data.data,"dfdskjnfn sidhf io")
      setProjects(data.data);
      setLoading(false)
    })

  };

  const resfresh = () => {
    retrieveProjects()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {
      showMessage('Confirmation', projectMessage.delete, 'success')
      projectHTTPService.removeProject(data).then(data => {
        resfresh()
      })
      //removeOne(data)

    }

  }

  const update = (e, data) => {
    e.preventDefault();
    console.log(data)
    setUpdatedItem(data)

  }

  const copy = (e, data) => {
    projectHTTPService.copyProject(data.id).then(data => {
      console.log(data.data)
      //buttonEdit.current.click()
      //update(data.data)
      resfresh()
    })
  }
  const columns = [
    { field: '_id', headerName: '#', width: 200 },
    { field: 'title', headerName: 'Title', width: 200, cellClassName: 'title-color' },
    { field: 'starting_date', headerName: 'Start', width: 200, cellClassName: 'start-date-color' },
    { field: 'ending_date', headerName: 'End', width: 200, cellClassName: 'end-date-color' },
    { field: 'users', headerName: 'CreatedBy', width: 200,valueGetter: (params) => {
      const user = params.row.users; // Assuming 'client' contains first_name and last_name
      return `${user?.username}`;
    }, },
    { field: 'status', headerName: 'Status', width: 200, cellClassName: 'status-color' },
    {  field: 'client',
    headerName: 'Client',
    width: 200,
    valueGetter: (params) => {
      const client = params.row.client; // Assuming 'client' contains first_name and last_name
      return `${client?.first_name} ${client?.last_name}`;
    }, },
    { field: 'contractValue', headerName: 'Amount', width: 200 },
    { field: 'pendingMilestonesCount', headerName: 'Pending Milestones', width: 200 },
    { field: 'rating', headerName: 'Rating', width: 200 },
  ];

  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = projects.find(item => item._id == e[0])
      console.log(selectedItem)
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

  const [statusCounts, setStatusCounts] = useState({
    todo: 0,
    done: 0,
    inProgress: 0,blocked:0
  });
  
  useEffect(() => {
    
    const counts = projects.reduce((accumulator, project) => {
      console.log(project.status)
      switch (project.status) {
        case 'Todo':
          accumulator.todo++;
          break;
        case 'Done':
          accumulator.done++;
          break;
        case 'Blocked':
          accumulator.blocked++;
          break;
        case 'In Progress':
          accumulator.inProgress++;
          break;
        default:
          break;
      }
      return accumulator;
    }, { todo: 0, done: 0, inProgress: 0,blocked:0 });
  
    setStatusCounts(counts);
  }, [loading]);
const {todo,done,inProgress,blocked}=statusCounts;
console.log(updatedItem)
  return (

    <div className="card" style={{maxWidth:"83%"}}>

      <div className="card-header">
        <h4><i class="menu-icon fa fa-folder"></i> Projects</h4>
      </div>
      <div className="card-body">
        <ProjectSummary todo={todo} done={done} inProgress={inProgress} blocked={blocked} />
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addProject"><i class="far fa-plus-square"></i>  Create</button>
        <button onClick={e => copy(e, updatedItem)} type="button" class="btn btn-warning btn-sm"><i class="fas fa-copy"></i> Copy</button>
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" class="btn btn-info btn-sm"><i class="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Remove</button>

        <button onClick={resfresh} type="button" class="btn btn-secondary btn-sm"><i class="fas fa-repeat"></i> Reload</button>

        {loading ?
          <LinearProgress />
          : <div style={{ height: 530, width: '100%' }}><DataGrid
            rows={projects}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>} 
        <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">New</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddProject closeModal={closeModalAdd} />
              </div>
              <div class="modal-footer">
                <button ref={closeButtonAdd} onClick={resfresh} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

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
                <EditProject project={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
};


export default Projects;
