import app from './config/serverConfig.mjs';
import authRoutes from './routes/authRoutes.mjs';
import adminRoutes from './routes/adminRoutes.mjs'
import mriRoutes from './routes/scanRoutes.mjs'
import notificationRoutes from './routes/notificationRoute.mjs'
import reportRoutes from './routes/reportRoutes.mjs'

const apiVersion = "/v1/"
app.use(apiVersion+'auth', authRoutes);
app.use(apiVersion+'report', reportRoutes);
app.use(apiVersion+'admin', adminRoutes);
app.use(apiVersion+'mri', mriRoutes);
app.use(apiVersion+'notifications', notificationRoutes);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

