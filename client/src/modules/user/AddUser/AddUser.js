import './AddUser.css';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import userMessage from '../../../main/messages/userMessage'
import userValidation from '../../../main/validations/userValidation'
import UserTestService from '../../../main/mocks/UserTestService';
import HTTPService from '../../../main/services/userHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';


const AddUser = (props) => {

  const initialState = {
    username:"",
    email: "",
    phone: "",
    password: "",
    role: ""
  };

  const { register, handleSubmit, errors } = useForm()
  const [user, setUser] = useState(initialState);
  const closeButtonAdd = useRef(null);


  const closeModalAdd = (data) => {

    closeButtonAdd.current.click()
  }

  const onSubmit = (data) => {

    userHTTPService.createUser(data).then(data => {

      setUser(initialState)
      showMessage('Confirmation', userMessage.add, 'success')
      props.closeModal()
    })

  }

  const saveUser = (data) => {

    HTTPService.create(data)
      .then(response => {
        setUser(initialState)
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="AddUser">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

          <div className="form-group col-md-6">
            <label>Username<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.username} type="text" name="username" className="form-control" required="" />
            <div className="error text-danger">
              {errors.username && userValidation.username}
            </div>
          </div>


          <div className="form-group col-md-6">
            <label>Email<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.email} type="email" name="email" className="form-control" />
            <div className="error text-danger">
              {errors.email && userValidation.email}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label>Password<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.password} type="password" name="password" className="form-control" />
            <div className="error text-danger">
              {errors.password && userValidation.password}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Telephone</label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.phone} type="number" name="phone" className="form-control" />
            <div className="error text-danger">
              {errors.phone && userValidation.phone}
            </div>
          </div>


          <div className="form-group col-md-6">
            <label>Role<span className="text-danger">*</span></label>

            <select ref={register({ required: true })} onChange={handleInputChange}
              value={user.role} name="role" className="form-control select2 select2-hidden-accessible"
              tabindex="-1" aria-hidden="true">
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
            <div className="error text-danger">
              {errors.role && userValidation.role}
            </div>
          </div>



        </div>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font> Save</font></font></button>
      </form>
    </div>
  )
};

AddUser.propTypes = {};

AddUser.defaultProps = {};

export default AddUser;
