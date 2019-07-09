import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import authenticationRouter from './routes/authentication';
import tripRouter from './routes/trips';


const app = express();
dotenv.config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', authenticationRouter);
app.use('/api/v1/', tripRouter);

app.get('/', (request, response)=>{
  response.status(200).json({
    status: 200,
    message: 'Welcome to Ware Farer API'
  });
})

//error handler
app.use((request, response, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, request, response, next)=>{
  response.status(error.status || 500).json({
    status: error.status,
    error: error.message
  })
});

// port
const port = process.env.PORT || 5000;
app.listen(port, ()=>{ console.log(`listening to port ${port}`)});
export default app;
