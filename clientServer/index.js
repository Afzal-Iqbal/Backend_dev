let express = require('express')
let mongoose = require('mongoose')
require('dotenv').config();
let app = express();

// connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT || 3000, () =>{
        console.log(`server is running at port ${process.env.PORT || 3000}`)
    })
}).catch((error)=>{
    console.log("Error in connecting the mongoose",error)
})
