// routes/index.js version control

module.exports = function (app, Gameinfo)
{
    var gameName = "vc";
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

        if(req.body.id == 'admin' && req.body.password == 'vcadmin'){
            var info = {};
            
            res.json({result:"access granted", info:info});
        }else{
            res.json({result:"access denied"});
        }
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

    app.post('/createGame', function (req, res) {  // create user;
        console.log("createuser data:" + JSON.stringify(req.body));

        Gameinfo.findOne({ name: req.body.name }, function (err, userWithName) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (userWithName) { // user with the name exist
                // console.log("error same name exist: ");
                res.json({ error: "same name exist" });
            } else {
                var user = new Gameinfo();
                    user.name = req.body.name;
                    var now = new Date(Date.now() - tzoffset).toISOString();
                    user.createDate = now;

                    // console.log("createuser save:" + JSON.stringify(user));
                    user.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.json({ error: "user save failed: " });
                        } else {
                            res.json({ name: req.body.name });
                        }
                    });
            }
        });
    });

    app.post('/getGame', function (req, res) {  // create user;
        // console.log("createuser data:" + JSON.stringify(req.body));

        Gameinfo.findOne({ name: req.body.name }, function (err, userWithName) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (userWithName) { // user with the name exist
                // console.log("error same name exist: ");
                res.json(userWithName);
            } else {
                res.json({ error: "same name exist" });
            }
        });
    });

    app.post('/getVer', function (req, res) {  // create user;
        // console.log("createuser data:" + JSON.stringify(req.body));

        Gameinfo.findOne({ name: req.body }, function (err, userWithName) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (userWithName) { // user with the name exist
                // console.log("error same name exist: ");
                var info = "";
                info += userWithName.ver + ",";
                info += userWithName.maint;
                res.json(info);
            } else {
                res.json({ error: "same name exist" });
            }
        });
    });


    app.post('/serVer', function (req, res) {  // create user;
        // console.log("serVer data:" + JSON.stringify(req.body));

        Gameinfo.findOne({ name: req.body.name }, function (err, userWithName) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (userWithName) { // user with the name exist
                // console.log("error same name exist: ");
                userWithName.ver = req. body.ver;
                userWithName.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.json({ error: "user save failed: " });
                    } else {
                        res.json(userWithName);
                    }
                });
            } else {
                res.json({ error: "same name exist" });
            }
        });
    });

    app.post('/changePassword', function (req, res) {  // create user;
        // console.log("changePassword data:" + JSON.stringify(req.body));

        Gameinfo.findOne({ name: req.body.name }, function (err, userWithName) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (userWithName) { // user with the name exist
                // console.log("error same name exist: ");
                userWithName.pw = req. body.pw;
                userWithName.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.json({ error: "user save failed: " });
                    } else {
                        res.json(userWithName);
                    }
                });
            } else {
                res.json({ error: "same name exist" });
            }
        });
    });
    app.post('/onMaint', function (req, res) {  // create user;
        // console.log("onMaint data:" + JSON.stringify(req.body));

        Gameinfo.findOne({ name: req.body.name }, function (err, userWithName) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (userWithName) { // user with the name exist
                // console.log("error same name exist: ");
                userWithName.maint = req. body.maint;
                userWithName.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.json({ error: "user save failed: " });
                    } else {
                        res.json(userWithName);
                    }
                });
            } else {
                res.json({ error: "same name exist" });
            }
        });
    });
}
