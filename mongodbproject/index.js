let express = require("express")
let {dbConnection} = require('./dbConnection');
const { ObjectId } = require("mongodb");
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
        let checkEmail = await studentCollection.findOne({sEmail:sEmail})
        if(checkEmail) {
            return res.send({
                status:0,
                msg:"Email id already Exist..."
            })
        }
        // if(checkEmail == null){   => same email na aye 

            // console.log(obj)
        // }
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
    if(error.code = 11000){
        res.status(400).send({
            message:"Email already Exist",
            error : error.message
        })
    }
    res.status(500).send({
        message:"Error inserting student",
        error:error.message
    })
  }
})
app.delete("/student-delete/:id", async (req,res)=>{
    try {
        // let paramsData = req.params;
    // console.log(paramsData) =>it return object [Object: null prototype] { id: '5' }
    let {id} = req.params; // {id : 3}
    //id=69498997d4a8e63149166c66;
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let delRes = await studentCollection.deleteOne({_id:ObjectId(id)})
    let resObj = {
        status : 1,
        msg:"Data Delete",
        delRes
        
    }
    res.status(201).send({
            msg:"Student is deleted Successfully with the help of id",
            resObj
        })
    } catch (error) {
        res.status(500).send(
            {msg:"Error deleting student",
            error:error.message}
        )
    }
    res.send("Delete API hit")
})

app.put("/student-update/:id", async (req, res) => {
  try {
    let { id } = req.params
    let { sName, sEmail } = req.body;
    let obj = { } // data
    if(sName !=="" && sName !== undefined && sName !== null){
        obj['sName'] = sName;
    }
    if(sEmail !== "" && sEmail !== undefined && sEmail !== null){
        obj['sEmail'] = sEmail;
    }
    console.log(obj)
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let updateRes = await studentCollection.updateOne({ _id: new ObjectId(id) }, { $set: { sName, sEmail } });
    let resObj = {
      status: 1,
      msg: "Student Data updated Successfully",
      updateRes
    }
    res.status(201).send({ msg: "Student is updated successfully", resObj })
  } catch (error) {
    res.status(500).send({ msg: "Error in Updating student data", error: error.message })
  }
})

app.listen(8000, ()=>{
    console.log(`Server running on Port 8000`);
})