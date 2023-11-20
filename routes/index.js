// routes/index.js version control

module.exports = function (app, Gameinfo)
{
    var gameName = "ww";
    var checkGameInfo = function(){
        Gameinfo.findOne({ id: '7'}, function (err, info) {
            if (err) return res.status(500).send({ error: 'database failure' });
            if (!info) {
                var newInfo = new Gameinfo();

                newInfo.id = '7';
                newInfo.name = gameName;
                newInfo.iosver = 1;
                newInfo.nextid = 1;
                //androidver: { type: Number, default: 0 },
                //rewardindex: { type: Number, default: 0 },
                //rewardcontent: { type: String, default: "" }
                newInfo.save(function (err) {
                    if (err) {
                        console.error("**err: " + err);
                    } else {
                        console.log("game info save success");
                    }
                });
                //console.log("**created game info: " + JSON.stringify(newInfo));
                return;
            }
            //console.log("**game info: " + JSON.stringify(info));
            
        });
    };
    checkGameInfo();

    app.post('/cc/setnextid', function (req, res) { // save user
        console.log("setnextid start");
        Gameinfo.findOne({ id:'7' }, function (err, info) {
            if (err) {
                console.log("err: " + err);
                res.json({ error: "noid" });
            }
            info.nextid = parseInt(req.body.id);
            info.save(function (err) {
                if (err) {
                    console.error(err);
                    res.json({ error: "game save failed: " });
                } else {
                    res.json({ result: 1 });
                }
            });
        });
    });

    var tzoffset = 0;//(new Date()).getTimezoneOffset() * 60000;
    // login
    app.post('/cc/adminlogin', function (req, res) {
        //console.log("password: " + req.body.password);
        if(req.body.id == 'admin' && req.body.password == 'rghiri'){
            res.json({result:"access granted"});
        }else{
            res.json({result:"access denied"});
        }
    });
    
    // handle gold minus
    app.post('/cc/handlegoldminus', function(req,res){
        var min = -1;
        Csuser.find({gold:{$lt:min}}, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
                return res.status(500).send({error: 'user not found'});
            }
            var count = 0;
            var ids = "";
            for(var i = 0; i < users.length; i++){
                users[i].gold = 777;
                ids += users[i].id;
                users[i].save(function(err){
                    if(err){
                        console.error("handle odd gold err: " + err);
                    }
                    count++;
                    if(count >= users.length){
                        res.json({result:ids});
                    }
                });
            }
        });
    });
    
    // find tree minus
    app.post('/cc/handletreeminus', function(req,res){
        var min = -1;
        Csuser.find({tree:{$lt:min}}, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
                return res.status(500).send({error: 'user not found'});
            }
            var count = 0;
            var ids = "";
            for(var i = 0; i < users.length; i++){
                users[i].tree = 777;
                ids += users[i].id;
                users[i].save(function(err){
                    if(err){
                        console.error("handle odd gold err: " + err);
                    }
                    count++;
                    if(count >= users.length){
                        res.json({result:ids});
                    }
                });
            }
        });
    });
    
    // handle odd gold
    app.post('/cc/handleoddgold', function(req,res){
        var min = -1;
        var max = 1000000;
        Csuser.find({gold:{$gt:max}}, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
                return res.status(500).send({error: 'user not found'});
            }
            var count = 0;
            var ids = "";
            for(var i = 0; i < users.length; i++){
                users[i].gold = 50000;
                ids += users[i].id;
                users[i].save(function(err){
                    if(err){
                        console.error("handle odd gold err: " + err);
                    }
                    count++;
                    if(count >= users.length){
                        res.json({result:ids});
                    }
                });
            }
        });
    });
    
    // handle odd gem
    app.post('/cc/handleoddgem', function(req,res){
        var min = -1;
        var max = 1000000;
        console.log("handle odd gem");
        Csuser.find({gem:{$gt:max}}, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
                return res.status(500).send({error: 'user not found'});
            }
            
            var count = 0;
            var ids = "id:";
            for (var i = 0; i < users.length; i++) {
                console.log("id: " + users[i].id + "/ gem: " + users[i].gem);
                users[i].gem = 50000;
                ids += users[i].id;
                users[i].save(function(err){
                    if(err){
                        console.error("handle odd gem err: " + err);
                    }
                    count++;
                    if(count >= users.length){
                        res.json({result:ids});
                    }
                });
            }
        });
    });
    
    // handle odd gene
    app.post('/cc/handleoddgene', function(req,res){
        var min = -1;
        var max = 1000000;
        Csuser.find({gene:{$gt:max}}, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
                return res.status(500).send({error: 'user not found'});
            }
            var count = 0;
            var ids = "";
            for(var i = 0; i < users.length; i++){
                users[i].gene = 10000;
                ids += users[i].id;
                users[i].save(function(err){
                    if(err){
                        console.error("handle odd gene err: " + err);
                    }
                    count++;
                    if(count >= users.length){
                        res.json({result:ids});
                    }
                });
            }
        });
    });

    // handle odd soul
    app.post('/cc/handleoddsoul', function (req, res) {
        var min = -1;
        var max = 1000000;
        Csuser.find({ soul: { $gt: max } }, function (err, users) {
            if (err) return res.status(500).send({ error: 'database failure' });
            if (users.length == 0) {
                return res.status(500).send({ error: 'user not found' });
            }
            var count = 0;
            var ids = "";
            for (var i = 0; i < users.length; i++) {
                users[i].soul = 50000;
                ids += users[i].id;
                users[i].save(function (err) {
                    if (err) {
                        console.error("handle odd soul err: " + err);
                    }
                    count++;
                    if (count >= users.length) {
                        res.json({ result: ids });
                    }
                });
            }
        });
    });

    // handle odd trophy
    app.post('/cc/handleoddtrophy', function(req,res){
        var min = -1;
        var max = 1000000;
        Csuser.find({trophy:{$gt:max}}, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
                return res.status(500).send({error: 'user not found'});
            }
            var count = 0;
            var ids = "";
            for(var i = 0; i < users.length; i++){
                users[i].trophy = 1000;
                ids += users[i].id + "_";
                users[i].save(function(err){
                    if(err){
                        console.error("handle odd gold err: " + err);
                    }
                    count++;
                    if(count >= users.length){
                        res.json({result:ids});
                    }
                });
            }
        });
    });
    // find match
    app.post('/cc/findmatch', function(req,res){
        var min = req.body.trophy;
//        let min = 10;
        if(min > 4000){
            min = 4000;
        }else if(min < 1000){
            min = 1100;
        }
        let max = req.body.trophy + 10;
//        console.log("find match for trophy: " + req.body.trophy);
//        {$gt:min, $lt:max}
//        Csuser.find({ $and : [{trophy:{$gt:min}}, {id : {$ne : req.body.id}}, {deck : {$ne : "_"}}, {inventory : {$ne : "_"}}, {deck : {$ne : null}}, {inventory : {$ne : null}}] }
        Csuser.find({ $and : [{trophy: { $lt:max }}, {ban:0}]}
//            {trophy:{$gt:min, $lt:max}}
                    , function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
//                console.log("user not found for match");
                return res.status(500).send({error: 'user not found'});
            }
            
            var now = new Date(Date.now() - tzoffset).toISOString();
            var data = {time: now};//'{"time":' + now;
            var user = users[Math.floor((Math.random() * users.length))]
//            console.log("found user for match: " + user.id);
            data.id = user.id;
            data._id = user._id;
            data.name = user.name;
            data.buildings = user.buildings;
            data.deck = user.deck;
            data.hdck = user.hdck;
            data.gold = user.gold;
            if(user.heropos){
                data.heropos = user.heropos;
            }
            
            if(data.gold < 0){
                data.gold = 0;
            }
            var maxGold = 500;
            if(data.gold > maxGold){
                data.gold = maxGold;
            }
            data.tree = user.tree;
            if(data.tree < 0){
                data.tree = 0;
            }
            var maxTree = 500;
            if(data.tree > maxTree){
                data.tree = maxTree;
            }
            if(user.shield_end){
                var endTime = new Date(user.shield_end);
                if(endTime.getTime() > (new Date(Date.now() - tzoffset)).getTime()){
                    data.gold = 100;
                    data.tree = 100;
                }
            }
//            if(user.id == "5232" || user.id == "2"){
//                console.log(now +" findmatch user.id + " + user.id+ "/" + req.body.id + "->" + user.buildings);
//            }
            data.trophy = user.trophy;
            res.json(data);
        });
    });
    
    // find match
    app.post('/cc/findmatchtest', function(req,res){
        var min = req.body.trophy;
//        let min = 10;
        if(min > 4000){
            min = 4000;
        }
        let max = 60000;
        Csuser.aggregate(
//            { $and : [{trophy: { $gt: min, $lt:max }}, {ban:0}]}
            [
                {
                    $match: { 
                        $and : [
                            {trophy: { $gt: min, $lt:max }}, 
                            {ban:0}
                        ]
                    }
                },
                { $sample: { size: 1 } }
            ]
            
//            {trophy:{$gt:min, $lt:max}}
                    , function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if(users.length == 0){
                return res.status(500).send({error: 'user not found'});
            }
            console.log("** test user found: " + users[0].id);
            var now = new Date(Date.now() - tzoffset).toISOString();
            var data = {time: now};//'{"time":' + now;
            var user = users[0];//[Math.floor((Math.random() * users.length))]
            data.id = user.id;
            data._id = user._id;
            data.name = user.name;
            data.buildings = user.buildings;
            data.deck = user.deck;
            data.hdck = user.hdck;
            data.gold = user.gold;
            if(user.heropos){
                data.heropos = user.heropos;
            }
            
            if(data.gold < 0){
                data.gold = 0;
            }
            var maxGold = 500;
            if(data.gold > maxGold){
                data.gold = maxGold;
            }
            data.tree = user.tree;
            if(data.tree < 0){
                data.tree = 0;
            }
            var maxTree = 500;
            if(data.tree > maxTree){
                data.tree = maxTree;
            }
            if(user.shield_end){
                var endTime = new Date(user.shield_end);
                if(endTime.getTime() > (new Date(Date.now() - tzoffset)).getTime()){
                    data.gold = 100;
                    data.tree = 100;
                }
            }
            
            data.trophy = user.trophy;
            res.json(data);
        });
    });
    
    // find top players
    app.post('/cc/findtopplayers', function(req,res){
//        db.posts.find( //query today up to tonight
//  {"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})
        Csuser
        .find({ $and : [{trophy: { $gt: 100, $lt:60000 }}, {ban:0}]}, ['id', 'name', 'trophy'])
//        .select({})
        .sort({trophy : -1})
        .limit(Number(req.body.count))
        .exec(function(err, doc){
            if(err){
                console.log("find top players err: " + err);
                res.json({error: "failed to get top players"});
                return;
            }
//            console.log("find top players result: " + doc);
//            let max_price = doc[0].price;
            res.json({result: doc});
        });
    });
    
    // find ranking
    app.post('/cc/getrank', function(req,res){
//        console.log("get trohpy rank");
        Csuser.countDocuments({ $and : [{trophy: { $gt: req.body.trophy, $lt:60000 }}, {ban:0}]} , function(err, result){
            if(err){
                console.log("err: " + err);
                res.json({error: "count failed"});
            }
            // count is the result
            res.json({result: result});
    //         age: trophy $gt: 17, $req.body.trophy         res.json({result: user.id});
        });
//        var leaderboard = Csuser.find( {points: {$exists: true}} ).sort({field : -1}).limit(5).toArray();
//        console.log("leaderboard: " + leaderboard);
    });
    
    // add shield
    app.post('/cc/addshield', function(req, res){
//        console.log("addshield:" +  JSON.stringify(req.body));
        Csuser.findOne({id: req.body.id}, function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });
            
            var now;
            if(user.shield_end){
                now = new Date(user.shield_end);
                if(now.getTime() < (new Date(Date.now() - tzoffset)).getTime()){
                    now = new Date(Date.now() - tzoffset);
                }
            }else{
                now = new Date(Date.now() - tzoffset);
            }
            
            now.setHours( now.getHours() + Number(req.body.hour));
            user.shield_end = now.toISOString();
//            console.log("user.shield_end " + user.shield_end);
            user.save(function(err){
                if(err){
                    console.error(err);
                    res.json({error: "save failed"});
                }else{
                    console.error("saved: " + user.shield_end);
                    res.json({result: user.shield_end});
                }
            });
        });
    });
    // add defence record
    app.post('/cc/adddefencerecord', function(req, res){
//        console.log("adddefencerecord:" +  JSON.stringify(req.body));
        Csuser.findOne({id: req.body.id}, function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!user){
                res.json({result: 0});
            }
            if(!user.defence_record) user.defence_record = "";
            user.trophy += Number(req.body.trophy);
            if(user.trophy < 0){
                user.trophy = 0;
            }
            var gold = Number(req.body.gold);
            var tree = Number(req.body.tree);
            if(user.shield_end){
                var endTime = new Date(user.shield_end);
                if(endTime.getTime() > (new Date(Date.now() - tzoffset)).getTime()){
                    gold = 0;
                    tree = 0;
                }else{
                    var now = new Date(Date.now() - tzoffset);
                    now.setHours( now.getHours() + 6);
                    user.shield_end = now.toISOString();
                }
            }else{
                var now = new Date(Date.now() - tzoffset);
                now.setHours( now.getHours() + 6);
                user.shield_end = now.toISOString();
            }
            user.gold += gold;
            if(user.gold < 0){
                user.gold = 0;
            }
            user.tree += tree;
            if(user.tree < 0){
                user.tree = 0;
            }
            user.defence_record = req.body.enemyid + "/" + req.body.name + "/" + req.body.star + "/" + req.body.trophy + "/" + gold + "/" + tree + "_" + user.defence_record;
            
            
//            console.log("split start: " + user.defence_record);
            
            var array = user.defence_record.split("_");
            if(array.length > 6){
                var newStr = "";
                for(var i = 0; i < 5; i++){
                    var str = array[i];
                    if(str.length > 2){
                        newStr += str + "_";
                    }
                }
                user.defence_record = newStr;
            }
            user.save(function(err){
                if(err){
                    console.error("save error" + err);
                    res.json({error: "save failed"});
                    return;
                }else{
                    res.json({result: 1});
                }
            });
        });
    });
    // check playid
    app.post('/cc/checkplayid', function(req, res){
//        console.log("checkplayid data:" +  JSON.stringify(req.body));
        Csuser.findOne({playid: req.body.playid}, function(err, userWithID){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(userWithID) { // user with the name exist
                res.json({result: userWithID.id});
            }else{
                res.json({result: "-1"});
            }
        });
    });
    
    // change name
    app.post('/cc/rename', function(req, res){

        Csuser.findOne({name: req.body.name}, function(err, userWithName){
                if(err) return res.status(500).json({ error: 'database failure' });
                if(userWithName) { // user with the name exist
//                            console.log("error same name exist: ");
                    res.json({error: "same name exist"});
                }else{
                    var callback = function(err, user){
                        user.name = req.body.name;
                        if(err) return res.status(500).json({ error: 'database failure' });
                        user.save(function(err){
                            if(err){
                                console.error(err);
                                res.json({error: "save failed"});
                                return;
                            }
                        });
                        res.json({result: req.body.name});
                    }
                    var param;
                    if(req.body._id){
                        param = {_id: req.body._id}
                    }else if(req.body.id){
                        param = {id: req.body.id}
                    }else{
                        param = {name: req.body.name}
                    }

                    Csuser.findOne(param, callback);
                }
            });
        
    });

    //app.get('/cc/saveusergood', function (req, res) { // save user good
    //    res.send({ test: "itisgood" });
    //});

    app.post('/cc/createuser', function (req, res) {  // create user;
        console.log("createuser data:" + JSON.stringify(req.body));

        Csuser.findOne({ name: req.body.name }, function (err, userWithName) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (userWithName) { // user with the name exist
                console.log("error same name exist: ");
                res.json({ error: "same name exist" });
            } else {
                Gameinfo.findOne({ id:'7'}, function (err, info) {
                    if (err) {
                        console.log("err: " + err);
                        res.json({ error: "count failed" });
                    }
                    var user = new Csuser();
                    user.id = "" + info.nextid;
                    user.playid = user.playid;

                    user.name = req.body.name;
                    user.name = user.name.replace(",", ".");
                    user.name = user.name.replace("_", ".");
                    user.name = user.name.replace("/", ".");
                    var now = new Date(Date.now() - tzoffset).toISOString();
                    user.first_launch_date = now;

                    console.log("createuser save:" + JSON.stringify(user));
                    user.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.json({ error: "user save failed: " });
                        } else {
                            //console.log("result " + user.id);
                            info.nextid++;
                            info.save(function (err) {
                                if (err) {
                                    console.error(err);
                                    res.json({ error: "game save failed: " });
                                } else {
                                    console.log("result " + user.id);

                                    res.json({ id: user.id, _id: user._id, name: req.body.name });
                                }
                            });
                        }
                    });
                });
            }
        });
    });


    // test users   
    //var addTestUsers = function () {
    //    let i = 0;
    //    for (i = 0; i < 100; i++) {
    //        console.log("check " + i);
    //    }

    //    const promiseFunction = () =>
    //        new Promise((resolve) => setTimeout(() => resolve("r1esult"), 10));

    //    let array = Array(100);
    //    // (1) test를 async로 감싸는 대신, for문을 async 즉시실행함수로 감싸도 된다  
    //    for (let i = 0; i < array.length; i++) { 
    //        //const result = await promiseFunction();
    //        array[i] = i;
    //        console.log(array[i]);
    //    }

    //    var saveSingleUser = function (i) {
    //        var user = new Csuser();
    //        user.id = "" + (200 + i);
    //        user.name = "rname" + i;

    //        console.log("saving name: " + user.name);

    //        user.save(function (err) {
    //            if (err) {
    //                console.error(err);
    //                //res.json({ error: "user save failed: " });
    //            } else {
    //                console.log("user saved result " + user.id + "/" + user.name);
    //            }
    //        });
    //    };
    //    const delay = () => {
    //        const randomDelay = Math.floor(Math.random() * 4) * 100;
    //        return new Promise(resolve => setTimeout(resolve, randomDelay))
    //    }
    //    const result = async (array) => {
            
    //        for (const data of array) {
    //            console.log("result array start: " + data);
    //            await delay()
    //                .then(() => {
    //                    console.log("resulting " + data);
    //                    saveSingleUser(data);
    //                })
    //        }
    //    }

    //    result(array);
    //}
    //addTestUsers(); // test 

    app.post('/cc/saveuser', function (req, res) { // save user
        console.log("saveuser data start");
        //console.log("saveuser data:" + JSON.stringify(req.body));

        if (req.body && Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            console.log("body is empty");
            res.json({ error: "data is empty" });
            return;
        }
        //console.log("verpass: " + req.body.verpass);
        if (req.body.verpass) {

        }else if (gameInfoInstance && gameInfoInstance.androidver) {
            if (req.body.aosver || req.body.iosver) {
                if (gameInfoInstance.androidver <= Number(req.body.aosver) || gameInfoInstance.iosver <= Number(req.body.iosver) ) {
                    //console.log("ver match " + gameInfoInstance.androidver + "_" + req.body.aosver);
                } else {
                    console.log("ver not match " + gameInfoInstance.androidver);
                    //res.json({ error: "update might be needed 1" + gameInfoInstance.androidver + "_" + req.body.aosver});
                    return;
                }
            } else {
                //console.log("version not included");
                //res.json({ error: "update might be needed 2" + gameInfoInstance.androidver + "_" + req.body.aosver});
                return;
            }
        } else {
            Gameinfo.findOne({ id: '7' }, function (err, info) {
                if (err) return res.status(500).send({ error: 'database failure' });
                if (!info) {
                    var newInfo = new Gameinfo();

                    newInfo.id = '7';
                    newInfo.name = gameName;
                    newInfo.iosver = 1;
                    newInfo.androidver = 1;
                    newInfo.nextid = 1;
                    newInfo.monsterwave = 0;
                    newInfo.save(function (err) {
                        if (err) {
                            console.error("**err: " + err);
                        } else {
                            console.log("game info save success");
                        }
                    });
                    info = newInfo;
                }
                console.log("**game info saveuser: " + JSON.stringify(info));
                gameInfoInstance = info;

                info.androidver = 1;
                info.iosver = 1;

                info.save(function (err) {
                    if (err) {
                        console.error("**err: " + err);
                        //res.json({ error: "game info not found" });
                    } else {
                        console.log("game info version save success");
                        //res.json(info);
                    }
                });
            });

            console.log("gameinfo instance not found");
        }

        //console.log("name: " + req.body.name);
        var callback = function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });
            if (!user || req.body.id < 0) { // league data not found so create one

                console.log("id nagative");

                Gameinfo.findOne({ id:'7'}, function (err, info) {
                    if(err){
                        console.log("err: " + err);
                        res.json({error: "count failed"});
                    }
                    var count = info.nextid;
                    
                    var user = new Csuser();
                    user.id = "" + count;
                    user.playid = user.playid;
//                    if(req.body.name) user.name = req.body.name;
                    console.log("name: " + req.body.name);
                    Csuser.findOne({name: req.body.name}, function(err, userWithName){
                        if(err) return res.status(500).json({ error: 'database failure' });
                        if(userWithName) { // user with the name exist
                            console.log("error same name exist: ");
                            res.json({error: "same name exist"});
                        } else {
                            user.name = req.body.name;
                            user.name = user.name.replace(",", ".");
                            user.name = user.name.replace("_", ".");
                            user.name = user.name.replace("/", ".");
                            var now = new Date(Date.now() - tzoffset).toISOString();
                            user.first_launch_date = now;
                            
                            user.save(function(err){
                                if(err){
                                    console.error(err);
                                    res.json({error: "user save failed: "});
                                } else {
                                    //console.log("result " + user.id);
                                    info.nextid++;
                                    info.save(function (err) {
                                        if (err) {
                                            console.error(err);
                                            res.json({ error: "game save failed: " });
                                        } else {
                                            console.log("result " + user.id);

                                            res.json({ id: user.id, _id: user._id, name: req.body.name });
                                        }
                                    });
                                }
                            });
                        }
                    });
//                    res.json({result: user.id});
                });
//                return res.status(404).json({ error: 'user not found' });
            } else {
                //console.log("id not nagative look for reall user " );
                if(req.body.id) user.id = req.body.id;
                if (req.body.name) user.name = req.body.name;
                if (req.body.playid) user.playid = req.body.playid;
                if (req.body.exp) user.exp = req.body.exp;
                if (req.body.level) user.level = req.body.level;
                //if (req.body.crystalused) user.crystalused = req.body.crystalused;

                if (req.body.devicename) user.devicename = req.body.devicename;

                if (req.body.crystal) user.crystal = req.body.crystal;
                if (req.body.crystaltoadd) user.crystal += req.body.crystaltoadd;
                //if (req.body.gold) user.gold = req.body.gold;
                if (req.body.ruby) user.ruby = req.body.ruby;
                if (req.body.leaf) user.leaf = req.body.leaf;
                if (req.body.coin) user.coin = req.body.coin;
                if (req.body.devilstone) user.devilstone = req.body.devilstone;
                if (req.body.guild) user.guild = req.body.guild;
                if (req.body.guildinfo) user.guildinfo = req.body.guildinfo;
                if (req.body.guildinvited) user.guildinvited = req.body.guildinvited;

                if (req.body.hammer) user.hammer = req.body.hammer;
                if (req.body.chestLevel) user.chestLevel = req.body.chestLevel;
                if (req.body.chestKey) user.chestKey = req.body.chestKey;
                if (req.body.chestKeyUsed) user.chestKeyUsed = req.body.chestKeyUsed;
                if (req.body.attend) user.attend = req.body.attend;

                if (req.body.wandLevel) user.wandLevel = req.body.wandLevel;
                if (req.body.wandExp) user.wandExp = req.body.wandExp;
                if (req.body.classLevel) user.classLevel = req.body.classLevel;
                if (req.body.classExp) user.classExp = req.body.classExp;
                if (req.body.fameLevel) user.fameLevel = req.body.fameLevel;
                if (req.body.fameExp) user.fameExp = req.body.fameExp;
                if (req.body.belongLevel) user.belongLevel = req.body.belongLevel;
                if (req.body.belongExp) user.belongExp = req.body.belongExp;

                if (req.body.unlockHeroSlot) user.unlockHeroSlot = req.body.unlockHeroSlot;
                if (req.body.unlockMagicSlot) user.unlockMagicSlot = req.body.unlockMagicSlot;
                if (req.body.statPoint) user.statPoint = req.body.statPoint;

                if (req.body.iap_list_month) user.iap_list_month = req.body.iap_list_month;
                if (req.body.iap_found_date) user.iap_found_date = req.body.iap_found_date;
                if (req.body.iap_list) user.iap_list = req.body.iap_list;
                if (req.body.iap_total) user.iap_total = req.body.iap_total;
                if (req.body.post) user.post = req.body.post;
                if (req.body.rewarded_index) user.rewarded_index = req.body.rewarded_index;
                if (req.body.ban) user.ban = req.body.ban;
                if (req.body.synccount) user.synccount = req.body.synccount;
                if (req.body.ticketmanager) user.ticketmanager = req.body.ticketmanager;
                //if (req.body.last_launch_date) {
                //    user.last_launch_date = req.body.last_launch_date;
                //}
                //    var now = new Date(Date.now() - tzoffset).toISOString();
                //    user.last_launch_date = now;
                //}

                //if (req.body.first_launch_date) data.first_launch_date = user.first_launch_date;

                //
                if (req.body.pvp_rwd_1on1) user.pvp_rwd_1on1 = req.body.pvp_rwd_1on1;
                if (req.body.pvp_rwd_tag) user.pvp_rwd_tag = req.body.pvp_rwd_tag;
                if (req.body.pvp_rwd_team) user.pvp_rwd_team = req.body.pvp_rwd_team;
                if (req.body.pvp_five_1on1) user.pvp_five_1on1 = req.body.pvp_five_1on1;
                if (req.body.pvp_five_tag) user.pvp_five_tag = req.body.pvp_five_tag;
                if (req.body.pvp_five_team) user.pvp_five_team = req.body.pvp_five_team;
                //if (req.body.pvp_trophy_1on1)   user.pvp_trophy_1on1    = req.body.pvp_trophy_1on1;
                //if (req.body.pvp_trophy_tag)    user.pvp_trophy_tag     = req.body.pvp_trophy_tag;
                //if (req.body.pvp_trophy_team)   user.pvp_trophy_team    = req.body.pvp_trophy_team;
                if (req.body.legend_girl_rwd) user.legend_girl_rwd = req.body.legend_girl_rwd;
                if (req.body.pvp_rwd_1on1_ticket) user.pvp_rwd_1on1_ticket = req.body.pvp_rwd_1on1_ticket;
                if (req.body.pvp_rwd_tag_ticket) user.pvp_rwd_tag_ticket = req.body.pvp_rwd_tag_ticket;
                if (req.body.pvp_rwd_team_ticket) user.pvp_rwd_team_ticket = req.body.pvp_rwd_team_ticket;
                if (req.body.legend_girl_rwd_team_ticket) user.legend_girl_rwd_team_ticket = req.body.legend_girl_rwd_team_ticket;
                if (req.body.legend_girl_level) user.legend_girl_level = req.body.legend_girl_level;
                if (req.body.legend_girl_damage) user.legend_girl_damage = req.body.legend_girl_damage;
                if (req.body.legend_girl_damage_once) user.legend_girl_damage_once = req.body.legend_girl_damage_once;

                if (req.body.pvp_rwd_1on1_refill_start_time) user.pvp_rwd_1on1_refill_start_time = req.body.pvp_rwd_1on1_refill_start_time;
                if (req.body.pvp_rwd_tag_refill_start_time) user.pvp_rwd_tag_refill_start_time = req.body.pvp_rwd_tag_refill_start_time;
                if (req.body.pvp_rwd_team_refill_start_time) user.pvp_rwd_team_refill_start_time = req.body.pvp_rwd_team_refill_start_time;
                if (req.body.legend_girl_rwd_team_refill_start_time) user.legend_girl_rwd_team_refill_start_time = req.body.legend_girl_rwd_team_refill_start_time;


                if (req.body.monthlyEvent) user.monthlyEvent = req.body.monthlyEvent;

                if (req.body.pvpReward1On1) user.pvpReward1On1 = req.body.pvpReward1On1;
                if (req.body.pvpRewardTag	) user.pvpRewardTag	= req.body.pvpRewardTag             ;
                if (req.body.pvpRewardTeam) user.pvpRewardTeam = req.body.pvpRewardTeam             ;
                if (req.body.legendGirlReward) user.legendGirlReward = req.body.legendGirlReward    ;

                if (req.body.unitsMerging) user.unitsMerging	 = req.body.unitsMerging;
                if (req.body.usedStatPoint) 	usedStatPoint	=user.usedStatPoint                                  ;
                if (req.body.statBuffLevelHp	) user.statBuffLevelHp	= req.body.statBuffLevelHp    ;
                if (req.body.statBuffLevelStr	) user.statBuffLevelStr	= req.body.statBuffLevelStr   ;
    if (req.body.statBuffLevelMp) user.statBuffLevelMp = req.body.statBuffLevelMp                     ;
    if (req.body.statBuffLevelInt) user.statBuffLevelInt = req.body.statBuffLevelInt                  ;

    if (req.body.dailyPassLastReceivedDay) user.dailyPassLastReceivedDay = req.body.dailyPassLastReceivedDay;
    if (req.body.dailyRewardLastReceivedDay) user.dailyRewardLastReceivedDay = req.body.dailyRewardLastReceivedDay          ;
    if (req.body.dailyRewardContinuedDayCount) user.dailyRewardContinuedDayCount = req.body.dailyRewardContinuedDayCount    ;


    if (req.body.currentMissionIndex) user.currentMissionIndex = req.body.currentMissionIndex                                     ;
    if (req.body.currentMissionProcessCount) user.currentMissionProcessCount = req.body.urrentMissionProcessCount                 ;
                                                                                                                                  ;
    if (req.body.dailyMissionProcessCountArray) user.dailyMissionProcessCountArray = req.body.dailyMissionProcessCountArray       ;
    if (req.body.dailyMissionMaxCountArray) user.dailyMissionMaxCountArray = req.body.dailyMissionMaxCountArray                   ;
    if (req.body.dailyMissionRewardedArray) user.dailyMissionRewardedArray = req.body.dailyMissionRewardedArray                   ;
    if (req.body.questIndexArray) user.questIndexArray = req.body.questIndexArray                                                 ;
                if (req.body.questProcessArray	) user.questProcessArray	= req.body.questProcessArray                          ;
    if (req.body.questRewardedArray) user.questRewardedArray = req.body.questRewardedArray;
                                                

    if (req.body.itemList) user.itemList = req.body.itemList;
                if (req.body.collectableList) user.collectableList = req.body.collectableList;
                if (req.body.totemList) user.totemList = req.body.totemList;

    if (req.body.accountLevel) user.accountLevel = req.body.accountLevel;

                if (req.body.alchemistQuestDone) user.alchemistQuestDone = req.body.alchemistQuestDone;
                if (req.body.droneQuestDone) user.droneQuestDone = req.body.droneQuestDone;

    if (req.body.isTutorialDone) user.isTutorialDone = req.body.isTutorialDone;


    if (req.body.shortcutSkills) user.shortcutSkills = req.body.shortcutSkills                  ;
    if (req.body.shortcutItems) user.shortcutItems = req.body.shortcutItems                     ;
    if (req.body.slashLevel) user.slashLevel	= req.body.slashLevel                           ;
    if (req.body.arrowLevel) user.arrowLevel = req.body.arrowLevel                              ;
                if (req.body.fireBallLevel	) user.fireBallLevel	= req.body.fireBallLevel    ;
    if (req.body.lightningLevel) user.lightningLevel = req.body.lightningLevel                  ;
                if (req.body.slashSkills	) user.slashSkills	= req.body.slashSkills          ;
    if (req.body.arrowSkills) user.arrowSkills = req.body.arrowSkills                           ;
    if (req.body.fireBallSkills) user.fireBallSkills	= req.body.fireBallSkills               ;
    if (req.body.lightningSkills) user.lightningSkills = req.body.lightningSkills;
    if (req.body.statLevel) user.statLevel = req.body.statLevel;

                if (req.body.goldTicket) user.goldTicket = req.body.goldTicket;
                if (req.body.pvpTicket) user.pvpTicket = req.body.pvpTicket;
                if (req.body.dungeonTicket) user.dungeonTicket = req.body.dungeonTicket;
                if (req.body.dungeonProgress) user.dungeonProgress = req.body.dungeonProgress;
                if (req.body.totemslot) user.totemslot = req.body.totemslot;

    if (req.body.equippedHeroInfo) user.equippedHeroInfo = req.body.equippedHeroInfo;

    if (req.body.hero0) user.hero0 = req.body.hero0;
                if (req.body.hero1	) user.hero1	= req.body.hero1    ;
                if (req.body.hero2	) user.hero2	= req.body.hero2    ;
                if (req.body.hero3	) user.hero3	= req.body.hero3    ;
                if (req.body.hero4	) user.hero4	= req.body.hero4    ;
                if (req.body.hero5	) user.hero5	= req.body.hero5    ;
                if (req.body.hero6	) user.hero6	= req.body.hero6    ;
                if (req.body.hero7	) user.hero7	= req.body.hero7    ;
                if (req.body.hero8	)user.hero8	= req.body.hero8    ;
                if (req.body.hero9	)user.hero9	= req.body.hero9    ;
                if (req.body.hero10	)user.hero10	= req.body.hero10   ;
                if (req.body.hero11	)user.hero11	= req.body.hero11   ;
                if (req.body.hero12	)user.hero12	= req.body.hero12   ;
                if (req.body.hero13	)user.hero13	= req.body.hero13   ;
                if (req.body.hero14	)user.hero14	= req.body.hero14   ;
                if (req.body.hero15	)user.hero15	= req.body.hero15   ;
                if (req.body.hero16	)user.hero16	= req.body.hero16   ;
                if (req.body.hero17	)user.hero17	= req.body.hero17   ;
                if (req.body.hero18	)user.hero18	= req.body.hero18   ;
                if (req.body.hero19	)user.hero19	= req.body.hero19   ;
                if (req.body.hero20	) user.hero20	= req.body.hero20   ;
                if (req.body.hero21	) user.hero21	= req.body.hero21   ;
                if (req.body.hero22	) user.hero22	= req.body.hero22   ;
                if (req.body.hero23	) user.hero23	= req.body.hero23   ;
                if (req.body.hero24	) user.hero24	= req.body.hero24   ;
    if (req.body.hero25) user.hero25 = req.body.hero25;
    if (req.body.hero26) user.hero26 = req.body.hero26             ;
    if (req.body.hero27) user.hero27 = req.body.hero27             ;
    if (req.body.hero28) user.hero28 = req.body.hero28;
                if (req.body.hero29	) user.hero29	= req.body.hero29 ;
                if (req.body.hero30	) user.hero30	= req.body.hero30 ;
                if (req.body.hero31	) user.hero31	= req.body.hero31 ;
                if (req.body.hero32	) user.hero32	= req.body.hero32 ;
                if (req.body.hero33	) user.hero33	= req.body.hero33 ;
                if (req.body.hero34	) user.hero34	= req.body.hero34 ;
                if (req.body.hero35	) user.hero35	= req.body.hero35 ;
                if (req.body.hero36	) user.hero36	= req.body.hero36 ;
                if (req.body.hero37	) user.hero37	= req.body.hero37 ;
                if (req.body.hero38	) user.hero38	= req.body.hero38 ;
                if (req.body.hero39	) user.hero39	= req.body.hero39 ;
                if (req.body.hero40	) user.hero40	= req.body.hero40 ;
                if (req.body.hero41	) user.hero41	= req.body.hero41 ;
                if (req.body.hero42	) user.hero42	= req.body.hero42 ;
                if (req.body.hero43	) user.hero43	= req.body.hero43 ;
                if (req.body.hero44	) user.hero44	= req.body.hero44 ;
                if (req.body.hero45	) user.hero45	= req.body.hero45 ;
                if (req.body.hero46	) user.hero46	= req.body.hero46 ;
                if (req.body.hero47	) user.hero47	= req.body.hero47 ;
    if (req.body.hero48) user.hero48 = req.body.hero48                     ;
    if (req.body.hero49) user.hero49 = req.body.hero49;

    if (req.body.petEquipIndex) user.petEquipIndex = req.body.petEquipIndex;

    if (req.body.pet0) user.pet0 = req.body.pet0;
                if (req.body.pet1	) user.pet1	= req.body.pet1      ;
                if (req.body.pet2	) user.pet2	= req.body.pet2      ;
                if (req.body.pet3	) user.pet3	= req.body.pet3      ;
                if (req.body.pet4	) user.pet4	= req.body.pet4      ;
                if (req.body.pet5	) user.pet5	= req.body.pet5      ;
                if (req.body.pet6	) user.pet6	= req.body.pet6      ;
                if (req.body.pet7	) user.pet7	= req.body.pet7      ;
                if (req.body.pet8	) user.pet8	= req.body.pet8      ;
    if (req.body.pet9) user.pet9 = req.body.pet9;
    if (req.body.pet10) user.pet10 = req.body.pet10;
                if (req.body.pet11	) user.pet11	= req.body.pet11    ;
                if (req.body.pet12	) user.pet12	= req.body.pet12    ;
                if (req.body.pet13	) user.pet13	= req.body.pet13    ;
                if (req.body.pet14	) user.pet14	= req.body.pet14    ;
                if (req.body.pet15	) user.pet15	= req.body.pet15    ;
                if (req.body.pet16	) user.pet16	= req.body.pet16    ;
                if (req.body.pet17	) user.pet17	= req.body.pet17    ;
                if (req.body.pet18	) user.pet18	= req.body.pet18    ;
                if (req.body.pet19	) user.pet19	= req.body.pet19    ;
                if (req.body.pet20	) user.pet20	= req.body.pet20    ;
                if (req.body.pet21	) user.pet21	= req.body.pet21    ;
                if (req.body.pet22	) user.pet22	= req.body.pet22    ;
                if (req.body.pet23	) user.pet23	= req.body.pet23    ;
                if (req.body.pet24	) user.pet24	= req.body.pet24    ;
                if (req.body.pet25	) user.pet25	= req.body.pet25    ;
                if (req.body.pet26	) user.pet26	= req.body.pet26    ;
                if (req.body.pet27	) user.pet27	= req.body.pet27    ;
                if (req.body.pet28) user.pet28 = req.body.pet28;
                if (req.body.pet29) user.pet29 = req.body.pet29;

                if (req.body.itemInfo) user.itemInfo = req.body.itemInfo;
                if (req.body.collectableInfo) user.collectableInfo = req.body.collectableInfo;
                if (req.body.researchInfo) user.researchInfo = req.body.researchInfo;
                if (req.body.couponUsed) user.couponUsed = req.body.couponUsed;
                if (req.body.isNewHeroRewardReceived) user.isNewHeroRewardReceived = req.body.isNewHeroRewardReceived;

                if (req.body.skill0) user.skill0 = req.body.skill0;
                if (req.body.skill1) user.skill1 = req.body.skill1;
                if (req.body.skill2) user.skill2 = req.body.skill2;
                if (req.body.skill3) user.skill3 = req.body.skill3;
                if (req.body.skill4) user.skill4 = req.body.skill4;
                if (req.body.skill5) user.skill5 = req.body.skill5;
                if (req.body.skill6) user.skill6 = req.body.skill6;
                if (req.body.skill7) user.skill7 = req.body.skill7;
                if (req.body.skill8) user.skill8 = req.body.skill8;
                if (req.body.skill9) user.skill9 = req.body.skill9;
                if (req.body.totempreset0) user.totempreset0 = req.body.totempreset0;
                if (req.body.totempreset1) user.totempreset1 = req.body.totempreset1;
                if (req.body.totempreset2) user.totempreset2 = req.body.totempreset2;
                if (req.body.totempreset3) user.totempreset3 = req.body.totempreset3;
                if (req.body.totempreset4) user.totempreset4 = req.body.totempreset4;
   

                user.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({error: "save failed"});
                        return;
                    }
                });
                res.json({result: 1});
            };
        }
        var param;
        if(req.body._id){
            param = {_id: req.body._id}
        }else if(req.body.id){
            param = {id: req.body.id}
        }else{
            param = {name: req.body.name}
        }
        
        Csuser.findOne(param, callback);
    });
    
    app.post('/cc/addcrystal', function (req, res) {
        var param;
        if (req.body._id) {
            param = { _id: req.body._id }
        } else if (req.body.id) {
            param = { id: req.body.id }
        } else {
            param = { name: req.body.name }
        }
        Csuser.findOne(param, function (err, user) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (!user) {
                res.json({ error: "user not found" });
            } else {
                var now = new Date(Date.now() - tzoffset).toISOString();
                var data = { time: now };//'{"time":' + now;
                
                user.crystal += Number(req.body.crystaltoadd);
                data.crystal = user.crystal;
                user.save(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });

                res.json(data);
            }
        });
    });

    app.post('/cc/crystaluse', function(req, res){
        var param;
        if(req.body._id){
            param = {_id: req.body._id}
        }else if(req.body.id){
            param = {id: req.body.id}
        }else{
            param = {name: req.body.name}
        }
        Csuser.findOne(param, function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!user) {
                res.json({error: "user not found"});
            }else{
                var now = new Date(Date.now() - tzoffset).toISOString();
                var data = { time: now };//'{"time":' + now;
                
                if (user.crystal >= Number(req.body.crystaltouse)) {
                    user.crystal -= Number(req.body.crystaltouse);
                    user.crystalused += Number(req.body.crystaltouse);
                    data.crystal = user.crystal;
                } else {
                    console.error({ error: "not enough crystal" });
                    data.crystal = user.crystal;
                    data.error = "not enough crystal";
                }
//                console.log("get user data result:" +  JSON.stringify(data));
//                user.last_launch_date = now; 

                user.save(function (err) {
                    if(err){
                        console.error(err);
                    }
                });
                
                res.json(data);
            }
        });
    });

    app.post('/cc/keyuse', function (req, res) {
        var param;
        if (req.body._id) {
            param = { _id: req.body._id }
        } else if (req.body.id) {
            param = { id: req.body.id }
        } else {
            param = { name: req.body.name }
        }
        Csuser.findOne(param, function (err, user) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (!user) {
                res.json({ error: "user not found" });
            } else {
                var now = new Date(Date.now() - tzoffset).toISOString();
                var data = {result:1 };//'{"time":' + now;

                if (user.chestKey >= Number(req.body.keytouse)) {
                    user.chestKey -= Number(req.body.keytouse);
                    user.chestKeyUsed += Number(req.body.keytouse);
                    data.chestKey = user.chestKey;
                } else {
                    console.error({ error: "not enough key" });
                    data.key = user.key;
                    data.error = "not enough key";
                }

                user.save(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });

                res.json(data);
            }
        });
    });

    // get user data  
    app.post('/cc/getentireuserdata', function (req, res) {
        console.log("get user data:" + JSON.stringify(req.body));
        var param;
        if (req.body._id && req.body._id !== '') {
            param = { _id: req.body._id }
            //console.log("search _id");
        } else if (req.body.id && req.body.id !== '') {
            param = { id: req.body.id }
            //console.log("search id");
        } else if (req.body.playid && req.body.playid !== '') {
            param = { playid: req.body.playid }
            //console.log("search playid");
        } else {
            param = { name: req.body.name }
            //console.log("search name");
        }
        Csuser.findOne(param, function (err, user) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (!user) {
                res.json({ error: "user not found" });
            } else {
                res.json(user);
            }
        });
    });
    // get user data  
    app.post('/cc/getuserdata', function(req, res){
        //console.log("get user data req body:" +  JSON.stringify(req.body));

        //if (gameInfoInstance && gameInfoInstance.androidver) {
        //    if (req.body.aosver || req.body.iosver) {
        //        if (gameInfoInstance.androidver === Number(req.body.aosver) || gameInfoInstance.iosver === req.body.iosver) {
        //            //console.log("ver match " + gameInfoInstance.androidver);
        //        } else {
        //            //console.log("ver not match " + gameInfoInstance.androidver);
        //            res.json({ error: "update might be needed" });
        //            return;
        //        }
        //    } else {
        //        //console.log("version not included");
        //        res.json({ error: "update might be needed" });
        //        return;
        //    }
        //} else {
        //    console.log("gameinfo instance not found");
        //}

        var param;
        if (req.body._id && req.body._id !== '') {
            param = { _id: req.body._id }
            //console.log("search _id");
        } else if (req.body.id && req.body.id !== ''){
            param = { id: req.body.id }
            //console.log("search id");
        } else if (req.body.playid && req.body.playid !== '') {
            param = { playid: req.body.playid }
            //console.log("search playid");
        } else{
            param = { name: req.body.name }
            //console.log("search name");
        }
        Csuser.findOne(param, function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });
            if (!user) {
                res.json({error: "user not found"});
            }else{
                var now = new Date(Date.now() - tzoffset).toISOString();
                var data = {time: now};//'{"time":' + now;
                
                if(req.body.id) {
                    data.id = user.id;
                }

                data._id = user._id;
                data.id = user.id;
                data.name = user.name;
                data.playid = user.playid;
                data.ban = user.ban;
                if (req.body.devicename) data.devicename = user.devicename;
                if (req.body.inventory) data.inventory = user.inventory;
                if (req.body.deck) data.deck = user.deck;
                if (req.body.exp) data.exp = user.exp;
                if (req.body.level) data.level = user.level;
                if (req.body.crystalused) data.crystalused = user.crystalused;
                //console.log("about to crystal " + req.body.crystal);
                if (req.body.crystal) {
                    //console.log("here is crystal")
                    data.crystal = user.crystal;
                }
                if (req.body.coin) {
                    data.coin = user.coin;
                    //console.log("here is coin")
                }
                if (req.body.ruby) data.ruby = user.ruby;
                if (req.body.leaf) data.leaf = user.leaf;

                
                if (req.body.devilstone) data.devilstone = user.devilstone;
                if (req.body.guild) data.guild = user.guild;
                if (req.body.guildinfo) data.guildinfo = user.guildinfo;
                if (req.body.guildinvited) data.guildinvited = user.guildinvited;

                if (req.body.hammer) data.hammer = user.hammer;
                if (req.body.chestLevel) data.chestLevel = user.chestLevel;
                if (req.body.chestKey) data.chestKey = user.chestKey;
                if (req.body.chestKeyUsed) data.chestKeyUsed = user.chestKeyUsed;
                if (req.body.attend) data.attend = user.attend;

                if (req.body.wandLevel) data.wandLevel = user.wandLevel;
                if (req.body.wandExp) data.wandExp = user.wandExp;
                if (req.body.classLevel) data.classLevel = user.classLevel;
                if (req.body.classExp) data.classExp = user.classExp;
                if (req.body.fameLevel) data.fameLevel = user.fameLevel;
                if (req.body.fameExp) data.fameExp = user.fameExp;
                if (req.body.belongLevel) data.belongLevel = user.belongLevel;
                if (req.body.belongExp) data.belongExp = user.belongExp;

                if (req.body.unlockHeroSlot) data.unlockHeroSlot = user.unlockHeroSlot;
                if (req.body.unlockMagicSlot) data.unlockMagicSlot = user.unlockMagicSlot;
                if (req.body.statPoint) data.statPoint = user.statPoint;

                if (req.body.iap_list_month) data.iap_list_month = user.iap_list_month;
                if (req.body.iap_found_date) data.iap_found_date = user.iap_found_date;
                if (req.body.iap_list) data.iap_list = user.iap_list;
                if (req.body.iap_total) data.iap_total = user.iap_total;

                data.post = user.post;
                data.rewarded_index = user.rewarded_index;
                if (req.body.synccount) data.synccount = user.synccount;
                if (req.body.ticketmanager) data.ticketmanager = user.ticketmanager;

                if (req.body.timezonecheck) {

                    //var now = new Date(Date.now() - tzoffset);
                    var nowNew = new Date(Date.now() + parseInt(req.body.timezonecheck) * 1000);
                    //console.log('before timezone' + now.getUTCHours() + '/' + req.body.last_launch_date);
                    //console.log('before date' + now.getUTCDate() + '/' + req.body.last_launch_date);
                    //now = new Date(Date.now() + parseInt(req.body.last_launch_date)*1000);
                    console.log('user.last_launch_date ' + user.last_launch_date);
                    console.log('user timezone ' + req.body.timezonecheck);

                    if (user.last_launch_date) {
                        //var userDate = new Date(user.last_launch_date);
                        //console.log('nowNew ' + nowNew);
                        //console.log('user.last_launch_date.getUTCDate()' + user.last_launch_date.getUTCDate());

                        console.log('date compare ' + nowNew.getUTCDate() + '---' + user.last_launch_date.getUTCDate());
                        //console.log('getDate ' + nowNew.getUTCDate() + '/' + nowNew.getUTCHours() + '_' + user.last_launch_date.getUTCDate() + '/' + user.last_launch_date.getUTCHours());

                        if (nowNew.getUTCDate() === user.last_launch_date.getUTCDate()) {
                            console.log('Both dates are equal');
                        } else {
                            console.log('Both dates are different!');
                            user.post += '|dailycrystal-5000';
                            data.post = user.post;

                        }
                    }
                    
                    data.last_launch_date = new Date(Date.now());
                    user.last_launch_date = nowNew;
                }
                if (req.body.first_launch_date) data.first_launch_date = user.first_launch_date;
                
                if (req.body.pvp_five_1on1) data.pvp_five_1on1 = user.pvp_five_1on1;
                if (req.body.pvp_five_tag) data.pvp_five_tag = user.pvp_five_tag;
                if (req.body.pvp_five_team) data.pvp_five_team = user.pvp_five_team;
                if (req.body.pvp_rwd_1on1) data.pvp_rwd_1on1 = user.pvp_rwd_1on1;
                if (req.body.pvp_rwd_tag) data.pvp_rwd_tag = user.pvp_rwd_tag;
                if (req.body.pvp_rwd_team) data.pvp_rwd_team = user.pvp_rwd_team;
                if (req.body.pvp_trophy_1on1)   data.pvp_trophy_1on1    = user.pvp_trophy_1on1;
                if (req.body.pvp_trophy_tag)    data.pvp_trophy_tag     = user.pvp_trophy_tag;
                if (req.body.pvp_trophy_team)   data.pvp_trophy_team    = user.pvp_trophy_team;
                if (req.body.legend_girl_rwd) data.legend_girl_rwd = user.legend_girl_rwd;

                if (req.body.legend_girl_level) data.legend_girl_level = user.legend_girl_level;
                if (req.body.legend_girl_damage) data.legend_girl_damage = user.legend_girl_damage;
                if (req.body.legend_girl_damage_once) data.legend_girl_damage_once = user.legend_girl_damage_once;


                if (req.body.pvp_rwd_1on1_ticket) data.pvp_rwd_1on1_ticket = user.pvp_rwd_1on1_ticket;                               
                if (req.body.pvp_rwd_tag_ticket) data.pvp_rwd_tag_ticket = user.pvp_rwd_tag_ticket;                                  
                if (req.body.pvp_rwd_team_ticket) data.pvp_rwd_team_ticket = user.pvp_rwd_team_ticket;                               
                if (req.body.legend_girl_rwd_team_ticket) data.legend_girl_rwd_team_ticket = user.legend_girl_rwd_team_ticket;       
                                                                                                                                                                     
                if (req.body.pvp_rwd_1on1_refill_start_time) data.pvp_rwd_1on1_refill_start_time = user.pvp_rwd_1on1_refill_start_time;                              
                if (req.body.pvp_rwd_tag_refill_start_time) data.pvp_rwd_tag_refill_start_time = user.pvp_rwd_tag_refill_start_time;                                 
                if (req.body.pvp_rwd_team_refill_start_time) data.pvp_rwd_team_refill_start_time = user.pvp_rwd_team_refill_start_time;                              
                if (req.body.legend_girl_rwd_team_refill_start_time) data.legend_girl_rwd_team_refill_start_time = user.legend_girl_rwd_team_refill_start_time;

                if (req.body.monthlyEvent) data.monthlyEvent = user.monthlyEvent;

                if (req.body.pvpReward1On1) data.pvpReward1On1 = user.pvpReward1On1                                                                                        ;
                if (req.body.pvpRewardTag) data.pvpRewardTag = user.pvpRewardTag                                                                                           ;
                if (req.body.pvpRewardTeam) data.pvpRewardTeam = user.pvpRewardTeam                                                                                       ;
                if (req.body.legendGirlReward) data.legendGirlReward = user.legendGirlReward;

                if (req.body.unitsMerging) data.unitsMerging = user.unitsMerging                ;
                if (req.body.usedStatPoint) data.usedStatPoint = user.usedStatPoint                ;
                if (req.body.statBuffLevelHp	) data.statBuffLevelHp	=user.statBuffLevelHp     ;
                if (req.body.statBuffLevelStr	) data.statBuffLevelStr	=user.statBuffLevelStr    ;
                if (req.body.statBuffLevelMp) data.statBuffLevelMp = user.statBuffLevelMp     ;
                if (req.body.statBuffLevelInt) data.statBuffLevelInt = user.statBuffLevelInt;

                if (req.body.dailyPassLastReceivedDay) data.dailyPassLastReceivedDay = user.dailyPassLastReceivedDay;
                if (req.body.dailyRewardLastReceivedDay) data.dailyRewardLastReceivedDay = user.dailyRewardLastReceivedDay;
                if (req.body.dailyRewardContinuedDayCount) data.dailyRewardContinuedDayCount = user.dailyRewardContinuedDayCount;


                if (req.body.currentMissionIndex) data.currentMissionIndex = user.currentMissionIndex;
                if (req.body.currentMissionProcessCount) data.currentMissionProcessCount = user.currentMissionProcessCount;

                if (req.body.dailyMissionProcessCountArray) data.dailyMissionProcessCountArray = user.dailyMissionProcessCountArray   ;
                if (req.body.dailyMissionMaxCountArray) data.dailyMissionMaxCountArray = user.dailyMissionMaxCountArray                   ;
                if (req.body.dailyMissionRewardedArray) data.dailyMissionRewardedArray = user.dailyMissionRewardedArray                  ;
                if (req.body.questIndexArray) data.questIndexArray = user.questIndexArray                                                 ;
                if (req.body.questProcessArray) data.questProcessArray = user.questProcessArray                                           ;
                if (req.body.questRewardedArray) data.questRewardedArray = user.questRewardedArray                                      ;
                

                if (req.body.itemList) data.itemList = user.itemList;
                if (req.body.collectableList) data.collectableList = user.collectableList;
                if (req.body.totemList) data.totemList = user.totemList;

                if (req.body.accountLevel) data.accountLevel = user.accountLevel;

                if (req.body.alchemistQuestDone) data.alchemistQuestDone = user.alchemistQuestDone;
                if (req.body.droneQuestDone) data.droneQuestDone = user.droneQuestDone;

                if (req.body.isTutorialDone) data.isTutorialDone = user.isTutorialDone;


                if (req.body.shortcutSkills) data.shortcutSkills = user.shortcutSkills;
                if (req.body.shortcutItems) data.shortcutItems = user.shortcutItems             ;
                if (req.body.slashLevel) data.slashLevel =	user.slashLevel                    ;
                if (req.body.arrowLevel) data.arrowLevel = user.arrowLevel                    ;
                if (req.body.fireBallLevel) data.fireBallLevel = user.fireBallLevel             ;
                if (req.body.lightningLevel) data.lightningLevel = user.lightningLevel        ;
                if (req.body.slashSkills) data.slashSkills =user.slashSkills                   ;
                if (req.body.arrowSkills) data.arrowSkills = user.arrowSkills                   ;
                if (req.body.fireBallSkills) data.fireBallSkills = user.fireBallSkills          ;
                if (req.body.lightningSkills) data.lightningSkills = user.lightningSkills   ;
                if (req.body.statLevel) data.statLevel = user.statLevel                         ;

                if (req.body.goldTicket) data.goldTicket = user.goldTicket;
                if (req.body.pvpTicket) data.pvpTicket = user.pvpTicket;
                if (req.body.dungeonTicket) data.dungeonTicket = user.dungeonTicket;
                if (req.body.dungeonProgress) data.dungeonProgress = user.dungeonProgress;
                if (req.body.totemslot) data.totemslot = user.totemslot;

                if (req.body.equippedHeroInfo) data.equippedHeroInfo = user.equippedHeroInfo;

                //console.log("about to hero0 " + req.body.hero0);
                if (req.body.hero0) {
                    //console.log("hero0 " + user.hero0);
                    data.hero0 = user.hero0;
                }
                if (req.body.hero1	) data.hero1	=user.hero1         ;
                if (req.body.hero2	) data.hero2	=user.hero2         ;
                if (req.body.hero3	) data.hero3	=user.hero3         ;
                if (req.body.hero4	) data.hero4	=user.hero4         ;
                if (req.body.hero5	) data.hero5	=user.hero5         ;
                if (req.body.hero6	) data.hero6	=user.hero6         ;
                if (req.body.hero7	) data.hero7	=user.hero7         ;
                if (req.body.hero8	) data.hero8	=user.hero8         ;
                if (req.body.hero9	) data.hero9	=user.hero9         ;
                if (req.body.hero10	) data.hero10	=user.hero10        ;
                if (req.body.hero11	) data.hero11	=user.hero11        ;
                if (req.body.hero12	) data.hero12	=user.hero12        ;
                if (req.body.hero13	) data.hero13	=user.hero13        ;
                if (req.body.hero14	) data.hero14	=user.hero14        ;
                if (req.body.hero15	) data.hero15	=user.hero15        ;
                if (req.body.hero16	) data.hero16	=user.hero16        ;
                if (req.body.hero17	) data.hero17	=user.hero17        ;
                if (req.body.hero18	) data.hero18	=user.hero18        ;
                if (req.body.hero19) data.hero19 = user.hero19        ;
                if (req.body.hero20) data.hero20 = user.hero20;         ;
                if (req.body.hero21	) data.hero21	=user.hero21       ;
                if (req.body.hero22	) data.hero22	=user.hero22       ;
                if (req.body.hero23	) data.hero23	=user.hero23       ;
                if (req.body.hero24) data.hero24	=user.hero24       ;
                if (req.body.hero25	) data.hero25	=user.hero25       ;
                if (req.body.hero26	) data.hero26	=user.hero26       ;
                if (req.body.hero27	) data.hero27	=user.hero27       ;
                if (req.body.hero28	) data.hero28	=user.hero28       ;
                if (req.body.hero29	) data.hero29	=user.hero29       ;
                if (req.body.hero30	) data.hero30	=user.hero30       ;
                if (req.body.hero31	) data.hero31	=user.hero31       ;
                if (req.body.hero32	) data.hero32	=user.hero32       ;
                if (req.body.hero33	) data.hero33	=user.hero33       ;
                if (req.body.hero34	) data.hero34	=user.hero34       ;
                if (req.body.hero35	) data.hero35	=user.hero35       ;
                if (req.body.hero36	) data.hero36	=user.hero36       ;
                if (req.body.hero37	) data.hero37	=user.hero37       ;
                if (req.body.hero38	) data.hero38	=user.hero38       ;
                if (req.body.hero39) data.hero39 = user.hero39       ;
                if (req.body.hero40) data.hero40 = user.hero40          ;
                if (req.body.hero41	) data.hero41	=user.hero41       ;
                if (req.body.hero42	) data.hero42	=user.hero42       ;
                if (req.body.hero43	) data.hero43	=user.hero43       ;
                if (req.body.hero44) data.hero44	=user.hero44       ;
                if (req.body.hero45	) data.hero45	=user.hero45       ;
                if (req.body.hero46	) data.hero46	=user.hero46       ;
                if (req.body.hero47	) data.hero47	=user.hero47       ;
                if (req.body.hero48) data.hero48 = user.hero48       ;
                if (req.body.hero49) data.hero49 = user.hero49          ;

                if (req.body.petEquipIndex) data.petEquipIndex = user.petEquipIndex;

                if (req.body.pet0) data.pet0 = user.pet0;
                if (req.body.pet1	) data.pet1=	user.pet1    ;
                if (req.body.pet2	) data.pet2=	user.pet2    ;
                if (req.body.pet3	) data.pet3=	user.pet3    ;
                if (req.body.pet4	) data.pet4=	user.pet4    ;
                if (req.body.pet5	) data.pet5=	user.pet5    ;
                if (req.body.pet6	) data.pet6=	user.pet6    ;
                if (req.body.pet7	) data.pet7=	user.pet7    ;
                if (req.body.pet8) data.pet8 = user.pet8    ;
                if (req.body.pet9) data.pet9 = user.pet9        ;
                if (req.body.pet10	) data.pet10	=user.pet10  ;
                if (req.body.pet11	) data.pet11	=user.pet11  ;
                if (req.body.pet12) data.pet12 = user.pet12  ;
                if (req.body.pet13) data.pet13 = user.pet13;
                if (req.body.pet14	) data.pet14	=user.pet14         ;
                if (req.body.pet15	) data.pet15	=user.pet15         ;
                if (req.body.pet16	) data.pet16	=user.pet16         ;
                if (req.body.pet17	) data.pet17	=user.pet17         ;
                if (req.body.pet18	) data.pet18	=user.pet18         ;
                if (req.body.pet19	) data.pet19	=user.pet19         ;
                if (req.body.pet20	) data.pet20	=user.pet20         ;
                if (req.body.pet21	) data.pet21	=user.pet21         ;
                if (req.body.pet22	) data.pet22	=user.pet22         ;
                if (req.body.pet23	) data.pet23	=user.pet23         ;
                if (req.body.pet24	) data.pet24	=user.pet24         ;
                if (req.body.pet25	) data.pet25	=user.pet25         ;
                if (req.body.pet26	) data.pet26	=user.pet26         ;
                if (req.body.pet27) data.pet27 = user.pet27             ;
                if (req.body.pet28) data.pet28 = user.pet28              ;
                if (req.body.pet29) data.pet29 = user.pet29              ;

                if (req.body.itemInfo) data.itemInfo = user.itemInfo;
                if (req.body.collectableInfo) data.collectableInfo = user.collectableInfo;
                if (req.body.researchInfo) data.researchInfo = user.researchInfo;
                if (req.body.couponUsed) data.couponUsed = user.couponUsed;
                if (req.body.isNewHeroRewardReceived) data.isNewHeroRewardReceived = user.isNewHeroRewardReceived;

                if (req.body.skill0) data.skill0 = user.skill0;
                if (req.body.skill1) data.skill1 = user.skill1;
                if (req.body.skill2) data.skill2 = user.skill2;
                if (req.body.skill3) data.skill3 = user.skill3;
                if (req.body.skill4) data.skill4 = user.skill4;
                if (req.body.skill5) data.skill5 = user.skill5;
                if (req.body.skill6) data.skill6 = user.skill6;
                if (req.body.skill7) data.skill7 = user.skill7;
                if (req.body.skill8) data.skill8 = user.skill8;
                if (req.body.skill9) data.skill9 = user.skill9;
                if (req.body.totempreset0) data.totempreset0 = user.totempreset0;
                if (req.body.totempreset1) data.totempreset1 = user.totempreset1;
                if (req.body.totempreset2) data.totempreset2 = user.totempreset2;
                if (req.body.totempreset3) data.totempreset3 = user.totempreset3;
                if (req.body.totempreset4) data.totempreset4 = user.totempreset4;

                if (gameInfoInstance) {
                    //console.log("get user data 1");
                    if (gameInfoInstance.androidver) {
                        data.androidver = gameInfoInstance.androidver;
                        //console.log("set android ver " + gameInfoInstance.androidver);
                    } else {
                        //console.log("get user data 3 " + gameInfoInstance);
                    }
                    if (gameInfoInstance.iosver) {
                        data.iosver = gameInfoInstance.iosver;
                        //console.log("set iosver ver " + gameInfoInstance.iosver);
                    } else {
                        //console.log("get user data 3 " + gameInfoInstance);
                    }

                    data.monsterwave = gameInfoInstance.monsterwave;
                    data.rewardCode = gameInfoInstance.rewardCode;
                    data.rewardMsg = gameInfoInstance.rewardMsg;
                    if (gameInfoInstance.maintenance) {
                        data.maintenance = gameInfoInstance.maintenance;
                        console.log("set maintenance ver " + gameInfoInstance.iosver);
                    } else {
                        //console.log("get user data 3 " + gameInfoInstance);
                    }
                } else {
                    //console.log("get user data 4");
                }

                //console.log("get user data result:" + JSON.stringify(data));
                //user.last_launch_date = now; 
                user.save(function(err){
                    if(err){
                        console.error(err);
                    }
                    console.log("user saved: " + user.post);
                });
                
                res.json(data);
            }
        });
    });
    // user login
    app.post('/cc/userlogin', function(req, res){
        Csuser.findOne({name: req.body.name}, function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!user) {
                res.json({error: "user not found"});
            }else{
                if(req.body.password === user.password){
                    res.json({result: user.id});
                }else{
                    res.json({error: "invalid password"});
                }
            }
        });
    });
    
    // user name change
    app.post('/cc/changename', function(req, res){
        Csuser.findOne({name: req.body.name}, function(err, userWithName){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(userWithName) { // user with the name exist
                res.json({error: "same name exist"});
            }else{
                Csuser.findOne({id: req.body.id}, function(err, user){
                    if(err) return res.status(500).json({ error: 'database failure' });
                    if(user){
                        user.name = req.body.name;
                        user.save(function(err){
                            if(err){
                                console.error(err);
                                res.json({error: "save failed"});
                            }else{
                                res.json({result: "sucess", name:req.body.name});
                            }
                        });
                    }else{
                        res.json({error: "cannot find user with id"});
                    }
                });
            }
        });
    });
    var gameInfoInstance = {};
    // get gameinfo
    app.post('/cc/getgameinfo', function (req, res) {
        Gameinfo.findOne({ id: '7' }, function (err, info) {
            if (err) return res.status(500).send({ error: 'database failure' });
            if (!info) {
                var newInfo = new Gameinfo();

                newInfo.id = '7';
                newInfo.name = gameName;
                newInfo.iosver = 1;
                newInfo.nextid = 1;
                newInfo.monsterwave = 0;
                newInfo.save(function (err) {
                    if (err) {
                        console.error("**err: " + err);
                    } else {
                        console.log("game info save success");
                    }
                });
                info = newInfo;
            }
            console.log("**game info get gameinfo: " + JSON.stringify(info));
            gameInfoInstance = info;
            res.json(info);
        });
    });
    // set versions
    app.post('/cc/setversion', function (req, res) {
        Gameinfo.findOne({ id: '7' }, function (err, info) {
            if (err) return res.status(500).send({ error: 'database failure' });
            if (!info) {
                var newInfo = new Gameinfo();

                newInfo.id = '7';
                newInfo.name = gameName;
                newInfo.iosver = 1;
                newInfo.nextid = 1;
                newInfo.monsterwave = 0;
                newInfo.save(function (err) {
                    if (err) {
                        console.error("**err: " + err);
                    } else {
                        console.log("game info save success");
                    }
                });
                info = newInfo;
            }
            console.log("**game info set version: " + JSON.stringify(info));
            gameInfoInstance = info;

            info.androidver = req.body.aosVersionCode;
            info.iosver = req.body.iosVersionCode;

            info.save(function (err) {
                if (err) {
                    console.error("**err: " + err);
                    res.json({ error: "game info not found" });
                } else {
                    console.log("game info version save success");
                    res.json(info);
                }
            });
        });
    });

    // set setMonsterWave
    app.post('/cc/setMonsterWave', function (req, res) {
        Gameinfo.findOne({ id: '7' }, function (err, info) {
            if (err) return res.status(500).send({ error: 'database failure' });
            if (!info) {
                var newInfo = new Gameinfo();

                newInfo.id = '7';
                newInfo.name = gameName;
                newInfo.iosver = 1;
                newInfo.nextid = 1;
                newInfo.monsterwave = 0;
                newInfo.save(function (err) {
                    if (err) {
                        console.error("**err: " + err);
                    } else {
                        console.log("game info save success");
                    }
                });
                info = newInfo;
            }
            //console.log("**game info: " + JSON.stringify(info));
            gameInfoInstance = info;
            console.log("** req.body.monsterwave: " + JSON.stringify(req.body));
            info.monsterwave = req.body.monsterwave;

            info.save(function (err) {
                if (err) {
                    console.error("**err: " + err);
                    res.json({ error: "game info not found" });
                } else {
                    console.log("game info version save success");
                    res.json(info);
                }
            });
        });
    });

    // set setServerMaintenance
    app.post('/cc/setServerMaintenance', function (req, res) {
        Gameinfo.findOne({ id: '7' }, function (err, info) {
            if (err) return res.status(500).send({ error: 'database failure' });
            if (!info) {
                var newInfo = new Gameinfo();

                newInfo.id = '7';
                newInfo.name = gameName;
                newInfo.iosver = 1;
                newInfo.nextid = 1;
                newInfo.monsterwave = 0;
                newInfo.save(function (err) {
                    if (err) {
                        console.error("**err: " + err);
                    } else {
                        console.log("game info save success");
                    }
                });
                info = newInfo;
            }
            console.log("**game info set maintenance: " + JSON.stringify(info));
            gameInfoInstance = info;

            info.maintenance = req.body.serverMaintenance;

            info.save(function (err) {
                if (err) {
                    console.error("**err: " + err);
                    res.json({ error: "game info not found" });
                } else {
                    console.log("game info version save success");
                    res.json(info);
                }
            });
        });
    });

    app.post('/cc/setReward', function (req, res) {
        Gameinfo.findOne({ id: '7' }, function (err, info) {
            if (err) return res.status(500).send({ error: 'database failure' });
            if (!info) {
                var newInfo = new Gameinfo();

                newInfo.id = '7';
                newInfo.name = gameName;
                newInfo.iosver = 1;
                newInfo.nextid = 1;
                newInfo.monsterwave = 0;
                newInfo.save(function (err) {
                    if (err) {
                        console.error("**err: " + err);
                    } else {
                        console.log("game info save success");
                    }
                });
                info = newInfo;
            }
            console.log("**game info in setReward: " + JSON.stringify(info));
            gameInfoInstance = info;

            info.rewardCode = req.body.rewardCode;
            info.rewardMsg = req.body.rewardMsg;
            
            info.save(function (err) {
                if (err) {
                    console.error("**err: " + err);
                    res.json({ error: "game info not found" });
                } else {
                    console.log("game info version save success setReward");
                    res.json(info);
                }
            });
        });
    });

    // get set coupon
    app.post('/cc/setcoupon', function (req, res) {
        Gameinfo.findOne({ id: '7' }, function (err, info) {
            if (err) return res.status(500).send({ error: 'database failure' });
            info.coupon = req.body.coupon;

            console.log("**game info set coupon: " + JSON.stringify(info));
            info.save(function (err) {
                if (err) {
                    console.error("**err: " + err);
                } else {
                    console.log("game info save success");
                    res.json({ result: 1 });
                }
            });
        });
    });

    // get user
    app.post('/cc/getuser', function(req, res){
        var callback = function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });

            if(!user) { // user data not found
                res.json({error: "user not found"});
            }else{
                res.json(user);
            }
        }
        if(req.body.name){
//            console.log("name: " + req.body.name);
            Csuser.findOne({name: req.body.name}, callback);
        } else if (req.body.playid) {
            //            console.log("name: " + req.body.name);
            Csuser.findOne({ playid: req.body.playid }, callback);
        }else{
//            console.log("id: " + req.body.id);
            Csuser.findOne({id: req.body.id}, callback);
        }
    });
    
    // delete user
    app.post('/cc/deleteuser', function(req, res){
        console.log("delete start");
        Csuser.deleteOne({ id: req.body.id }, function (err) {
            if (err) {
                console.log("err: " + err);
            }
            res.json({ result:1 });
            console.log("delete done");
            // deleted at most one tank document
        });
//        console.log("delete end");
    });
    
    // send post
    app.post('/cc/sendpost', function(req, res){
        var callback = function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });

            if(!user) { // user data not found
                res.json({error: "user not found"});
            }else{
                user.post += req.body.message + ",";
                user.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({error: "save failed"});
                        return;
                    }
                    res.json("save success");
                });
            }
        }
        Csuser.findOne({id: req.body.id}, callback);
    });
    
    // Ban
    app.post('/cc/ban', function(req, res){
        var callback = function(err, user){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!user) { // user data not found
                res.json({error: "user not found"});
            }else{
                user.ban = req.body.ban;
                user.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({error: "save failed"});
                        return;
                    }
                    res.json("save success");
                });
            }
        }
        Csuser.findOne({id: req.body.id}, callback);
    });
    
    // get arean rank
    app.post('/cc/getarenarank', function(req,res){
        return res.status(500).send({error: 'udpate game'});
//        console.log("rank req id: " + req.body.id);
//        Csuser.find({arena_score:{$gt:0}}).sort({arena_score : 1}) // sort -1 for ascending
////                                            .limit(Number(req.body.count))
//                                            .exec(function(err, users){
//            if(err) return res.status(500).send({error: 'database failure'});
////            console.log("found users for match: " + users.length);
//            var names = "";
//            var you;
//            var str;
//            for(var i = 0; i < users.length; i++){
//                str = "";
//                if(i < 100){
//                     str = users[i].name + "_" + users[i].arena_score + "_" + users[i].id + ",";
//                }
////                console.log(i + ". " + str);
//                if(str.length > 0){
//                    names += str;
//                }
//                if(users[i].id == req.body.id){
//                    you = i;
//                }
//            }
//            
//            res.json({names:names, you:you, total:users.length});
//        });
    });
}
