import { Router } from 'express';
import { dashboard, listContacts, logout } from '../controllers/dashboardControllers';
import checkAuth from '../middlewares/checkAuth';

const dashboardRoutes = Router();

dashboardRoutes.get('/dashboard', checkAuth, dashboard);
dashboardRoutes.get('/contatos', listContacts);
dashboardRoutes.get('/logout', logout);


export default dashboardRoutes; 