import { Request, Response, Router } from 'express';
import { index, listContacts, logout } from '../controllers/dashboardControllers';

const dashboardRoutes = Router();

dashboardRoutes.get('/dashboard', index);
dashboardRoutes.get('/contatos', listContacts);
dashboardRoutes.get('/logout', logout);


export default dashboardRoutes;