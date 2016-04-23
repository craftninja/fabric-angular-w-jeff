// add inventory (content, weight, width)
// select all inventory items and bulk delete
// edit a single item
// load from http

angular.module('fabrik', []) // <-- second argument, you _define_ module / instantiate module
  .controller('InventoryController', ['$http', '$scope', function ($http, $scope) {

    $scope.content = "wool";

    $http.get('/data.json')
      .then(function(res){
        $scope.inventory = res.data;
      });

    $scope.inventory = [];

    $scope.onSubmit = function () { // like defining a rails controller action
      $scope.inventory.push(newItem);
      $scope.item = {};
    }

    $scope.deleteSelected = function(){
      $scope.inventory = $scope.inventory.filter(function (item) {
        return !item.selected;
      })
    }

    $scope.itemSelected = function ($event, item) {
      if ($event.target.checked) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    }

  }
])

// minified code...
// function a(a, b) {



// preferred in real life
// angular.module('fabrik', [])
//
// angular.module('fabrik')  // no second argument, you _find_ the module
// .controller('InventoryController', function () {
//
// })

// window.app = angular.module('fabrik', [])
//
// app.controller('InventoryController', function () {
//
// })
