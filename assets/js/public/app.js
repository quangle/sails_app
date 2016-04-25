var socketApp = angular.module('socketApp', []);

socketApp.controller('ChatController', ['$http', '$scope', function($http, $scope) {
  $scope.chatList = [];
  $scope.chatUser = "John Doe";
  $scope.chatMessage = "";

  $scope.getChats = function(){
    io.socket.get('/chat/add_conv');
    $http.get('/chat')
    .then(function onSuccess(successData){
      $scope.chatList = successData.data;
    })
    .catch(function onError(response) {
      alert(response);
    })
  }

  $scope.sendMsg = function(){
    io.socket.post('/chat/add_conv', {
      user: $scope.chatUser,
      message: $scope.chatMessage
    }, function (data){
      if (data.success == false) {
        alert("You need to populate both user and message.");
      }
    });
    $scope.chatMessage = "";
  };

  io.socket.on('chat', function(event){
    if (event.verb == 'created') {
      $scope.chatList.push(event.data);
      $scope.$apply();
    }
  })

  $scope.getChats();
}]);
