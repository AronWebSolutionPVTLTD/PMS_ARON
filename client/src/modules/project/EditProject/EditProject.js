import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditProject.css';
import projectHTTPService from '../../../main/services/projectHTTPService';
import projectMessage from '../../../main/messages/projectMessage';
import showMessage from '../../../libraries/messages/messages';
import { useForm } from 'react-hook-form';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';
import projectValidation from '../../../main/validations/projectValidation'
const EditProject = (props) => {

  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const [project, setProject] = useState(props.project);
  const [typeSubs, setTypeSubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProject(props.project)
    console.log(props.project)
  }, [props.project]);


  const onSubmit = (data) => {
    console.log(data)
    projectHTTPService.editProject(props.project._id, data).then(data => {
      props.closeModal()
      showMessage('Confirmation', projectMessage.edit, 'success')

    }).catch(e => {
      console.log(e)
    })

  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  useEffect(() => {
    retrieveUsers()
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





  return (
    <div className="Edit Project">
      <form class="" onSubmit={handleSubmit(onSubmit)}>

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


        {/* <div class="form-group">
          <label>Users</label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.users}
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
        </div> */}


      


        <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button></form>
    </div>
  )

};

EditProject.propTypes = {};

EditProject.defaultProps = {};

export default EditProject;
