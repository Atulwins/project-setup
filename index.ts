import app from './src/app';
import dotenv from 'dotenv';
dotenv.config()

let port:any =process.env.PORT || 5005;

new app(port).listen();
