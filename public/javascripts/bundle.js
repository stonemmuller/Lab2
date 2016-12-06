(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

angular.module("App", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/products.html",
        controller: "Products"
    }).when("/basket", {
        templateUrl: "templates/basket.html",
        controller: "Basket"
    }).when("/contacts", {
        templateUrl: "templates/contacts.html"
    }).when("/profile", {
        templateUrl: "templates/profile.html"
    });
}).service("Info", require("./services/info.js")).controller("Basket", require("./controllers/basket.js")).controller("Menu", require("./controllers/menu.js")).controller("Products", require("./controllers/products.js"));

},{"./controllers/basket.js":2,"./controllers/menu.js":3,"./controllers/products.js":4,"./services/info.js":5}],2:[function(require,module,exports){
"use strict";

module.exports = function ($scope, $http) {
    $http.get("/basket").then(function (ret) {
        if (ret.data.error) {
            alert(ret.data.error);
        } else {
            $scope.basket = ret.data;
        }
    });
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function ($scope, $http, Info) {
    $scope.info = Info;
};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = function ($scope, $http, Info) {
    $scope.info = Info;

    Info.getProducts().then(function (ret) {
        console.log("ret", ret);
        $scope.products = ret;
    });
};

},{}],5:[function(require,module,exports){
"use strict";

module.exports = function ($http) {

    var info = { basket: [] };

    $http.get("/userInfo").then(function (ret) {
        info.user = ret.data;
    });

    var products;
    info.getProducts = function () {
        return new Promise(function (resolve, reject) {
            if (!products) {
                $http.get("/products").then(function (p) {
                    console.log("products", p.data);
                    products = p.data;
                    resolve(products);
                });
            } else {
                resolve(products);
            }
        });
    };

    info.AddToBasket = function (p) {
        $http.post("/addProduct", { id: p.id }).then(function (ret) {
            if (ret.data.success) {
                info.basket.push(p);
            }
        });
    };

    return info;
};

},{}]},{},[1]);
