import app from './config/serverConfig.mjs';



app.get('/', (req, res) => {
  res.send('Hello World!');
});

