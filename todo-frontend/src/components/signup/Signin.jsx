import React from 'react'
import "./signup.css";
import Heading from "./Heading";
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs,setInputs] = useState({email:"",password:""})
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await https://todo-1-mpzo.onrender.com/api/v1/signin`, Inputs)
      .then((response) => {
          sessionStorage.setItem("id",response.data.others._id)
          dispatch(authActions.login())
          history('/todo')
      });
  };
  return (
    <div>
       <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-none">
            <Heading first="Sign" second="In"></Heading>
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-2 my-3 input-signup"
              name='email'
              value={Inputs.email}
              onChange={change}
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="p-2 my-3 input-signup"
              name='password'
              value={Inputs.password}
              onChange={change}
            />
            <button className="btn-signup p-2" onClick={submit}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Signin
