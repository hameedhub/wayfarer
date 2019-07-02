import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import authenticationRouter from './routes/authentication';


const app = express();
dotenv.config()

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', authenticationRouter);

app.get('/', (request, response)=>{
  response.status(200).json({
    status: 200,
    message: 'Welcome to Ware Farer API'
  });
})

// catch 404 and forward to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// error handler
app.use((error, request, response, next)=> {
 
  response.status(error.status || 500).json({
    status: error.status,
    error: request.app.get('env') === 'development' ? error : {}
  })
});
// port
const port = process.env.PORT || 5000;
app.listen(port, ()=>{ console.log(`listening to port ${port}`)});
export default app;
