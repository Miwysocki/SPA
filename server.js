const  express = require("express");
const  path = require("path");
var fs = require("fs");

const app = express()

app.use(express.static(path.resolve(__dirname, "front")));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }))


app.get("/*", (req, res) => {
        if(req.path == '/listAuthors') {
            fs.readFile( __dirname + "/" + "authors.json", 'utf8', function (err, data) {
            res.end( data );
            });
        }
        else if(req.path == '/listBooks'){
            fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
                res.end( data );
                });
        }
        else
             res.sendFile(path.resolve(__dirname, "front", "index.html"));
});


app.listen(process.env.PORT || 8080, () => console.log("Server running..."));

app.post("/add",(req, res)=>{
    console.log(req.body);
    authors = req.body
    res.end()
});

app.post("/addNewBook",(req, res)=>{
    let arr = new Array()
    fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
        arr = JSON.parse(data);     
        let i=0
        for(i; i < arr.length; i++){
        }
       arr[i] = req.body;     
        arr[i].id = Date.now();
        fs.writeFileSync( __dirname + "/" + "books.json", JSON.stringify(arr))  
    });
    res.end()
});

app.post("/modifyBook",(req, res)=>{
    let arr = new Array()
    fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
        arr = JSON.parse(data);     
        let i=0
        for(i; i < arr.length; i++){
            if(arr[i].id == req.body.id){
                arr[i] = req.body;
            }
        }
        fs.writeFileSync( __dirname + "/" + "books.json", JSON.stringify(arr))  
    });
    res.end()
});



app.post("/addNewAuthor",(req, res)=>{
    let arr = new Array()
    fs.readFile( __dirname + "/" + "authors.json", 'utf8', function (err, data) {
        arr = JSON.parse(data);     ;
       let i = 0;
       let alradyExist = false
        for(i; i < arr.length; i++){
            if(arr[i].name == req.body.name && arr[i].surname == req.body.surname){
                console.log("already exist");
                alradyExist = true
            }
        }
        arr[i] = req.body;
        arr[i].id = Date.now();
        if(!alradyExist) fs.writeFileSync( __dirname + "/" + "authors.json", JSON.stringify(arr))
        });
    res.end()
});

app.delete('/deleteAuthor', function (req, res) {
    //deleting
    fs.readFile( __dirname + "/" + "authors.json", 'utf8', function (err, data) {
        arr = JSON.parse(data);
        let i = 0;
         for(i; i < arr.length; i++){
             if(arr[i].id == req.body.id){
                 console.log("deleting: "+ arr[i].name);
                 arr.splice(i,1);
             }
         }
        fs.writeFileSync( __dirname + "/" + "authors.json", JSON.stringify(arr))
        });
    
    res.send('Got a DELETE request at /deleteAuthor')
  })

  app.delete('/deleteBook', function (req, res) {
    //deleting
    fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
        arr = JSON.parse(data);
        let i = 0;
         for(i; i < arr.length; i++){
             if(arr[i].id == req.body.id){
                 arr.splice(i,1);
             }
         }
        fs.writeFileSync( __dirname + "/" + "books.json", JSON.stringify(arr))
        });
    
    res.send('Got a DELETE request at /deleteAuthor')
  })
