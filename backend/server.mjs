import app from './config/serverConfig.mjs';
import authRoutes from './routes/authRoutes.mjs';

app.use('/v1/auth', authRoutes);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

