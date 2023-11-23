// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope, $http) {
    console.log("contorller ");
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
                
                $scope.user_data = response.data;
            }
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    
    $scope.onLogout = function(){
        console.log("logout");
        location.reload();
    }
    $scope.onSetVersionCodeClick = function(){
        $http({
            method: 'POST',
            url: '/serVer',
            data: {'name': document.getElementById("inputGameNameForSearch").value , ver: document.getElementById("versionCode").value},
            headers : { 'Content-Type' : 'application/json' }
        }).then(function (response){
            // console.log("response: " + JSON.stringify(response.data));
            $scope.user_data = response.data;
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }
    $scope.searchedGameMaintOn = false;
    $scope.onMaintClick = function(){
        var isOn = 1;
        if($scope.searchedGameMaintOn) isOn = 0;
        $http({
            method: 'POST',
            url: '/onMaint',
            data: {'name': document.getElementById("inputGameNameForSearch").value , maint: isOn},
            headers : { 'Content-Type' : 'application/json' }
        }).then(function (response){
            // console.log("response: " + JSON.stringify(response.data));
            $scope.user_data = response.data;
            $scope.searchedGameMaintOn = response.data.maint == 1;
            // console.log("searchedGameMaintOn: " + $scope.searchedGameMaintOn);
            // console.log("response.data.maint: " + response.data.maint);
            document.getElementById("btnMaint").style.background = $scope.searchedGameMaintOn?"green":"red";
        },function (error){
            console.log("error: " + JSON.stringify(error) );
        });
    }



    $scope.onCreateGame = function () {
        $http({
            method: 'POST',
            url: '/createGame',
            headers: { 'Content-Type': 'application/json' },
            data: { 'name': document.getElementById("inputGameName").value }
        }).then(function (response) {
            // console.log("response: " + response.data);
            $scope.user_data = response.data;
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onGetGameInfo = function () {
        $http({
            method: 'POST',
            url: '/getGame',
            headers: { 'Content-Type': 'application/json' },
            data: { 'name': document.getElementById("inputGameNameForSearch").value }
        }).then(function (response) {
            // console.log("response: " + response.data);
            $scope.user_data = response.data;
            $scope.searchedGameMaintOn = response.data.maint == 1;
            document.getElementById("btnMaint").style.background = $scope.searchedGameMaintOn?"green":"red";
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.changePassword = function () {
        $http({
            method: 'POST',
            url: '/changePassword',
            headers: { 'Content-Type': 'application/json' },
            data: { 'name': document.getElementById("inputGameNameForSearch").value , 'pw': document.getElementById("inputPassword").value }
        }).then(function (response) {
            // console.log("response: " + response.data);
            $scope.user_data = response.data;
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    $scope.onGetVer = function () {
        $http({
            method: 'POST',
            url: '/getVer',
            headers: { 'Content-Type': 'application/json' },
            data: { 'name': document.getElementById("inputGameNameForSearch").value  }
        }).then(function (response) {
            // console.log("response: " + response.data);
            $scope.user_data = response.data;
        }, function (error) {
            console.log("error: " + JSON.stringify(error));
        });
    }
    document.getElementById("main").style.display = "none"; //"block"
    
    $scope.result = "Loading...";
    
});