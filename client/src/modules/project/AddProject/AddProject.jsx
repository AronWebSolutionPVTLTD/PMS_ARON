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
  const { register, handleSubmit, reset, errors } = useForm()
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [milestones,setMilestones]=useState([])
console.log(errors)
  const onSubmit = (data) => {
    const sendData = {...data,milestones};
    projectHTTPService.createProject(sendData).then(data => {
setMilestones([])
      showMessage('Confirmation', projectMessage.add, 'success')
      props.closeModal()
      reset()
    })
  }

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
  const handleMilestoneChange = (event, index) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      const updatedMilestones = [...milestones];
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [name]: checked,
      };
  
      setMilestones(updatedMilestones);
    } else {
      const updatedMilestones = [...milestones];
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [name]: value,
      };
 
      setMilestones(updatedMilestones);
    }
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
  const addMilestone = () => {
    const newMilestone = {
      title: "",
      description: "",
      amount:0,
      completed: false,
    };

    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones( updatedMilestones);
  };

  return (
    <div className="AddProject">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
      <div class="form-group col-md-6">
          <label>Client Name<span class="text-danger">*</span></label>
          <select {...register('client', { required: true })}
            name="client" class="selectpicker form-control border-1  rounded "
          ><option value={''}>Select client</option>
            {
              clients.map(item =>
                <option value={item._id}>{item.first_name + ' ' + item.last_name}</option>

              )
            }
          </select>
          {/* <div className="error text-danger">
            {errors.client && projectValidation.client}
          </div> */}
        </div>
        <div class="form-group col-md-6">
          <label>Project Name<span class="text-danger">*</span></label>
          <input {...register('title', { required: true })}
            type="text" name="title" class="form-control" required="" />
          <div className="error text-danger">
            {errors?.title}
          </div>
        </div>

        <div class="form-group">
          <label>Project Description<span class="text-danger">*</span></label>
          <textarea {...register('description', { required: true })}
            type="text" name="description" class="form-control"></textarea>
          {/* <div className="error text-danger">
            {errors.description && projectValidation.description}
          </div> */}
        </div>
        
     
        <div class="form-group col-md-6">
        <label>Project Cost<span class="text-danger">*</span></label>
              <div class="input-group mb-3">
                <input {...register('contractValue', { required: true })}
                  type="number" name="contractValue" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2"> $</span>
                </div>
              </div>
              </div>

   <div class="form-group col-md-6">
              <label>Contract Type<span class="text-danger">*</span></label>
              <select {...register('contractType', { required: true })} name="contractType" id="project"
                class="selectpicker form-control border-1  rounded " tabIndex="-1" aria-hidden="true">
<option value={''}>Select type</option>
                <option value="Fixed-price contracts">Fixed-price</option>
                <option value="Hourly contracts">Hourly</option>
              </select>
              </div>
              <div className="form-group">
          <div className='Add_milestones'>
    <label>Milestones</label>
    <button type="button" onClick={addMilestone}>➕</button></div>
    <div className='milestones_main'>
    {milestones.map((milestone, index) => (
      <div className='submilestones_task' key={index}>
        <input
          className='area_desc'
          type="text"
          name={`title`}
          value={milestone.title}
      onChange={(e) => handleMilestoneChange(e, index)}
          placeholder={`Milestone ${index + 1}`}
        />
<div>
<textarea
       className='area_desc'
          type="text"
          name={`description`}
          value={milestone.description}
          onChange={(e) => handleMilestoneChange(e, index)}
          placeholder="Description"
        />
</div>

<div>
        <input
       className='area_desc'
          type="number" 
          min={0}
          name={`amount`}
          value={milestone.amount}
          onChange={(e) => handleMilestoneChange(e, index)}
          placeholder="Description"
        />

        {/* <label>
          Completed
          <input
            type="checkbox"
            name={`milestones[${index}].completed`}
            checked={milestone.completed}
            onChange={(e) => handleMilestoneChange(e, index)}
          />
        </label> */}
        <button type="button" className='remove_milestone' onClick={() => removeMilestone(index)}>Remove</button></div>
      </div>
    ))}
    </div>
  </div>


             
  <div class="form-group col-md-6">
          <label>Start Date<span class="text-danger">*</span></label>
          <input {...register('starting_date', { required: true })}
            type="date" name="starting_date" class="form-control datepicker" />
          {/* <div className="error text-danger">
            {errors.starting_date && projectValidation.starting_date}
          </div> */}
        </div>

        <div class="form-group col-md-6">
          <label>End Date<span class="text-danger">*</span></label>
          <input {...register('ending_date', { required: true })}
            type="date" name="ending_date" class="form-control datepicker" />
          {/* <div className="error text-danger">
            {errors.ending_date && projectValidation.ending_date}
          </div> */}
        </div>

        <div class="form-group col-md-6">
          <label>Assigned To<span class="text-danger">*</span></label>
          <select {...register('users', { required: true })}
            name="users" class="selectpicker form-control border-1 rounded "
          > <option value={''}>Select user</option>
            {
              users.map(item =>
                <option value={item._id}>{item.username}</option>

              )
            }
          </select>
          {/* <div className="error text-danger">
            {errors.users && projectValidation.users}
          </div> */}
        </div>

        <div class="form-group col-md-6">
          <label>Status<span class="text-danger">*</span></label>
          <select {...register('status', { required: true })}
            name="status" class="selectpicker form-control border-1 rounded ">
              <option value={''}>Select status</option>
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
          {/* <div className="error text-danger">
            {errors.status && projectValidation.status}
          </div> */}
        </div>

  </div>
        <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button></form>
    </div>
  )
};


export default AddProject;
