import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import projectMessage from '../../../main/messages/projectMessage';
import clientHTTPService from '../../../main/services/clientHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';
import projectValidation from '../../../main/validations/projectValidation';
import './EditProject.css';
const EditProject = (props) => {
  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const [project, setProject] = useState(props.project);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [milestones,setMilestones]=useState([])

  useEffect(() => {
    setProject(props.project)
    console.log(props.project)
  }, [props.project]);

console.log(project)
  const onSubmit = (data) => {
    console.log(project)
    projectHTTPService.editProject(props.project._id, project).then(data => {
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
  // const handleMilestoneChange = (event, index) => {
  //   const { name, value, type, checked } = event.target;
  //   if (type === 'checkbox') {
  //     const updatedMilestones = [...project.milestones];
  //     updatedMilestones[index] = {
  //       ...updatedMilestones[index],
  //       [name]: checked,
  //     };
  
  //     setProject({...project,milestones : [...project.milestones,updatedMilestones]});
  //   } else {
  //     const updatedMilestones = [...milestones];
  //     updatedMilestones[index] = {
  //       ...updatedMilestones[index],
  //       [name]: value,
  //     };
 
  //     setProject({...project,milestones : [...project.milestones,updatedMilestones]});
  //   }
  // };

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
  // const addMilestone = () => {
  //   const newMilestone = {
  //     title: "",
  //     description: "",
  //     completed: false,
  //   };
  //   setProject({...project,milestones : [...project.milestones,newMilestone]});
  // };

  // const removeMilestone = (index) => {
  //   const updatedMilestones = [...project.milestones];
  //   updatedMilestones.splice(index, 1);
  //   setProject({...project,milestones : updatedMilestones});
  // };

  const handleMilestoneChange = (event, index) => {
    const { name, value, type, checked } = event.target;
    const updatedMilestones = [...project.milestones];
    if (type === 'checkbox') {
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [name]: checked,
      };
    } else {
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [name]: value,
      };
    }
    setProject({ ...project, milestones: updatedMilestones });
  };

  const addMilestone = () => {
    const newMilestone = {
      title: '',
      description: '',
      completed: false,
      amount:0
    };
    setProject({
      ...project,
      milestones: [...project.milestones, newMilestone],
    });
  };

  const editMilestone = (index, updatedMilestone) => {
    const updatedMilestones = [...project.milestones];
    updatedMilestones[index] = updatedMilestone;
    setProject({ ...project, milestones: updatedMilestones });
  };

  const removeMilestone = (index) => {
    const updatedMilestones = [...project.milestones];
    updatedMilestones.splice(index, 1);
    setProject({ ...project, milestones: updatedMilestones });
  };

  return (
    <div className="Edit Project">
      <form class="" onSubmit={handleSubmit(onSubmit)}>
      <div class="row">
      <div class="form-group col-md-6">
          <label>Client Name</label>
          <select  onChange={handleInputChange} value={project.client ? project.client._id : ''}
            name="client" class="selectpicker form-control border-1 rounded "
          >
            {
              clients.map(item =>
                <option value={item._id}>{item.first_name + ' ' + item.last_name}</option>

              )
            }
          </select>
     
        </div>
        <div class="form-group col-md-6">
          <label>Project Name<span class="text-danger">*</span></label>
          <input  onChange={handleInputChange} value={project.title}
            type="text" name="title" class="form-control" required="" />
   
        </div>

        <div class="form-group">
          <label>Project Description<span class="text-danger">*</span></label>
          <textarea  onChange={handleInputChange} value={project.description}
            type="text" name="description" class="form-control"></textarea>
       
        </div>
        
 
        <div class="form-group col-md-6">
        <label>Project Cost<span class="text-danger">*</span></label>
              <div class="input-group mb-3">
                <input  onChange={handleInputChange} value={project.contractValue}
                  type="number" name="contractValue" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2"> $</span>
                </div>
              </div>
              </div>
              <div class="form-group col-md-6">
              <label>Contract Type<span class="text-danger">*</span></label>
              <select  onChange={handleInputChange} value={project.contractType} name="contractType" id="project"
            class="selectpicker form-control border-1 rounded " tabIndex="-1" aria-hidden="true">
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
    {project?.milestones?.map((milestone, index) => (
      <div className='submilestones_task' key={index}>
        <input
          className='area_desc'
          type="text"
          name={`title`}
          value={milestone.title}
      onChange={(e) => handleMilestoneChange(e, index)}
          placeholder={`Milestone ${index + 1}`}
        />
<div style={{marginTop:"4px"}}>
        <textarea
       className='area_desc'
          type="text"
          name={`description`}
          value={milestone.description}
          onChange={(e) => handleMilestoneChange(e, index)}
          placeholder="Description"
        />
         <input
       className='area_desc'
          type="number" 
          min={0}
          name={`amount`}
          value={milestone.amount}
          onChange={(e) => handleMilestoneChange(e, index)}
          placeholder="Description"
        />
<div className='completed_miles'>
         <label className='name_miles_Completed'>
          Completed
          <input
            type="checkbox"
            name={`completed`}
            checked={milestone.completed}
            onChange={(e) => handleMilestoneChange(e, index)}
          />
        </label> 
        <button type="button" className='remove_milestone' onClick={() => removeMilestone(index)}>Remove</button></div></div>
      </div>
    ))}
    </div>
  </div> 

            
<div class="form-group col-md-6">
          <label>Start<span class="text-danger">*</span></label>
          <input  onChange={handleInputChange} value={project.starting_date}
            type="date" name="starting_date" class="form-control datepicker" />
    
        </div>

        <div class="form-group col-md-6">
          <label>End<span class="text-danger">*</span></label>
          <input  onChange={handleInputChange} value={project.ending_date}
            type="date" name="ending_date" class="form-control datepicker" />
        </div>
    
     


        <div class="form-group col-md-6">
          <label>AssignedTo</label>
          <select  onChange={handleInputChange}  value={project.users ? project.users._id : ''}
            name="users" class="selectpicker form-control border-1 rounded "
          >
            {
              users.map(item =>
                <option value={item._id}>{item.username}</option>

              )
            }
          </select>
        </div>

  
     <div class="form-group col-md-6">
          <label>Status<span class="text-danger">*</span></label>
          <select  onChange={handleInputChange} value={project.status}
            name="status" class="selectpicker form-control border-1 rounded ">
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
     
        </div>
        <div class="form-group col-md-6">
          <label>Rating</label>
          <input  onChange={handleInputChange} value={project.rating}
            type="number" min={0} max={5} name="rating" class="form-control datepicker" />
     
        </div>
        <div class="form-group col-md-6">
          <label>Feedback</label>
          <textarea  onChange={handleInputChange} value={project.feedback}
            type="text" name="feedback" class="form-control"></textarea>
     
        </div>
          </div>  <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button>
          </form>
    </div>
  )

};



export default EditProject;
