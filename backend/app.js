const express = require('express');
const app = express()
const cors = require('cors')
const path = require('path')
const connectDB  = require('./db/index')
const auth = require('./routes/auth.js')
const list = require('./routes/list.js')
app.use(express.json())
app.use(cors())

app.use('/api/v1',auth)
app.use('/api/v2',list)
app.get('/',(req,res)=>{
  res.send('Hello World')
})

const PORT = 1000;
app.listen(PORT,()=>{
  console.log(`Server is  running on port ${PORT}`)
})