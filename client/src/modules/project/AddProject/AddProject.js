import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import projectMessage from '../../../main/messages/projectMessage';
import clientHTTPService from '../../../main/services/clientHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';
import projectValidation from '../../../main/validations/projectValidation';
import './AddProject.css';


const AddProject = (props) => {


  const initialState = {
    title: "",
    description: "",
    starting_date: "",
    ending_date: "",
    users: "",
    client: "",
    note:"",
    status: '',
    contractValue: "",
    contractType: ""
  };

  const { register, handleSubmit, errors } = useForm()
  const [project, setProject] = useState(initialState);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const onSubmit = (data) => {
    console.log(data)
    projectHTTPService.createProject(data).then(data => {

      setProject(initialState)
      showMessage('Confirmation', projectMessage.add, 'success')
      props.closeModal()

    })

  }


  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(value)
    setProject({ ...project, [name]: value });
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await userHTTPService.getAllUser();
        const clientsResponse = await clientHTTPService.getAllClient();
      
        setUsers(usersResponse.data.users);
        setClients(clientsResponse.data);
        setLoading(false);
      } catch (error) {
       console.log(error)
       setLoading(false);
      }
    }
    fetchData();
  }, []);


  return (
    <>
    <div className="AddProject">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>

      {/* <div class="form-group">
          <label>Users</label>
          <select ref={register({ required: true })}  defaultValue={project.users}  multiple  onChange={handleInputChange} value={project.users}
            name="users" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
          >
            {
              users.map(item =>
                <option value={item._id}>{item.username}</option>

              )
            }
          </select>
          <div className="error text-danger">
            {errors.users && projectValidation.users}
          </div>
        </div>  */}

        <div class="form-group">
          <label>Title<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.title}
            type="text" name="title" class="form-control" required="" />
          <div className="error text-danger">
            {errors.title && projectValidation.title}
          </div>
        </div>

        <div class="form-group">
          <label>Short Description<span class="text-danger">*</span></label>
          <textarea ref={register({ required: true })} onChange={handleInputChange} value={project.description}
            type="text" name="description" class="form-control"></textarea>
          <div className="error text-danger">
            {errors.description && projectValidation.description}
          </div>
        </div>
        
        {/* <div class="form-group">
          <label>Client</label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.client}
            name="client" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
          >
            {
              clients.map(item =>
                <option value={item._id}>{item.first_name + ' ' + item.last_name}</option>

              )
            }
          </select>
          <div className="error text-danger">
            {errors.client && projectValidation.client}
          </div>
        </div> */}

        <label>Value<span class="text-danger">*</span></label>
              <div class="input-group mb-3">
                <input ref={register({ required: true })} onChange={handleInputChange} value={project.contractValue}
                  type="number" name="contractValue" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2"> $</span>
                </div>
              </div>

              <label>Type<span class="text-danger">*</span></label>
              <select ref={register({ required: true })} onChange={handleInputChange} value={project.contractType} name="contractType" id="project"
                class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" tabIndex="-1" aria-hidden="true">

                <option value="Fixed-price contracts">Fixed-price contracts</option>
                <option value="Cost-reimbursable Contracts">Cost-reimbursable Contracts</option>
                <option value="Time and materials (T&M)">Time and materials (T&M):</option>
              </select>

        <div class="form-group">
          <label>Start<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.starting_date}
            type="date" name="starting_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.starting_date && projectValidation.starting_date}
          </div>
        </div>

        <div class="form-group">
          <label>End<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.ending_date}
            type="date" name="ending_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.ending_date && projectValidation.ending_date}
          </div>
        </div>

        <div class="form-group">
          <label>Status<span class="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
            name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
          <div className="error text-danger">
            {errors.status && projectValidation.status}
          </div>
        </div>




      


        <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button></form>
    </div></>
  )
};

AddProject.propTypes = {};

AddProject.defaultProps = {};

export default AddProject;
