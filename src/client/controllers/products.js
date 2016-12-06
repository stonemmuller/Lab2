module.exports = function($scope,$http,Info)
{
    $scope.info = Info;

    Info.getProducts().then(function(ret)
    {
        console.log("ret", ret);
        alert("123");
        $scope.products = ret;
    });
}