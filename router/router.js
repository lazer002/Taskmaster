const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const Taskschrema = require('../models/Task')
const Signup = require('../models/Signup')




router.get('/getdata', async (req, res) => {
  try {

    const data = await Taskschrema.find({})
    res.status(200).json(data)

  } catch (error) {
    console.log(error);
  }
})





router.post('/addtask', async (req, res) => {

  try {
    const { Task, Discription, Taskdate } = req.body

    const data = new Taskschrema({
      Task, Discription, Taskdate
    })
    await data.save()

  } catch (error) {
    console.log(error);
  }
})


router.post('/edittask', async (req, res) => {

  try {
    const { taskid } = req.body

    const data = await Taskschrema.find({
      _id: taskid
    })

    await res.json(data)

  } catch (error) {
    console.log(error);
  }
})




router.post('/postedit', async (req, res) => {

  try {
    console.log(req.body, 'ifgwhfg');
    const { _id, edit_Task, edit_Discription, edit_Taskdate } = req.body
    const updatedData = {
      Task: edit_Task,
      Discription: edit_Discription,
      Taskdate: edit_Taskdate
    };

    const data = await Taskschrema.findByIdAndUpdate(_id, updatedData, { new: true });
    console.log(data, 'jo');
  } catch (error) {
    console.log(error);
  }
})



router.post('/deletetask', async (req, res) => {

  try {
    const { taskid } = req.body

    const data = await Taskschrema.findByIdAndDelete({
      _id: taskid
    })


  } catch (error) {
    console.log(error);
  }
})


router.post('/Signup', async (req, res) => {

  try {

    const { Email, Password } = req.body
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new Signup({
      Email, Password: hashedPassword
    })
    await newUser.save()
    res.status(200).send("new user")
  } catch (error) {
    console.log(error);
  }
})



router.post('/Login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await Signup.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router