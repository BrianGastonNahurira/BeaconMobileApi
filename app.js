const express = require("express");
const app = express();
const { Hostel } = require('./models/task')
const { 
    addhostel,
    registeruser, 
    registeradmin, 
    pendinghostel, 
    edithostel, 
    confirmedhostel, 
    singlehostel, 
    deletehostel, 
    loginadmin
} = require('./routes/tasks')
const ConnectDB = require("./db/connect");
const cors = require("cors");
const port = process.env.PORT || 5001;

app.use(cors()); //i also put cors like to access cross origin sites
app.use(express.json());

//login apis
app.use("/api/v6/",registeradmin)
app.use("api/v6/",registeruser)

  //Cors Configuration - Start
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })
  //Cors Configuration - End
  
//admin apis
app.use("/api/v6/", registeradmin);
app.use("/api/v6/", loginadmin);



// hostel apis
app.get('/hostel/:id',function(req,res){
    fetchid = req.params.id;
    Hostel.find(({id:fetchid}), function(err, val){
        res.send(val);
    })
} )

app.use("/api/v6/", addhostel);
app.use("api/v6/", confirmedhostel);
app.use("/api/v6/",pendinghostel);
app.use("api/v6/",edithostel);
app.use("api/v6/", singlehostel);
app.use("api/v6/", deletehostel);

//database connectivity
ConnectDB();

app.listen(port, console.log(`server started on port: ${port}.......`));
