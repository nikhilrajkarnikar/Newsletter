const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/0cfc42cd45",
        method: "POST",
        headers: {
            "Authorization" : "nik1 90313206f67a0cb920f6d84c74217895-us4"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if (error){
            res.sendFile(__dirname + "/failure.html");
        } else {
            if(response.statusCode===200){
                res.sendFile(__dirname + "/success.html");
                console.log(response.statusCode);
            }
            else{
                res.sendFile(__dirname + "/failure.html");;
            }
        }
        
    });

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

// API KEY
// 90313206f67a0cb920f6d84c74217895-us4

// List ID
// 0cfc42cd45