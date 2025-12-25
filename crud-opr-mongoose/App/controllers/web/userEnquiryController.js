const enquireModel = require("../../models/enquiry.model")


let enquiryInsert = (req,res)=>{
    let {sName,sEmail,sPhone,sMessage} = req.body;
        let enquiry = new enquireModel({
            name:sName,
            email:sEmail,
            phone:sPhone,
            message:sMessage
        });
        enquiry.save().then(()=>{
            res.send({status:1,
                message:"Enquiry saved successfully"
    
            })
            
        }).catch((err)=>{
            res.send({Status:0,
                msg:"Error while saving enquiry",
            error:err})
        })
        console.log(sName,sEmail,sPhone,sMessage)
}
let enquiryList = async (_req,res)=>{
    try {
        let enquiryList = await enquireModel.find();
        res.status(200).json({Status:1,message:"Enquiry List ", data:enquiryList})
    } catch (error) {
        res.status(500).send({
            status:0,
            msg:"Issue in getting the list of enquiry",
            error
        })
    }
}

let enquiryDelete = async (req, res)=>{
        try {
            let enquiryId = req.params.id;
            let deleteEnquiry = await enquireModel.deleteOne({_id:enquiryId})
            res.status(200).send({
                status:1,
                msg:"Enquiry deleted Successfully",
                id:enquiryId,
                delRes:deleteEnquiry
            })
        } catch (error) {
           res.status(500).send({
                    status:0,
                    msg:"Error in deleting response",
                    err:error
                })
            
        }
}

let enquiryUpdate = async (req, res) => {
  try {
    const enquiryId = req.params.id; // no await needed
    const { sName, sEmail, sPhone, sMessage } = req.body;

    const updateObj = {
      name: sName,
      email: sEmail,
      phone: sPhone,
      message: sMessage
    };

    // use $set to update only provided fields
    const updateRes = await enquireModel.updateOne(
      { _id: enquiryId },
      { $set: updateObj }
    );

    res.status(200).send({
      status: 1,
      message: "Enquiry updated successfully",
      updateRes
    });
  } catch (error) {
    res.status(500).send({
      status: 0,
      msg: "Issue in updating the enquiry data",
      err: error.message // send only message for clarity
    });
  }
};
module.exports = {enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate}