module.exports = function ($scope, $http) {
    $http.get("/basket").then(function (ret)
    {
        if (ret.data.error)
        {
            alert(ret.data.error);
        }
        else
        {
            $scope.basket = ret.data;
        }
    })
};