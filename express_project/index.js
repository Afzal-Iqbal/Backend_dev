let express = require("express")

let app=express();
app.use(express.json())

app.get("/",(_,res)=>{ // https://localhost:8000/
    res.send({
        status:1,
        msg: "Home page API"
    })
})
app.get('/news',(_,res)=>{
    res.send({
        status:1,
        msg:"news api is called"
    })
})

//params data is the dynamic value from the url here id is key
app.get("/news/:id",(req,res)=>{
    let currentId = req.params.id
    res.send("this news detail api "+currentId);
})
app.get("/products",(req,res)=>{
    res.send({
        status: 32,
        msg:"Prduct api created"
    }
    )
})


// through json parameter
app.post("/login",(req,res)=>{
    console.log(req.body)
    // res.send({status:1,
    //     msg:"Login api through post",
    //     data:req.body,
    //     queryData:req.query // accessing query params
    // })
    res.status(200).json({
            msg:"Login api through post",
            data:req.body,
            queryData:req.query // accessing query params
    })
})
app.listen("8000")