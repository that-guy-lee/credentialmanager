import 'dotenv/config'
import express from 'express';
// helmet imported for security
import helmet from 'helmet';
// mongoose imported for mongodb compatibility
import mongoose from 'mongoose';
// app routes imported
import authRoute from './routes/auth.js';
import unitRoute from './routes/units.js';
import userRoute from './routes/users.js';
// mongo credentials declared

//  const username = encodeURIComponent(process.env.mongo_username);    LEE
//  const password = encodeURIComponent(process.env.mongo_password);
//  const cluster = 'lee-test-cluster.1y2dl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const uri = `mongodb+srv://thatguylee:L0gMeiN007@lee-test-cluster.1y2dl.mongodb.net/cooltech?retryWrites=true&w=majority`;   // LEE
// connection to mongodb
try {
  mongoose.connect(uri);
} catch (err) {
  console.log(err);
}
// express app declared
const app = express();
// set to use helmet for security
app.use(helmet());
// json parser added
app.use(express.json());
// routes declared
app.use('/auth', authRoute);
app.use('/units', unitRoute);
app.use('/user', userRoute);

export default app;
