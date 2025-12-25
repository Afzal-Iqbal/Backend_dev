let express = require('express');
let mongoose = require('mongoose');
require('dotenv').config();
const enquiryRoutes = require('./App/routes/enquiryRoutes');

// Connect to MongoDB



let app= express();
app.use(express.json());
app.use("/web/api/enquiry",enquiryRoutes)
//http://localhost:8000/web/api/enquiry/
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB");
    let port = process.env.PORT;
    app.listen(port || 3000,()=>{
        console.log(`Server is running at http://localhost:${port}`)
    })
})