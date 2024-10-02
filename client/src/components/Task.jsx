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
  })


  {/* ###################  set state of taks  ################### */ }


  const handleinp = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]: value })
  }


  const handledit = (e) => {

    let { name, value } = e.target
    editSet({ ...edit, [name]: value })
  }

  {/* ###################  post taks ################### */ }

  const postdata = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/addtask', user);
      fetchData();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  {/* ################### data show ################### */ }


  const fetchData = async () => {
    try {
      const response = await axios.get('/getdata');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [data]);






  {/* ###################  delete task ################### */ }

  const Deletetask = async (taskid) => {

    try {
      const res = await axios.post('/deletetask', { taskid });

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  {/* ###################  open modal with data ################### */ }


  const Edittask = async (taskid) => {

    try {
      handleShow()
      const res = await axios.post('/edittask', { taskid });
      await editSet(res.data[0])
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  {/* ###################  edit post ################### */ }


  const postedit = async (e) => {
    e.preventDefault();
    try {

      await axios.post('/postedit', edit);
      fetchData();
    } catch (error) {
      console.error('Error posting data:', error);
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