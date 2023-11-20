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
 
var iap = require('iap');

function onSuccess(validatedData) {
    // validatedData: the actual content of the validated receipt
    // validatedData also contains the original receipt
    var options = {
        ignoreCanceled: true, // Apple ONLY (for now...): purchaseData will NOT contain cancceled items
        ignoreExpired: true // purchaseData will NOT contain exipired subscription items
    };
    // validatedData contains sandbox: true/false for Apple and Amazon
    console.log("setup then, onSuccess: " + validatedData);
    var purchaseData = iap.getPurchaseData(validatedData, options);
    console.log("setup then, purchaseData: " + purchaseData);
}
 
function onError(error) {
    console.log("setup then, onError: " + error);
    // failed to validate the receipt...
}


//http.createServer(function(req, res){
//  var request = url.parse(req.url, true);
//  var path = request.pathname;
//    //console.log("what? " + path + "-path") ;
//    var goToMain = false;
//    // get image for cross promotion in folder /images
//  if (path.endsWith('.jpg') || path.endsWith('.png')) {
//      var fullPath = './images' + path;
//      if (fs.existsSync(fullPath)) {
//          var img = fs.readFileSync(fullPath);
//         res.writeHead(200, {'Content-Type': 'image/gif' });
//         res.end(img, 'binary');
//      }else{
//          goToMain = true;
//      }
//  }else if(path.endsWith('.html')){
//      var fullPath = './html' + path;
//      if (fs.existsSync(fullPath)) {
//          fs.readFile(fullPath, function(error, data) {  
//                if (error) {  
//                    res.writeHead(404);  
//                    res.write(error);  
//                    res.end();  
//                } else {  
//                    res.writeHead(200, {  
//                        'Content-Type': 'text/html'  
//                    });  
//                    res.write(data);  
//                    res.end();  
//                }  
//            }); 
//      }else{
//          goToMain = true;
//      }
//  } else { 
//     goToMain = true;
//  }
//    if(goToMain){
//        fs.readFile('./html/index.html', function(error, data) {  
//                if (error) {  
//                    res.writeHead(404);  
//                    res.write(error);  
//                    res.end();  
//                } else {  
//                    res.writeHead(200, {  
//                        'Content-Type': 'text/html'  
//                    });  
//                    res.write(data);  
//                    res.end();  
//                }  
//            }); 
//    }
//}).listen(8202);
//console.log("html server has started on port 8201");


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

mongoose.connect('mongodb://127.0.0.1:27017/wizard_war', { useNewUrlParser: true });

//db.getCollection('csuserSchema').dropIndexes();

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Gameinfo = require('./models/gameinfo');

// [CONFIGURE ROUTER]
var router = require('./routes')(app, Gameinfo);

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8110;
//var port = 8093; // test 

app.use("/", express.static(__dirname + "/app"));
app.use("/bower_components/angular", express.static(__dirname + "/app/bower_components/angular"));

app.get("/", function(req,res) { res.sendFile(path.join(__dirname, "/app/index.html")); });
app.get("/tax", function(req,res) { res.sendFile(path.join(__dirname, "/app/tax.html")); });

// [RUN SERVER]
var server = app.listen(port, function(){
                        console.log("Express server has started on port " + port)
                        });

