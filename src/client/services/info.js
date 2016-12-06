module.exports = function ($http) {

    var info = { basket:[] };

    $http.get("/userInfo").then(function(ret)
    {
        info.user = ret.data;
    });

    var products;
    info.getProducts = function () {
        return new Promise(function (resolve, reject) {
            if (!products)
            {
                $http.get("/products").then(function (p) {
                    console.log("products", p .data);
                    products = p.data;
                    resolve(products);
                });
            }
            else
            {
                resolve(products);
            }
        })
    }

    info.AddToBasket = function (p)
    {
        $http.post("/addProduct", {id: p.id}).then(function (ret) {
            if (ret.data.success)
            {
                info.basket.push(p);
            }
        });
    };

    return info;
}