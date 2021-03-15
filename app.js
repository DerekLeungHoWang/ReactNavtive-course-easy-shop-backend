const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.options('*', cors())
require('dotenv/config')
const authJwt = require('./helpers/jwt')



//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt())
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: err })
    }
})//http://localhost:3000/public/uploads/1WKPmsfpt24XKQPoeJOojpf0UmvsPYaFNNtwuQ7bcLk.jpg-1614683251042.jpeg
app.use('/public/uploads',express.static(__dirname+'/public/uploads'));

//routes
const api = process.env.API_URL;
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)


const Product = require('./models/product');


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
    .then(() => {
        console.log('Database connection is ready !');
    })
    .catch((err) => {
        console.log(err);
    })

// app.listen(3000, () => {
//     console.log(api);
//     console.log('server running http://localohost:3000')
// })

var server = app.listen(process.env.PORT ||3000, function(){
    var port = server.address().port;
    console.log("Express is working on port --- " + port);
})