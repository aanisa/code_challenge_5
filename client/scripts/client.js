var myApp = angular.module('myApp', []);


myApp.controller('MessageController', ['$scope', 'DataService', function($scope, DataService) {
  DataService.getData();
  $scope.postData = DataService.postData;
  $scope.newMessage = DataService.newMessage;
  console.log($scope.newMessage);
}]);


myApp.factory('DataService', ['$http', function($http){
    var messageObject = {
      messages : []
    };

    var newMessage = {
      name: '',
      message: ''
    };

    function getData(){
      $http.get('/messages').then(function(response){
        console.log('from db: ', response);
        messageObject.messages = response.data;
        console.log(messageObject);
      });
    }

    function postData(message){
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
