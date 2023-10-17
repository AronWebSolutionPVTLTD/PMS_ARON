
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import userHTTPService from "../../services/userHTTPService";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  console.log(activation_token)
  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        const data ={activation_token:activation_token}
        userHTTPService.activate(data)
        .then(response => {
            console.log(response)
          if (Object.keys(response.data).length !== 0) {
            navigate.push("/login")
        }})
        .catch(e => {
          console.log(e)
          setError(true)
        });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >dsfdsf
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;