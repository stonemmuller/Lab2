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
}).service("Info", function ($http) {

    var info = { basket: [] };

    $http.get("/userInfo").then(function (ret) {
        info.user = ret.data;
    });

    info.AddToBasket = function (p) {
        $http.post("/addProduct", { id: p.id }).then(function (ret) {
            if (ret.data.success) {
                info.basket.push(p);
            }
        });
    };

    return info;
}).controller("Basket", function ($scope, $http) {
    $http.get("/basket").then(function (ret) {
        if (ret.data.error) {
            alert(ret.data.error);
        } else {
            $scope.basket = ret.data;
        }
    });
}).controller("Menu", function ($scope, $http, Info) {
    $scope.info = Info;
}).controller("Products", function ($scope, $http, Info) {
    $scope.info = Info;
    $http.get("/products").then(function (ret) {
        $scope.products = ret.data;
    });
});

},{}]},{},[1]);
