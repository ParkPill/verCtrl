// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope, $http) {
    console.log("contorller ");
//    var user = new Object();
//    user.id = "id33";
//    user.mission = "diall mission";
//    user.stage = 77;
//    user.post = "myMessage";
//    var data = "{";
//    data += "id:" + user.id;
//    data += "mission:" + user.mission;
//    data += "stage:" + user.stage;
//    data += "post:" + user.post;
//    data += "}";
//    console.log("data: " + data);

//    $http({
//        method: 'POST',
//        url: '/cc/saveuser',
//        headers : { 'Content-Type' : 'application/json' },
//        data: {'id': "7",
//                'name': "박필",
//                'equip': "21,5,6,7,0,0,0,0"}
//    }).then(function (response){
//        console.log("response1: " + JSON.stringify(response.data));
//        $scope.result = "result: " + response.data;
//    },function (error){
//        console.log("error: " + JSON.stringify(response.data));
//        $scope.result = "error: " + JSON.stringify(response.data);
//    });

//    $http({
//        method: 'POST',
//        url: '/cc/getuser',
//        headers : { 'Content-Type' : 'application/json' },
//        data: {'id': "7"}
//    }).then(function (response){
//        console.log("response: " + response.data);
//        $scope.user_data = "user: " + response.data;
//    },function (error){
//        console.log("error: " + JSON.stringify(error) );
//    });
    var rateInfo;
    var rateJson;
    $scope.getReceipt = function(){
        console.log("let get receipts");
        $http({
            method: 'POST',
            url: '/getReceiptsInfo',
            data: {'offset':'0', 'count':'100'},
            headers : { 'Content-Type' : 'application/json' }
        }).then(function (response){
            console.log("receipts response: " + JSON.stringify(response.data));
//            $scope.receipts = response.data;
            
            $scope.receiptsSuccess = [];
            var successToday = [];
            
            $scope.receiptsFailed = [];
            response.data.requestedreceipts.forEach(function(entry) {
                if(entry.pass == 0){
//                    $scope.receiptsFailed.push(entry);
                } else {
                    if (entry.id === '4') {

                    } else {
                        $scope.receiptsSuccess.push(entry);
                    }
                }
            });
            $scope.receiptsFailedCount = response.data.failedcount;
            
            $scope.accumulatedGross = Math.floor(response.data.grosstotal).toLocaleString();
            $scope.accumulatedGrossYesterday = Math.floor(response.data.grosstoyesterday).toLocaleString();
            $scope.accumulatedGrossToday = Math.floor(response.data.grosstoday).toLocaleString();
            $scope.accumulatedGrossThisMonth = Math.floor(response.data.grossthirtydays).toLocaleString();
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onDeleteReceipt = function(_id){
        console.log("_id: " + _id);
        $http({
            method: 'POST',
            url: '/deletereceipt',
            headers : { 'Content-Type' : 'application/json' },
            data: {'_id': _id}
        }).then(function (response){
            console.log("deletereceipt response: " + JSON.stringify(response.data));
            $scope.getReceipt();
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onLogin = function(){
        var theID = document.getElementById("loginID").value;
        var thePassword = document.getElementById("loginPassword").value;
        console.log("theID; " + theID);
        $http({
            method: 'POST',
            url: '/cc/adminlogin',
            headers : { 'Content-Type' : 'application/json' },
            data: {'id': theID, 'password': thePassword}
        }).then(function (response){
            console.log("response: " + response.data);
            if(response.data.result == "access denied"){
                console.log("login failed");
                document.getElementById("main").style.display = "none"; //"block"
            }else{
                console.log("login success");
                document.getElementById("main").style.display = "block";
                document.getElementById("login").style.display = "none";
                $scope.login_id = document.getElementById("loginID").value;
                
                
                var info = response.data.info;
                document.getElementById("btnMaint").style.background = info.Dungeon0On>0?"green":"red";
                
//                $http({
//                    method: 'POST',
//                    url: '/cc/getuserdata',
//                    headers : { 'Content-Type' : 'application/json' },
//                    data: {'id': "30", 'post':"1", 'stage':"1", 'name':"1", 'equip':"1"}
//                }).then(function (response){
//                    console.log("response: " + response.data);
//                    $scope.user_data = response.data;
//                },function (error){
//                    console.log("error: " + JSON.stringify(error) );
//                });

            }
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    
    $scope.onLogout = function(){
        console.log("logout");
        location.reload();
    }
    $scope.onDelete = function(){
        console.log("onDelete");
        $http({
            method: 'POST',
            url: '/cc/deleteuser',
            headers : { 'Content-Type' : 'application/json' },
            data: {'id': document.getElementById("playerIDForDelete").value}
        }).then(function (response){
            console.log("response: " + response.data);
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.ban = function(isBan){
        $http({
            method: 'POST',
            url: '/cc/ban',
            headers : { 'Content-Type' : 'application/json' },
            data: {'id': document.getElementById("playerIDForBan").value, 'ban':isBan}
        }).then(function (response){
            console.log("response: " + response.data);
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    
    $scope.onForceResultLegendGirl = function () {
        var jsonData = { 'name': 'dashboard'};
        
        $http({
            method: 'POST',
            url: '/cc/arnforceresult',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("pLegendGirl response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("pLegendGirl error: " + JSON.stringify(error));
        });
    }

    $scope.testLegendGirlRank = function () {
        var jsonData = { 'name': 'dashboard' };
        $http({
            method: 'POST',
            url: '/cc/legendgirlleaguetest',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("pTeam response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("pTeam error: " + JSON.stringify(error));
        });
    }
    $scope.testTeamPVPRank = function () {
        var jsonData = { 'name': 'dashboard' };
        $http({
            method: 'POST',
            url: '/cc/pvpteamleaguetest',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("pTeam response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("pTeam error: " + JSON.stringify(error));
        });
    }
    $scope.testTagPVPRank = function () {
        var jsonData = { 'name': 'dashboard' };
        $http({
            method: 'POST',
            url: '/cc/pvptagleaguetest',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("pTeam response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("pTeam error: " + JSON.stringify(error));
        });
    }
    $scope.test1on1PVPRank = function () {
        var jsonData = { 'name': 'dashboard' };
        $http({
            method: 'POST',
            url: '/cc/pvp1on1leaguetest',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("pTeam response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("pTeam error: " + JSON.stringify(error));
        });
    }
    $scope.onPVPTeamDataSet = function(){
        var value = document.getElementById("pTeamTrophy").value;
        var jsonData = {'name': document.getElementById("pTeamNameForSingleDataSet").value };
        jsonData['trophy'] = value;
        console.log("pTeam set:" + JSON.stringify(jsonData));
        $http({
            method: 'POST',
            url: '/cc/setpteamdata',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("pTeam response: " + JSON.stringify(response.data));
        },function (error){
                console.log("pTeam error: " + JSON.stringify(error) );
        });
    }
    $scope.onPVP1On1DataSet = function(){
        var value = document.getElementById("pvp1On1Trophy").value;
        var jsonData = {'name': document.getElementById("pvp1On1NameForSingleDataSet").value };
        jsonData['trophy'] = value;
        
        $http({
            method: 'POST',
            url: '/cc/setp1on1data',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("p1On1 response: " + JSON.stringify(response.data));
        },function (error){
            console.log("p1On1 error: " + JSON.stringify(error) );
        });
    }
    $scope.onPVPTagDataSet = function () {
        var value = document.getElementById("pvpTagTrophy").value;
        var jsonData = { 'name': document.getElementById("pvpTagNameForSingleDataSet").value };
        jsonData['trophy'] = value;

        $http({
            method: 'POST',
            url: '/cc/setptagdata',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("pTag response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("pTag error: " + JSON.stringify(error));
        });
    }
    $scope.onPVPLegendGirlDataSet = function () {
        var value = document.getElementById("pvpLegendGirlTrophy").value;
        var jsonData = { 'name': document.getElementById("pvpLegendGirlNameForSingleDataSet").value };
        jsonData['score'] = value;

        $http({
            method: 'POST',
            url: '/cc/setarndata',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("pTag response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("pTag error: " + JSON.stringify(error));
        });
    }
    $scope.onPowerRankDataDelete = function () {
        //var value = document.getElementById("powerRankScore").value;
        var jsonData = { 'name': document.getElementById("powerRankNameForSingleDataSet").value };
        //jsonData['score'] = value;

        $http({
            method: 'POST',
            url: '/cc/deletepowerrankdata',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("powerRank response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("powerRank error: " + JSON.stringify(error));
        });
    }
    $scope.onSingleDataSet = function(){
        var dataName = document.getElementById("dataForSingleDataSet").value;
        var value = document.getElementById("valueForSingleDataSet").value;
        var jsonData = {'id': document.getElementById("playerIDForSingleDataSet").value, 'verpass':true };
        jsonData[dataName] = value;
        $http({
            method: 'POST',
            url: '/cc/saveuser',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onSingleGuildDataSet = function () {
        var dataName = document.getElementById("dataForSingleGuildDataSet").value;
        var value = document.getElementById("valueForSingleGuildDataSet").value;
        var jsonData = { 'name': document.getElementById("guildNameForSingleGuildDataSet").value };
        jsonData[dataName] = value;
        $http({
            method: 'POST',
            url: '/cc/guildsv',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onHandleOddGold = function(){
        var jsonData = {'id': '-2' }; // meaning less
        $http({
            method: 'POST',
            url: '/cc/handleoddgold',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onHandleOddGem = function(){
        var jsonData = {'id': '-2' }; // meaning less
        $http({
            method: 'POST',
            url: '/cc/handleoddgem',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onHandleOddGene = function () {
        var jsonData = { 'id': '-2' }; // meaning less
        $http({
            method: 'POST',
            url: '/cc/handleoddgene',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onHandleOddSoul = function () {
        var jsonData = { 'id': '-2' }; // meaning less
        $http({
            method: 'POST',
            url: '/cc/handleoddsoul',
            headers: { 'Content-Type': 'application/json' },
            data: jsonData
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onHandleOddTrophy = function(){
        var jsonData = {'id': '-2' }; // meaning less
        $http({
            method: 'POST',
            url: '/cc/handleoddtrophy',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onHandleGoldMinus = function(){
        var jsonData = {'id': '-2' };
        $http({
            method: 'POST',
            url: '/cc/handlegoldminus',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onHandleTreeMinus = function(){
        var jsonData = {'id': '-2' };
        $http({
            method: 'POST',
            url: '/cc/handletreeminus',
            headers : { 'Content-Type' : 'application/json' },
            data: jsonData
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onBan = function(){
        $scope.ban(1);
    }
    $scope.onUnBan = function(){
        $scope.ban(0);
    }
    
    $scope.onSearchByID = function(){
        $http({
            method: 'POST',
            url: '/cc/getuser',
            headers : { 'Content-Type' : 'application/json' },
            data: {'id': document.getElementById("playerID").value}
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
            $scope.user_data = response.data;
            
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onGetGameInfo = function () {
        $http({
            method: 'POST',
            url: '/cc/getgameinfo',
            data: { coupon: "" },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response.data));
            $scope.user_data = response.data;
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onCouponClick = function () {
        $http({
            method: 'POST',
            url: '/cc/setcoupon',
            data: { coupon: document.getElementById("coupon").value },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onSetVersionCodeClick = function(){
        $http({
            method: 'POST',
            url: '/cc/setVersion',
            data: {aosVersionCode: document.getElementById("aosVersionCode").value, iosVersionCode: document.getElementById("iosVersionCode").value},
            headers : { 'Content-Type' : 'application/json' }
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }

    $scope.onMonsterWaveOn = function () {
        $http({
            method: 'POST',
            url: '/cc/setMonsterWave',
            data: { monsterwave: 1 },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }

    $scope.onMonsterWaveOff = function () {
        $http({
            method: 'POST',
            url: '/cc/setMonsterWave',
            data: { monsterwave: 0 },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response.data));
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onServerMaintenanceClick = function(){
        $http({
            method: 'POST',
            url: '/cc/setServerMaintenance',
            headers : { 'Content-Type' : 'application/json' },
            data: {'serverMaintenance': document.getElementById("serverMaintenance").value}
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onRewardSetClick = function(){
        $http({
            method: 'POST',
            url: '/cc/setReward',
            headers : { 'Content-Type' : 'application/json' },
            data: {'rewardCode': document.getElementById("rewardCode").value, 'rewardMsg': document.getElementById("rewardMsg").value}
        }).then(function (response){
            console.log("response: " + JSON.stringify(response.data));
        },function (error){
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onSearchByName = function(){
        $http({
            method: 'POST',
            url: '/cc/getuser',
            headers : { 'Content-Type' : 'application/json' },
            data: {'name': document.getElementById("playerName").value}
        }).then(function (response){
            console.log("response: " + response.data);
            $scope.user_data = response.data;
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.onSearchByPlayID = function () {
        $http({
            method: 'POST',
            url: '/cc/getuser',
            headers: { 'Content-Type': 'application/json' },
            data: { 'playid': document.getElementById("playID").value }
        }).then(function (response) {
            console.log("response: " + response.data);
            $scope.user_data = response.data;
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onSearchByGuildName = function () {
        $http({
            method: 'POST',
            url: '/cc/getguilddata',
            headers: { 'Content-Type': 'application/json' },
            data: { 'name': document.getElementById("guildName").value }
        }).then(function (response) {
            console.log("response: " + response.data);
            $scope.user_data = response.data;
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onSendPost = function(){
        $http({
            method: 'POST',
            url: '/cc/sendpost',
            headers : { 'Content-Type' : 'application/json' },
            data: {'id': document.getElementById("playerIDForPost").value,
                  'message': document.getElementById("messageForPost").value}
        }).then(function (response){
            console.log("response: " + response.data);
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    document.getElementById("main").style.display = "none"; //"block"
    
    $scope.result = "Loading...";
    
});