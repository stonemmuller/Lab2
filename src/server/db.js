var Sequelize = require("sequelize");
// Сервер: 45.55.132.182
// Логин: student
// Пароль: 3H-bDZ-4aa_ncirjgha5
var sequelize = new Sequelize('student', 'student', '3H-bDZ-4aa_ncirjgha5', {
    host: '45.55.132.182',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var db = {
    sequelize: sequelize,

    User: sequelize.define('user', {
        login: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING}
    }),

    Product: sequelize.define('product', {
        name: {type: Sequelize.STRING},
        description: {type: Sequelize.TEXT},
        image: {type: Sequelize.STRING}
    }),

    Income: sequelize.define('income', {
        date: {type: Sequelize.DATE},
        price: {type: Sequelize.INTEGER},
        count: {type: Sequelize.INTEGER}
    }),

    Order: sequelize.define('order', {
        date: {type: Sequelize.DATE}

    }),
    OrderProduct: sequelize.define('OrderProducts', {
        count: {type: Sequelize.INTEGER}
    }),
    Basket: sequelize.define('Basket', {
        count: {type: Sequelize.INTEGER}
    })
};

module.exports = db;

db.Product.hasMany(db.Income);

db.Product.belongsToMany(db.User, {through: 'Basket'});
db.User.belongsToMany(db.Product, {through: 'Basket'});
// db.Basket.belongsTo(db.Product);

db.Product.belongsToMany(db.Order, {through: 'OrderProducts'});
db.Order.belongsToMany(db.Product, {through: 'OrderProducts'});

db.User.hasMany(db.Order);
// db.Product.findAll({}).then(function (data) {
//     console.log(data);
// });
// sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
//     .then(function(){
//         return sequelize.sync({ force: true });
//     })
//     .then(function(){
//         return sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
//     })
//     .then(function(){
//         console.log('Database synchronised.');
//
//         var fakeProducts = [];
//         for(var i=1;i<=40;i++)
//         {
//             fakeProducts.push({name:"Product"+i,
//                                description:"dashd adhasd asdghjgasd asdashd asdgjasd asdhg asdhsagd asdgasd adhg",
//                                 image:"/images/"+i+".jpg"});
//         }
//
//         return db.Product.bulkCreate(fakeProducts);
//     }, function(err){
//         console.log(err);
//     })
//     .then(function () {
//         var fakeIncomes = [];
//         for(var i=1;i<=40;i++)
//         {
//             var price = Math.round(Math.random()*10)*100+500;
//             fakeIncomes.push({date: new Date(new Date().getTime() - 20*24*60*60*1000),
//                 count: Math.round(Math.random()*100),
//                 price: price,
//                 productId: i});
//
//             fakeIncomes.push({date: new Date(new Date().getTime() - 4*24*60*60*1000),
//                 count: Math.round(Math.random()*100),
//                 price: price*1.25,
//                 productId: i});
//         }
//         return db.Income.bulkCreate(fakeIncomes);
//     }).then(function () {
//         db.User.bulkCreate([{login:'admin', password:'123'}, {login:'guest', password:'1'}])
//     }).then(function () {
//         return db.Product.findAll({})
//     }).then(function (data) {
//         console.log("data", data.length);
//     });