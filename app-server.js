const express = require('express');

const app = express();
const port = 8088;

let router = express.Router();
router.get('/', (req, res, next) => {
  req.url = '/index.html';
  next();
});

app.use(router);

// 接口数据
// 1. 读取 json 数据
let goods = require('./data/goods.json');
let ratings = require('./data/ratings.json');
let seller = require('./data/seller.json');

// 2. 路由
routes = express.Router();

// 3. 接口
routes.get('/goods', (req, res) => {
  res.json(goods);
});
routes.get('/ratings', (req, res) => {
  res.json(ratings);
}) ;
routes.get('/seller', (req, res) => {
  res.json(seller);
});

app.use('/api', routes);

// 静态目录
app.use(express.static('./dist'));

module.express = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('http://localhost:' + port + '\n');
});
