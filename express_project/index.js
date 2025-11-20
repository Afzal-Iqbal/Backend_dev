let express = require("express")

let app=express();

app.get("/",(_,res)=>{
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
app.listen("8000")