const express =  require('express')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(cors())
require('dotenv').config();
const router = require('./router/router')
const bodyParser = require('body-parser')
require('./db/config')
app.use(express.json())


app.use(bodyParser.urlencoded({extended:true}))





app.use(express.static(path.join(__dirname, "./client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"./client/dist/index.html"),
    function(err){
        res.status(500).send(err)
    }
    )
})




app.use('/',router)
app.listen(9999)
