import { Router } from 'express';
import { dashboard, listContacts, logout } from '../controllers/dashboardControllers';

const dashboardRoutes = Router();

dashboardRoutes.get('/dashboard', dashboard);
dashboardRoutes.get('/contatos', listContacts);
dashboardRoutes.get('/logout', logout);

export default dashboardRoutes; 