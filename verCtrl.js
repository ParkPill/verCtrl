// csapp.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var schedule    = require('node-schedule');
var path = require('path');

var dir = path.join(__dirname, 'public');
app.use(express.static(dir));
console.log("crossPosition path use");

var isCartoonCraftFree = false;
var isCartoonCraftIOSFree = false;
var cors = require('cors')
app.use(cors())

fs = require('fs');
http = require('http');
https = require('https'),
url = require('url');

var rateJson;
var rateInfo = [];
 
const request = require('request');
 
// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
    
    
    // test 
//    Csuser.testNow();
//    Csuser.testFind();
});

mongoose.connect('mongodb://127.0.0.1:27017/verCtrl', { useNewUrlParser: true });

//db.getCollection('csuserSchema').dropIndexes();

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Gameinfo = require('./models/gameinfo');

// [CONFIGURE ROUTER]
var router = require('./routes')(app, Gameinfo);

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8116;

app.use("/", express.static(__dirname + "/app"));
app.use("/bower_components/angular", express.static(__dirname + "/app/bower_components/angular"));

app.get("/", function(req,res) { res.sendFile(path.join(__dirname, "/app/index.html")); });

// [RUN SERVER]
var server = app.listen(port, function(){
                        console.log("Express server has started on port " + port)
                        });

app.get('/', function (req, res) {
    res.writeHead(200);
    res.end("hello world for verCtrl\n");
});

app.get('/time', function (req, res) {
    console.log("time req");
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    res.send(new Date(Date.now() - tzoffset).toISOString());
});
app.get('/forceResultLeague', function (req, res) {
    resultLeagues();
    res.json({result:1});
});
app.get('/ping', function (req, res) {
    res.send("true");
});
app.post('/postetest', function (req, res) {
    console.log("postetest body: " + JSON.stringify(req.body));
    console.log("postetest body.test: " + req.body.test);
    res.json({ result: "postest done" });
});
app.get('/getGame', function (req, res) {
    var gameName = req.body;
    Gameinfo.find({name:gameName}, function(err, infos) {
        if(gameinfoWithName) { // user with the name exist
            gameinfoWithName.save(function (err) {
                if (err) {
                    console.error(err);
                    res.send({err:err});
                } else {
                    res.send(gameinfoWithName.name + "," + gameinfoWithName.ver + "," + gameinfoWithName.maint);
                }
            });
        }else{
            res.send({result:'game not found'});
        }
    });
});
app.get('/setGame', function (req, res) {
    var array = req.body.split(",");
    var gameName = array[0];
    // game info
    Gameinfo.findOne({name: gameName}, function(err, gameinfoWithName){
        if(gameinfoWithName) { // user with the name exist
            gameinfoWithName.ver = array[1];
            gameinfoWithName.maint = array[2];
            gameinfoWithName.save(function (err) {
                if (err) {
                    console.error(err);
                    res.send({err:err});
                } else {
                    res.send(gameinfoWithName.name + "," + gameinfoWithName.ver + "," + gameinfoWithName.maint);
                }
            });
        }else{
            res.send({result:'game not found'});
        }
    });
});
app.get('/create', function (req, res) {
    var gameName = req.body;

    // game info
    Gameinfo.findOne({name: gameName}, function(err, gameinfoWithName){
        if(gameinfoWithName) { // user with the name exist
            gameinfoWithName.save(function (err) {
                if (err) {
                    console.error(err);
                }
                res.send({result:'same name exist'});
            });
        }else{
            var gameinfo = new Gameinfo();
            gameinfo.name = gameName;
            gameinfo.save(function(err){
                if(err){
                    console.error(err);
                    res.send({err:err});
                }else{
                    res.send({result:'success'});
                }
            });
        }
    });
});
var aosVersionCode = "0";
var iosVersionCode = "0";
var serverMaintenance = "";
var rewardCode = "0_100";
var rewardMsg = "ko_제목|내용/en_title|description";
app.get('/checkVersion', function (req, res) {
    console.log("ck vs");
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var time = new Date(Date.now() - tzoffset).toISOString();
    res.send({iosVersionCode:iosVersionCode, aosVersionCode:aosVersionCode, serverMaintenance:serverMaintenance, time:time, rewardCode:rewardCode, rewardMsg:rewardMsg});
});
app.post('/setVersion', function(req, res){
    aosVersionCode = req.body.aosVersionCode;
    iosVersionCode = req.body.iosVersionCode;
    console.log("setVersion: aos-" + req.body.aosVersionCode + " ios-" + req.body.iosVersionCode);
    res.send({result:'version code set complete'});
});
app.post('/setServerMaintenance', function(req, res){
    console.log("setServerMaintenance: " + req.body.serverMaintenance);
    serverMaintenance = req.body.serverMaintenance;
    res.send({result:'setServerMaintenance complete'});
});

app.get('/dashboard', function(req, res) {
    // load the single view file
    // (angular will handle the page changes on the front-end)
    res.sendFile('./app/dashboard.html');
});

// timeinfo https://blog.abelotech.com/posts/nodejs-scheduler-cron-timeout-interval/

schedule.scheduleJob('0 * * * *', () => { 
    //console.log("every hour came: " + new Date().toISOString());
    // test
    //Pvp1on1league.resultLeague();
    //Pvptagleague.resultLeague();
    //Pvpteamleague.resultLeague();
    //Legendgirlleague.resultLeague();
}); // run every hour at midnight


schedule.scheduleJob('0 0 * * *', () => {
    console.log("Midnight came: " + new Date().toISOString());
    
}); // run everyday at midnight

schedule.scheduleJob('0 0 * * 0', () => {
    console.log("sunday Midnight came: " + new Date().toISOString());
    //serverMaintenance = "10";
    
    //Pvpteamleague.resultLeague();
     
}); // run everyweek monday at midnight

schedule.scheduleJob('0 0 * * 1', () => {
    console.log("monday Midnight came: " + new Date().toISOString());
    
    //Pvptagleague.resultLeague();

}); // run everyweek tuesday at midnight

schedule.scheduleJob('0 0 * * 2', () => {
    console.log("tuesday Midnight came: " + new Date().toISOString());
    //serverMaintenance = "10";

    //Pvp1on1league.resultLeague();

}); // run everyweek wednesday at midnight

schedule.scheduleJob('10 0 * * 0', () => {
    console.log("Weekly 00:10 came: " + new Date().toISOString());
    //serverMaintenance = "0";
}); // run everyweek monday at midnight

schedule.scheduleJob('0 0 5 * *', () => {
    console.log("monthly Midnight came: " + new Date().toISOString());

    //serverMaintenance = "20";
    Legendgirlleague.resultLeague();
}); // run month 5th day at midnight


schedule.scheduleJob('0 0 20 * *', () => {
    console.log("monthly Midnight came: " + new Date().toISOString());

    //serverMaintenance = "20";
    Legendgirlleague.resultLeague();
}); // run month 20th day at midnight

schedule.scheduleJob('0 0 1 * *', () => {
    console.log("monthly Midnight came: " + new Date().toISOString());

    //Guild.resultLeague();
}); // run month 1st day at midnight

schedule.scheduleJob('20 0 1 * *', () => {
    console.log("monthly Midnight came: " + new Date().toISOString());
    //serverMaintenance = "0";

}); // run month 1 at 00:20
