import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Update = ({dis,update}) => {
  useEffect(()=>{
    setInputs({title:update.title,body:update.body})
  },[update])
  const [Inputs,setInputs] = useState({title:"",body:""})
  const change = (e)=>{
    const {name,value} = e.target;
    setInputs({...Inputs,[name]:value})
  }

  const submit = async ()=>{
    await axios.put(`https://todo-1-mpzo.onrender.com/api/v2/update-task/${update._id}`,Inputs).then((response)=>{
      toast.success("Your Task is Updated")
    })
    dis("none");
  }
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update Your Task</h3>
      <input type="text"  className='todo-inputs my-4 w-100 p-3' name='title' value={Inputs.title} onChange={change}/>
      <textarea className='todo-inputs w-100 p-3' name='body' value={Inputs.body} onChange={change}></textarea>
      <button className='btn btn-dark my-4' onClick={()=>submit()}>UPDATE</button>
      <button className='btn btn-danger my-4 mx-3' onClick={()=>dis("none")}>Close</button>
    </div>
  )
}

export default Update
