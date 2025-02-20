import app from './config/serverConfig.mjs';
import authRoutes from './routes/authRoutes.mjs';
import reportRoutes from './routes/reportRoutes.mjs'
import adminRoutes from './routes/adminRoutes.mjs'
import mriRoutes from './routes/mriRoutes.mjs'

const apiVersion = "/v1/"
app.use(apiVersion+'auth', authRoutes);
app.use(apiVersion+'report', reportRoutes);
app.use(apiVersion+'admin', adminRoutes);
app.use(apiVersion+'mri', mriRoutes);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

