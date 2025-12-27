let enquiryModel = require('../../models/enquiry.model');

let enquiryInsert = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1. Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).send({ 
        Status: 0, 
        message: "Please fill in all fields." 
      });
    }

    // 2. Save Enquiry
    const enquiry = new enquiryModel({ name, email, phone, message });
    await enquiry.save();

    res.status(200).send({ 
      Status: 1, 
      message: "Enquiry saved successfully!" 
    });

  } catch (err) {
    // 3. Handle Duplicate Key Error (E11000)
    if (err.code === 11000) {
      return res.status(400).send({ 
        Status: 0, 
        message: "This email address has already submitted an enquiry." 
      });
    }

    // 4. Handle Mongoose Validation Errors
    if (err.name === 'ValidationError') {
      return res.status(400).send({ 
        Status: 0, 
        message: "Invalid data format.",
        error: err.message 
      });
    }

    // 5. General Server Error
    console.error("Database Error:", err);
    res.status(500).send({ 
      Status: 0, 
      message: "Internal server error.", 
      error: err.message 
    });
  }
};

let enquiryList = async (_req,res)=>{
    try {
        let enquiryList = await enquiryModel.find();
        res.status(200).json({Status:1,message:"Enquiry List ", data:enquiryList})
    } catch (error) {
        res.status(500).send({
            status:0,
            msg:"Issue in getting the list of enquiry",
            error
        })
    }
}
let enquiryDelete = async (req, res) => {
    try {
        let enquiryId = req.params.id;
        let deleteEnquiry = await enquiryModel.deleteOne({ _id: enquiryId });

        res.status(200).send({
            Status: 1, // Capital S to match your frontend logic
            message: "Enquiry deleted Successfully",
            id: enquiryId,
            delRes: deleteEnquiry
        });
    } catch (error) {
        res.status(500).send({
            Status: 0,
            message: "Error in deleting response",
            error: error.message
        });
    }
};
let enquiryUpdate = async (req, res) => {
  try {
    let enquiryId = req.params.id;
    let { name, email, phone, message } = req.body;

    let updateData = await enquiryModel.updateOne(
      { _id: enquiryId },
      { $set: { name, email, phone, message } }
    );

    res.status(200).send({
      Status: 1,
      message: "Enquiry updated successfully",
      updateRes: updateData
    });
  } catch (error) {
    res.status(500).send({
      Status: 0,
      message: "Error in updating enquiry",
      error: error.message
    });
  }
};

// In your router:
// enquiryRouter.put('/update/:id', enquiryUpdate);
module.exports = {enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate}; // for multiple functions export