let express = require("express")
let {dbConnection} = require('./dbConnection')
let app=express();

app.use(express.json())

app.get("/student-read", async (req,res)=>{
   try {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("Students");
    let data = await studentCollection.find().toArray();    
    let resObj = {
        status: 1,
        msg:"Student List",
        data:data
    }
    res.status(201).send({
        message:"Student view get api",
        resObj
    })
   } catch (error) {
    res.status(500).send({
        message:"Error in view the list of students",
        error:error.message
   })
   }
})

app.post("/student-insert", async (req,res)=>{
  try {
        let myDB = await dbConnection();
        // making collection here
        let studentCollection = myDB.collection("Students");
        // yaha se ly kr ao
        // let obj = {
        //     nName:req.body.sName,
        //     sEmail:req.body.sEmail,
        // }
        let {sName, sEmail} = req.body;
        let obj = {sName, sEmail}
        // console.log(obj)
        let insertRes = await studentCollection.insertOne(obj);
        let resObj={
            status:1,
            msg:"Data insert",
            insertRes
        }

        res.status(201).send({
            message:"Student inserted successfully",
            data: resObj
        });
  } catch (error) {
    res.status(500).send({
        message:"Error inserting student",
        error:error.message
    })
  }
})

app.listen(8000, ()=>{
    console.log(`Server running on Port 8000`);
})