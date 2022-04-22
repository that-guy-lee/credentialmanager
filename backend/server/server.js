import http from 'http';
import app from '../app.js';
// port variable declared with default
const PORT = process.env.PORT || '5000';
// port assigned to the app
app.set('port', PORT);
// http server created
const server = http.createServer(app);
// server set to listen on the port
server.listen(PORT);
// listening function declared to log to console active port
const listening = () => {
  const addr = server.address();
  console.log(`listening on port: ${addr.port}`);
};
// server set to call listening function when listening
server.on('listening', listening);