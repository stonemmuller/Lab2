var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require("./src/server/auth")(app).router);

var db = require("./src/server/db.js");


// var basket =  {};
app.get("/userInfo", function (req, res)
{
    if (req.user)
    {
        res.send({login: req.user.login})
    }
    else
    {
        res.send(null);
    }
});

var _ = require("underscore");

var checkAuth = function (req, res, next)
{
    if (req.user)
    {
        next();
    }
    else
    {
        res.send({'error':true, message:"Необходимо войти в систему!"});
    }
};

// app.post('/addProduct', checkAuth, function (req, res)
// {
//     if (!_.isFinite(req.body.id))
//     {
//         res.send({error: true, message:"id товара не число!"});
//         return;
//     }
//     // if (!basket[req.user.id]) basket[req.user.id] = [];
//     // var userBasket = basket[req.user.id];
//     // if (userBasket.length > 100)
//     // {
//     //     res.send({error: true, message: "Слишком много товаров в корзине!"});
//     //     return;
//     // }
//     // userBasket.push(req.body.id);
//     db.Basket.findOrCreate({where: {userId: req.user.id, productId: req.body.id},
//                             defaults: {userId: req.user.id, productId: req.body.id, count: 1} }).spread(function(basket, created) {
//         if (created)
//         {
//             res.send({'success':true});
//         }
//         else
//         {
//             basket.count++;
//             basket.save().then(function () {
//                 res.send({'success':true});
//             });
//         }
//     });
// });

// app.get("/basket", checkAuth, function (req, res)
// {
//     db.Basket.findAll({
//         where: {userId: req.user.id},
//         attributes: ['count'],
//         include: [{model: db.Product, attributes: ['name','image','id','description']}]
//     }).then(function (result) {
//         res.send(result);
//     })
// });

app.get("/products", function(req,res)
{
  console.log("req.user=", req.user);

  db.sequelize.query("SELECT p.id as id, name,description,image,MAX(price) as productPrice,SUM(count) as productCount FROM products as p INNER JOIN " +
                     " incomes as i ON p.id=i.productId " +
                     " GROUP BY name,description,image").spread(function(products) {
       res.send(products);
   });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
