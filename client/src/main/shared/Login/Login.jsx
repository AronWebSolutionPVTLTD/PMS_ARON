import React, { useEffect, useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../services/userHTTPService';
// import showMessage from '../../../libraries/messages/messages';
import User from '../../config/user';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleClick }) => {

  let navigate = useNavigate()
  var userInit = { email: "", password: "" }
  const { register, handleSubmit, errors } = useForm()
  const [user, setUser] = useState(userInit);
const [show,setShow]=useState(false)
  useEffect(() => {
  }, []);

  const onSubmit = (data) => {
    // console.log(data)
    userHTTPService.login(data)
      .then(response => {
        if (Object.keys(response.data).length !== 0) {
          handleClick(true)
          User.USER_DETAIL = response.data?.user || response?.data
          localStorage.setItem('connected', User.CONNECTED_USER);
          navigate("/dashboard")
        } else {
          User.CONNECTED_USER = false
        }
      })
      .catch(e => {
        console.log(e)
      });
  }

  return (
    <div className="login-content" style={{ display: (!User.CONNECTED_USER ? 'block' : 'none') }}>

      <div className="login-form">
        <div className="login-logo">
          <img className="align-content" src="images/logo.png" alt="" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="form-group">
            <label>Email</label>
            <input
  type="text"
  className="form-control"
  placeholder="Email"
  name="email"
  {...register('email', { required: true })}

/>

          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" className="form-control" placeholder="Password" {...register('password', { required: true })} />
          </div>
          <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30"><i class="ti-user"></i> Sign in</button>
        </form>
      </div>
    </div>
  )
};


export default Login;
