var myApp = angular.module('myApp', []);


myApp.controller('MessageController', ['$scope', 'DataService', function($scope, DataService) {
  DataService.getData();
  $scope.messageObject = DataService.messageObject;
  $scope.newMessage = DataService.newMessage;
  $scope.postData = DataService.postData;

}]);


myApp.factory('DataService', ['$http', function($http){
    var messageObject = {
    };

    var newMessage = {
      name: '',
      message: ''
    };

    function getData(){
      $http.get('/messages').then(function(response){
        messageObject.messages = response.data;
      });
    }


    function postData(message){
      $http.post('/messages', message).then(function(response){
        getData();
      });
    }
    return {
      messageObject : messageObject,
      newMessage: newMessage,
      getData  : getData,
      postData : postData,
    };
}]);
