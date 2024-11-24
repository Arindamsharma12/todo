import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
let toUpdateArray = []
let id = sessionStorage.getItem("id");
const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  
  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not be empty");
    } else {
      if(id){
        await axios.post(`http://localhost:1000/api/v2/add-task`,{title:Inputs.title,body:Inputs.body,id}).then((response)=>{
          console.log(response)
        })
        setInputs({ title: "", body: "" });
        toast.success("Your task is Added");
      }
      else{
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your task is Added");
        toast.error("Your task is Not Saved ! Please SignUp");
      }
    }
  };

  const del = async (cardid) => {
    if(id){
      await axios.delete(`http://localhost:1000/api/v2/delete-task/${cardid}`,{data:{id:id}}).then(()=>{
        toast.success("Your task is Deleted!")
      })
    }
    else{
      toast.error("Please Sign Up First")
    }
  };

  const dis = (value)=>{
    document.getElementById('todo-update').style.display = value
  }

  const update=(value)=>{
    toUpdateArray = Array[value]
  }
  useEffect(()=>{
    if(id){
      const fetch = async ()=>{
        await axios.get(`http://localhost:1000/api/v2/get-tasks/${id}`).then((response)=>{
          setArray(response.data.list)
        })
      };
      fetch();
    }
  },[submit])
  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column todo-inputs-div w-100 my-2 p-3">
            <input
              className="my-2 p-2 todo-input"
              type="text"
              placeholder="TITLE"
              name="title"
              value={Inputs.title}
              onClick={show}
              onChange={change}
            ></input>
            <textarea
              id="textarea"
              className="my-2 todo-input p-2"
              type="text"
              name="body"
              value={Inputs.body}
              placeholder="BODY"
              onChange={change}
            />
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div className="col-lg-3 col-8 mx-5 my-2" key={index}>
                    <TodoCards
                      id={item._id}
                      title={item.title}
                      body={item.body}
                      delid={del}
                      dis={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container">
        <Update dis={dis} update={toUpdateArray}></Update>
        </div>
      </div>
    </>
  );
};

export default Todo;
