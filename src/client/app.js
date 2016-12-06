angular.module("App",["ngRoute"])
.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "templates/products.html",
            controller: "Products"
        })
        .when("/basket", {
            templateUrl : "templates/basket.html",
            controller: "Basket"
        })
        .when("/contacts", {
            templateUrl : "templates/contacts.html"
        })
        .when("/profile", {
            templateUrl : "templates/profile.html"
        });
})
.service("Info", require("./services/info.js"))
.controller("Basket", require("./controllers/basket.js"))
.controller("Menu",  require("./controllers/menu.js"))
.controller("Products", require("./controllers/products.js"));