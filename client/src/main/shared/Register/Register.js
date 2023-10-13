import React, { useEffect, useState } from 'react';

import CurrentUser from '../../config/user';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../services/userHTTPService';
import showMessage from '../../../libraries/messages/messages';
import User from '../../config/user';

const Register = () => {

    let history = useHistory()
    var userInit = { username: "",email:"", password: ""  }
    const { register, handleSubmit, errors } = useForm()
    const [user, setUser] = useState(userInit);

    useEffect(() => {
    }, []);


    const onSubmit = (data) => {
        userHTTPService.createUser(data)
        .then(response => {
            console.log(response)
          if (Object.keys(response.data).length !== 0) {
            history.push("/login")
          } else {
            showMessage('Error', 'You have entered an invalid username or password', 'warning')
          }
        })
        .catch(e => {
          showMessage('Error', "HTTP_ERR_MESSAGE", 'warning')
          console.log(e)
        });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className="login-content" >

            <div className="login-form">
                <div className="login-logo">
                    <img className="align-content" src="images/logo.png" alt="" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" placeholder="Email" name="email" onChange={handleInputChange} value={user.email} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleInputChange} value={user.password} ref={register({ required: true })} />
                    </div>
                    <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30"><i class="fas fa-sign-in"></i> Create User</button>
                </form>
            </div>
        </div>
    )
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;