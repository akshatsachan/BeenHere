const express = require("express");
const Datastore = require('nedb');
const app = express();
app.listen(3000,()=>{console.log("server is running at port 3000");});
app.use(express.static('public'));
app.use(express.json({'limit':'1mb'}));
const database = new Datastore('database.db');
database.loadDatabase();
//database.insert({name: 'something',grade:'1'});
//database.insert({name: 'somethiny',grade:'2'});
//Adding routes

app.get('/api',(request,response)=>{
    const current_ip = request.headers['x-forwarded-for'] || 
    request.connection.remoteAddress || 
    request.socket.remoteAddress ||
    (request.connection.socket ? request.connection.socket.remoteAddress : null);

    database.find({ip: current_ip},(err,data)=>{
        if (err)
        {
            response.end();return;
        }
        response.json(data);
        
    });
});
app.post('/api'   // Address where we wish to recieve the post request and which can be used to access the request using fetch in index.html's JS
, (request,response)=>{     //Callback
        //console.log(request.body);
        const ip = request.headers['x-forwarded-for'] || 
                request.connection.remoteAddress || 
                request.socket.remoteAddress ||
                (request.connection.socket ? request.connection.socket.remoteAddress : null);
        //console.log(ip);
        const lat = request.body.lat;
        const lon = request.body.lon;
        const name = request.body.name;
        const image64 = request.body.image64;
        const timestamp = Date.now();
        const data = {lattitude:lat, longitude: lon,timestamp: timestamp,name: name,image: image64,ip: ip};
        response.json({     //used to sent back any form of json data
            status:'success',
            timestamp: timestamp,
            lattitude: lat,
            longitude: lon,
            name: name,
            image: image64
        });
        database.insert(data);
        //console.log(locations);
});