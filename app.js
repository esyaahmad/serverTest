const express = require('express')
const app = express()
const PORT = 3005
const router = require('./routers/index')
// const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors');


//bodyparser
app.use(cors());

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)

// app.use(errorHandler)   

app.listen(PORT, () => {
    console.log(`sudah jalan ${PORT}`);
})
module.exports = app
