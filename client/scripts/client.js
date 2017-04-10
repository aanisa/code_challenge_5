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
        console.log(response.data);
        messageObject.messages = response.data;
        console.log('from db:', messageObject.messages);
      });
    }

    function postData(message){
      console.log('message post');
      $http.post('/messages', message).then(function(response){
        console.log('saving to db:', response);
      });
    }
    return {
      messageObject : messageObject,
      newMessage: newMessage,
      getData  : getData,
      postData : postData
    };
}]);
