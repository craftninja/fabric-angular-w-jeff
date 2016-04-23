# README

## How did this lovely thing get made?

### Get it started

1. Make dir, git init, touch index and app
1. html-ify index, add angular cdn and ng-app to html tag
1. add `{{1+2}}` to make sure things are wired up correctly
1. install http-server globally if you don't have it: `$ npm intall -g http-server`
1. `$ npm init -y` - installs package.json, but says yes to all the prompts
1. in `package.json`, change `test` script to `start` script:
  * `http-server -c-1 -o`
  * `-c-1` cache flag with neg 1 means never cache your files
  * `-o` open up in your browser
1. Now run npm start and you are good to go. You should see "3" in your browser if all is wired up correctly with angular.
1. Pull in app.js to your index (verify with console.log in app.js)

### Make a form to add stuff

1. Name your ng-app

  ```html
  <html ng-app="fabrik">
  ```

1. Instantiate the angular app in app.js

  ```js
  angular.module('fabrik', []);
  ```

1. Add a controller for your content within the body

  ```html
  <div ng-controller="InventoryController">
  </div>
  ```

1. Instantiate the controller in app.js

  ```js
  angular.module('fabrik', [])
    .controller('InventoryController', function () {
    });
  ```

1. Add a form with three inputs, submit button for three attributes of your resource (for this project, fabric has content, weight and width).
1. Each of these inputs have an attribute `ng-model` with values of content, weight or width.
1. Add a `ng-submit` attribute to the form with a value of `onSubmit()`
  * This code will not execute immediately, but will be loaded and executed when the submit button is clicked
1. Add an `onSubmit()` function in the app.js controller function. Since we want to start using $scope, pass this in as an argument to the controller function.

  ```js
  $scope.onSubmit = function () { }
  ```

1. If you want a default value in your form, you can set that within the controller function as well, like this:

  ```js
  $scope.content = 'wool'
  ```

1. We want the stuff entered into the forms to get stored.
  * Within the controller function but outside the `onSubmit` function,

    ```js
    @scope.inventory = []
    ```

  * Within the `onSubmit` function:

    ```js
    $scope.inventory.push({
      content: $scope.content,
      weight: $scope.weight,
      width: $scope.width
    })
    ```

1. We also want to display this on the page under the form. Let's see what we have so far.

  ```html
  <div ng-repeat="item in inventory">
    {{item | json}}
  </div>
  ```

  Add a few items to the form to see them displayed.

1. Lets clear the form after we add each item. Add the following to the `onSubmit` function, below adding the item to the inventory.

  ```js
  $scope.content = "",
  $scope.weight = "",
  $scope.width = "",
  ```

### Display inventory

1. Instead of starting inventory with an empty array, put a few things in there.

  ```js
  $scope.inventory = [
    {
      content: 'wool',
      weight: 'shirting',
      width: '54'
    },
    {
      content: 'silk',
      weight: 'charmeuse',
      width: '40'
    },
    {
      content: 'cotton',
      weight: 'canvas',
      width: '60'
    }
  ]
  ```

1. Display this inventory on the page (don't use a table... but we are going to use a table).

  ```html
  <table>
    <thead>
      <tr>
        <th>
          Content
        </th>
        <th>
          Weight
        </th>
        <th>
          Width
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{item.content}}</td>
        <td>{{item.weight}}</td>
        <td>{{item.width}}</td>
      </tr>
    </tbody>
  </table>
  ```

  Add a few things to make sure all is still well

### Now we want to delete stuff from inventory

1. Add a checkbox to each item listed in inventory

  ```html
  <td>
    <input type="checkbox" name="name" ng-value="$index">
  </td>
  ```

1. Add a button below all the table of listed inventory

  ```html
  <input type="button" value="Delete Selected" ng-click="deleteSelected()">
  ```

1. Add `deleteSelected` function to app.js file within controller function

  ```js
  $scope.deleteSelected  = function() { }
  ```

1. When a clickbox is clicked, add it to a list of something to delete
  * To each checkbox, add the attribute `ng-clicked="itemSelected(item)"`
  * add the function `itemSelected` within the controller function

    ```js
    $scope.itemSelected = function () {
      if ($event.item.checked) {
        item.selected = true;
      } else {
        item.selected = false;
      };
    };
    ```

1. Actually delete all items that are selected. Within the `deleteSelected` function:

  ```js
  $scope.inventory = $scope.inventory.filter(function(item) {
    return !item.selected;
  });
  ```

### Abstract inventory into a json file

1. Remove `$scope.inventory` and add `data.json` file in root of repo directory with the following contents:

  ```json
  [
    {
      "content": "wool",
      "weight": "voile",
      "width": 44
    },
    {
      "content": "silk",
      "weight": "canvas",
      "width": 55
    },
    {
      "content": "cotton",
      "weight": "quilting",
      "width": 60
    }
  ]
  ```

1. Add `$http` as a argument passed into the controller function
1. Above `$scope.inventory`:

  ```js
  $http.get('/data.json')
    .then(function(res) {
      $scope.inventory = res.data;
    });
  ```

### But we aren't adding content, weight and width... we are adding an item with those attributes...

1. Instead of pushing an object with a bunch of attributes in `$scope`, push `$scope.newItem`, and clear form by setting `$scope.newItem = {}`
1. In the form, change the `ng-model` in each to be an attribute of `newItem`, like:

  ```html
  <input type="text" id="content" ng-model="newItem.content">
  ```

### Minification Protection

Angular is pretty smart... you can put the arguments passed into the controller function in any order, and Angular figures out what is what (`$scope`, `$http`, etc...). BUT, when this code is minified, since it's simply JavaScript, those arguments are 'renamed' to `a`, `b`, `c`... and Angular can't figure out what is what. To alleviate this issue, instead of passing a function as the second argument passed into the controller, pass in an array with those named arguments as the first elements in the array like so:

```js
angular.module('fabrik', [])
  .controller('InventoryController', ['$scope', '$http', InventoryController]);

function InventoryController($scope, $http) {
  // function contents
};
```

Or in the case you do not abstract the InventoryController out...

```js
angular.module('fabrik', [])
  .controller('InventoryController', ['$scope', '$http', function($scope, $http) {
    // function contents
  }]);
```


## OMG SHORTCUTS ARE SO BALLER

* `cmd-d` - select this thing (like double-click) and then select the same exact thing below, and again...
* `cmd-j` - join this line with the line below

## OMG DID YOU KNOW THAT

* You can see the source code of a function invoking `toString` on said function?

  ```js
  someFunction.toString();
  ```

* You can inline javascript in HTML? It's sooooo pase.

  ```html
  <div onClick="runFunction()">
    <p>That Shit Cray!</p>
  </div>
  ```
