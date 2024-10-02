const mongo = require('mongoose')
mongo.connect(process.env.DB)
.then(console.log('connected'))
.catch(err=>console.log(err))


module.exports=mongo