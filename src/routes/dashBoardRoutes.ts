import { Request, Response, Router } from 'express';
import { index, listContacts, logout } from '../controllers/dashboardControllers';
import checkAuth from '../middlewares/checkAuth';

const dashboardRoutes = Router();

dashboardRoutes.get('/dashboard', checkAuth, index);
dashboardRoutes.get('/contatos', listContacts);
dashboardRoutes.get('/logout', logout);


export default dashboardRoutes; 