app.get('/', function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
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
app.get('/getStat', function (req, res) {
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
app.get('/setStat', function (req, res) {
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
app.post('/setReward', function(req, res){
    rewardCode = req.body.rewardCode;
    rewardMsg = req.body.rewardMsg;
    res.send({result:'reward set complete'});
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

// receipts
app.get('/getReceipts', function (req, res) {
    Receipt.find({}, function(err, receipts) {
//        var receiptMap = {};
//        receipts.forEach(function(receipt) {
//            receiptMap[receipt._id] = receipt;
//        });
        res.send(receipts);  
    });
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

//Arenaleague.resultLeague(); // test 
//Pvp6league.resultLeague(); // test 
//Pvp12league.resultLeague(); // test 
    
// get rates from https://openexchangerates.org/api/latest.json?app_id=50c5bc6804164cf3a0f8a2ef6242cc1a  
rateInfo = {
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  "timestamp": 1558663200,
  "base": "USD",
  "rates": {
    "AED": 3.673181,
    "AFN": 80.2525,
    "ALL": 109.593981,
    "AMD": 479.415742,
    "ANG": 1.875075,
    "AOA": 328.8665,
    "ARS": 45.071439,
    "AUD": 1.451982,
    "AWG": 1.799996,
    "AZN": 1.7025,
    "BAM": 1.75641,
    "BBD": 2,
    "BDT": 84.51685,
    "BGN": 1.749253,
    "BHD": 0.377009,
    "BIF": 1838.465389,
    "BMD": 1,
    "BND": 1.350602,
    "BOB": 6.915278,
    "BRL": 4.041887,
    "BSD": 1,
    "BTC": 0.000126966435,
    "BTN": 69.722172,
    "BWP": 10.741887,
    "BYN": 2.071809,
    "BZD": 2.015784,
    "CAD": 1.347901,
    "CDF": 1649.543091,
    "CHF": 1.003743,
    "CLF": 0.024306,
    "CLP": 696.091494,
    "CNH": 6.933688,
    "CNY": 6.9125,
    "COP": 3322.308632,
    "CRC": 585.255512,
    "CUC": 1,
    "CUP": 25.75,
    "CVE": 99.3985,
    "CZK": 23.130886,
    "DJF": 178.05,
    "DKK": 6.678755,
    "DOP": 50.263724,
    "DZD": 119.556992,
    "EGP": 16.8645,
    "ERN": 14.997145,
    "ETB": 28.588601,
    "EUR": 0.89435,
    "FJD": 2.170699,
    "FKP": 0.789821,
    "GBP": 0.789821,
    "GEL": 2.77,
    "GGP": 0.789821,
    "GHS": 5.192722,
    "GIP": 0.789821,
    "GMD": 49.65,
    "GNF": 9095.297387,
    "GTQ": 7.672664,
    "GYD": 209.489674,
    "HKD": 7.848152,
    "HNL": 24.353958,
    "HRK": 6.641427,
    "HTG": 89.750173,
    "HUF": 291.856096,
    "IDR": 14463.198404,
    "ILS": 3.61329,
    "IMP": 0.789821,
    "INR": 69.689435,
    "IQD": 1188.096014,
    "IRR": 42105,
    "ISK": 123.689812,
    "JEP": 0.789821,
    "JMD": 133.892206,
    "JOD": 0.709001,
    "JPY": 109.667,
    "KES": 101.301512,
    "KGS": 68.708055,
    "KHR": 4033.595519,
    "KMF": 440.500041,
    "KPW": 900,
    "KRW": 1190.955,
    "KWD": 0.304449,
    "KYD": 0.833307,
    "KZT": 378.334415,
    "LAK": 8665.264241,
    "LBP": 1505.703268,
    "LKR": 175.698851,
    "LRD": 184.875377,
    "LSL": 14.400749,
    "LYD": 1.396352,
    "MAD": 9.7002,
    "MDL": 17.9675,
    "MGA": 3666.417728,
    "MKD": 55.262361,
    "MMK": 1538.549859,
    "MNT": 2453.75,
    "MOP": 8.08448,
    "MRO": 357,
    "MRU": 36.7,
    "MUR": 35.4205,
    "MVR": 15.400026,
    "MWK": 720.056761,
    "MXN": 19.03894,
    "MYR": 4.192083,
    "MZN": 62.677964,
    "NAD": 14.400749,
    "NGN": 358.71,
    "NIO": 33.020547,
    "NOK": 8.758509,
    "NPR": 111.558759,
    "NZD": 1.534519,
    "OMR": 0.38499,
    "PAB": 1,
    "PEN": 3.348998,
    "PGK": 3.372364,
    "PHP": 52.47278,
    "PKR": 151.349336,
    "PLN": 3.849886,
    "PYG": 6306.335406,
    "QAR": 3.642315,
    "RON": 4.257214,
    "RSD": 105.484897,
    "RUB": 64.8592,
    "RWF": 903.133788,
    "SAR": 3.74995,
    "SBD": 8.171964,
    "SCR": 13.659302,
    "SDG": 45.111273,
    "SEK": 9.619776,
    "SGD": 1.38019,
    "SHP": 0.789821,
    "SLL": 8390,
    "SOS": 576.028802,
    "SRD": 7.458,
    "SSP": 130.2634,
    "STD": 21050.59961,
    "STN": 22.05,
    "SVC": 8.749693,
    "SYP": 515.016693,
    "SZL": 14.398999,
    "THB": 31.8755,
    "TJS": 9.430456,
    "TMT": 3.499986,
    "TND": 3.007195,
    "TOP": 2.298929,
    "TRY": 6.120671,
    "TTD": 6.748067,
    "TWD": 31.556849,
    "TZS": 2300.1,
    "UAH": 26.238893,
    "UGX": 3760.107962,
    "USD": 1,
    "UYU": 35.174213,
    "UZS": 8455.309117,
    "VEF": 248487.642241,
    "VES": 5626.019454,
    "VND": 23288.649206,
    "VUV": 111.980282,
    "WST": 2.619363,
    "XAF": 586.655399,
    "XAG": 0.06860606,
    "XAU": 0.00077955,
    "XCD": 2.70255,
    "XDR": 0.721402,
    "XOF": 586.655399,
    "XPD": 0.0007576,
    "XPF": 106.72439,
    "XPT": 0.00124845,
    "YER": 250.350747,
    "ZAR": 14.485524,
    "ZMW": 13.008183,
    "ZWL": 322.355011
  }
};
rateJson = rateInfo["rates"];
