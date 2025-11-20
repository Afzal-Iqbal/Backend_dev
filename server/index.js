let http = require ("http")

let server = http.createServer((req, res)=>{
    if(req.url == "/news")//http://localhost:8000/news
    {
        let obj = {
            status : 1,
            data:[
                {
                    newTitle: 'blog',
                    newDes:"welcome to my blog"
                },
                {
                    newTitle: "Tech",
                    newDes:"good morning"
                }
            ]
        }
        res.end(JSON.stringify(obj))
    }
    if(req.url == "/about"){//http://localhost:8000/news
        
    }
    // express res.send
    res.end("Welcome so the new server")
})

server.listen("8000") //http://localhost:8000