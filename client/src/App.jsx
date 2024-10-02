import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Task from './components/Task'
import Signup from './components/Signup'
import Login from './components/Login'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/Signup" element={<Signup />} /> */}
        <Route path="/" element={<Task />} />
        {/* <Route path="/Login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
