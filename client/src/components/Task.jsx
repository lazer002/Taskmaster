import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo.svg'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
function Signup() {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, editSet] = useState({
    edit_Task: '', edit_Discription: '', edit_Taskdate: ''
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({
    Task: '', Discription: '', Taskdate: ''
  });
  
  // ###################  set state of task  ###################
  
  const handleinp = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };
  
  // ###################  set state for edit  ###################
  
  const handledit = (e) => {
    const { name, value } = e.target;
    editSet(prevState => ({ ...prevState, [name]: value }));
  };
  
  // ###################  post task ###################
  
  const postdata = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/addtask', user);
      fetchData();  // Refresh data after posting
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  
  // ###################  fetch data ###################
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/getdata');
      console.log(response.data, 'response.data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);  // Only fetch data once on component mount
  
  // ###################  delete task ###################
  
  const Deletetask = async (taskid) => {
    try {
      await axios.post('/deletetask', { taskid });
      fetchData();  // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // ###################  open modal with data ###################
  
  const Edittask = async (taskid) => {
    try {
      handleShow();
      const res = await axios.post('/edittask', { taskid });
      editSet({
        edit_Task: res.data[0].Task,
        edit_Discription: res.data[0].Discription,
        edit_Taskdate: res.data[0].Taskdate
      });
    } catch (error) {
      console.error('Error fetching task for edit:', error);
    }
  };
  
  // ###################  post edit ###################
  
  const postedit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/postedit', edit);
      fetchData();  // Refresh data after editing
      handleClose();  // Close modal after successful edit
    } catch (error) {
      console.error('Error posting edited data:', error);
    }
  };
  

  return (
<>
  {/* ###################  Entry Inputs ################### */}
  <div className="container">
    <div className="wrapper">
      <div className="glass">
        {/* Left Side with Form */}
        <div className="left_side small_logo">
          <div className="small_logo">
            <img src={logo} alt="Logo" />
            <h1>Assign Task</h1>
          </div>

          <input
            type="text"
            name="Task"
            value={user.Task}
            onChange={handleinp}
            className="form-control"
            placeholder="Task"
          />
          <input
            type="text"
            name="Discription"
            value={user.Discription}
            onChange={handleinp}
            className="form-control"
            placeholder="Task Description"
          />
          <input
            type="date"
            name="Taskdate"
            value={user.Taskdate}
            onChange={handleinp}
            className="form-control"
            placeholder="Task Date"
          />
          <button type="submit" onClick={postdata}>Add Task</button>
        </div>

        {/* Right Side with Task List */}
        <div className="left_side small_logo table-scroll">
          <h1>Todo List</h1>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Task</th>
                <th>Description</th>
                <th>Task Date</th>
                <th>Edit</th>
                <th>Complete</th>
              </tr>
            </thead>

            {/* Conditional Rendering of Task List */}
            {Array.isArray(data) && data.length > 0 ? (
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Task}</td>
                    <td>{item.Discription}</td>
                    <td>{item.Taskdate}</td>
                    <td>
                      <button onClick={() => Edittask(item._id)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => Deletetask(item._id)} className="">Complete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6">No tasks available</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  </div>

  {/* ###################  Edit Modal ################### */}
  <Modal show={show} onHide={handleClose} className="modal">
    <h1 className="mhead">Edit Task</h1>

    <div className="mbody">
      <input
        type="hidden"
        name="edit_id"
        value={edit._id}
        onChange={handledit}
        disabled
      />
      <input
        type="text"
        name="edit_Task"
        value={edit.edit_Task}
        onChange={handledit}
        className="form-control"
        placeholder="Edit Task"
      />
      <input
        type="text"
        name="edit_Discription"
        value={edit.edit_Discription}
        onChange={handledit}
        className="form-control"
        placeholder="Edit Description"
      />
      <input
        type="date"
        name="edit_Taskdate"
        value={edit.edit_Taskdate}
        onChange={handledit}
        className="form-control"
        placeholder="Edit Task Date"
      />
    </div>

    <div className="mfooter">
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={postedit}>
        Save Changes
      </Button>
    </div>
  </Modal>
</>

  )
}

export default Signup