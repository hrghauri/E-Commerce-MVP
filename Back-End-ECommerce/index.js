const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./mongoDBConfig/key').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return;
  })
  .catch(err => {
    console.log(err);
    console.log('MongoDB Not Connected');
  });

const cartsRouter = require('./app/routers/carts');
const itemsRouter = require('./app/routers/items');
const ordersRouter = require('./app/routers/orders');

const appRouter = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

appRouter.use('/carts', cartsRouter);
appRouter.use('/items', itemsRouter);
appRouter.use('/orders', ordersRouter);

//If none of the routes above matched
appRouter.use((req, res, next) => {
  res.status(404).send('Resource not Found');
});

//Error Handling
appRouter.use((err, req, res, next) => {
  console.log('Error Reached');

  //if the status or messages were not set at this point by the previous error handlers
  let status = err.status || 500;
  let message = err.message || 'Server Error';

  //respond to ourselves by properly logging the error
  //for now console.log will just do fine
  console.log(err);

  //respond to the client
  res.status(status).send({
    message
  });
});

app.use(appRouter);

//START THE SERVER
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
