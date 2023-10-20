import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';
import clientHTTPService from '../../../main/services/clientHTTPService';
import './EditClient.css';
const EditClient = (props) => {

  const { register, handleSubmit, errors } = useForm();
  const [client, setNote] = useState(props.client);

  useEffect(() => {
    setNote(props.client)

  }, [props.client]);


  const onSubmit = (data) => {
    // console.log(data)
    clientHTTPService.editClient(props.client._id, client).then(data => {
      props.closeModal()
      showMessage('Confirmation', clientMessage.edit, 'success')
    }).catch(e => {
      console.log(e)
    })

  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...client, [name]: value });
  };


  return (
    <div className="EditClient">
    <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
      <div class="row">
    <div class="form-group col-md-6">
          <input type="hidden" name="groups" value="4" />
          <label>First Name<span class="text-danger">*</span></label>
          <input  onChange={handleInputChange} value={client.first_name}
            type="text" name="first_name" class="form-control" required="" />
         
        </div>


        <div class="form-group col-md-6">
          <label>Last Name<span class="text-danger">*</span></label>
          <input  onChange={handleInputChange} value={client.last_name}
            type="text" name="last_name" class="form-control" />
         
        </div>

        <div class="form-group col-md-6">
          <label>Email<span class="text-danger">*</span></label>
          <input  onChange={handleInputChange} value={client.email}
            type="email" name="email" class="form-control" />
        
        </div>

        <div class="form-group col-md-6">
          <label>Telephone</label>
          <input  onChange={handleInputChange} value={client.phone}
            type="number" name="phone" class="form-control" />
         
        </div>
        
        <div class="form-group col-md-6">
          <label>Company</label>
          <input  onChange={handleInputChange} value={client.company}
            type="text" name="company" class="form-control" />
          
        </div>
        <div class="form-group col-md-6">
            <label>Platform</label>
            <input  onChange={handleInputChange} value={client.platform}
              type="text" name="platform" class="form-control" />
            
          </div>
      </div>
      <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
        <font   ><font   > Save</font></font></button>

    </form>
  </div>
  )
};


export default EditClient;
