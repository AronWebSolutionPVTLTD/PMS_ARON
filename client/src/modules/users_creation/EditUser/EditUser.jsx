import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import userMessage from '../../../main/messages/userMessage';
import { default as HTTPService, default as userHTTPService } from '../../../main/services/userHTTPService';
import './EditUser.css';

const EditUser = (props) => {
 
  const { register, handleSubmit, errors } = useForm()
  const [user, setUser] = useState(props.user);
  const closeButtonAdd = useRef(null);
// console.log(user)
  useEffect(() => {
    setUser(props.user)
  
  }, [props.user]);
  const closeModalAdd = (data) => {

    closeButtonAdd.current.click()
  }

  const onSubmit = (data) => {

    userHTTPService.editUser(props.user._id,user).then(data => {
      showMessage('Confirmation', userMessage.add, 'success')
      props.closeModal()
    })

  }

  const saveUser = (data) => {

    HTTPService.create(data)
      .then(response => {
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };


return(
  <div className="Edit User">
  <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
    <div className="row">

      <div className="form-group col-md-6">
        <label>Username<span className="text-danger">*</span></label>
        <input  onChange={handleInputChange}
          value={user?.username} type="text" name="username" className="form-control" required="" />
       
      </div>


      <div className="form-group col-md-6">
        <label>Email<span className="text-danger">*</span></label>
        <input  onChange={handleInputChange}
          value={user?.email} type="email" name="email" className="form-control" />
      
      </div>
 

      <div className="form-group col-md-6">
        <label>Telephone</label>
        <input  onChange={handleInputChange}
          value={user?.phone} type="number" name="phone" className="form-control" />
      </div>

      <div className="form-group col-md-6">
        <label>Designation<span className="text-danger">*</span></label>

        <select  onChange={handleInputChange}
          value={user.designation} name="designation" className="form-control select2 select2-hidden-accessible"
          tabindex="-1" aria-hidden="true">
          <option value="Tl">TL</option>
          <option value="Member">Member</option>
        </select>
      </div>

      <div className="form-group col-md-6">
        <label>Department<span className="text-danger">*</span></label>

        <select  onChange={handleInputChange}
          value={user.department} name="department" className="form-control select2 select2-hidden-accessible"
          tabindex="-1" aria-hidden="true">
          <option value="MERN">MERN</option>
          <option value="Development">Development</option>
          <option value="Web Designing">Web Designing</option>
          <option value="Graphic Designing">Graphic Designing</option>
          <option value="Testing">Testing</option>
          <option value="SEO">SEO</option>
        </select>
      </div>
    </div>

    <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
      <font   ><font> Save</font></font></button>
  </form>
</div>
)}

export default EditUser;
