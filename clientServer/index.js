let express = require('express')
let mongoose = require('mongoose');
let cors = require('cors')
// 1. IMPORT THE ROUTER
// We import the router file that contains all your route definitions
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
let app = express();


// 2. MIDDLEWARE
// This must come BEFORE your routes so the server can read JSON data
app.use(cors())
app.use(express.json());

// 3. ROUTES
// We link the base URL to your Router file. 
// Now, '/api/website/enquiry/view' will correctly trigger the 'view' function.
app.use('/api/website/enquiry', enquiryRouter);
// connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT || 3000, () =>{
        console.log(`server is running at port ${process.env.PORT || 3000}`)
    })
}).catch((error)=>{
    console.log("Error in connecting the mongoose",error)
})
