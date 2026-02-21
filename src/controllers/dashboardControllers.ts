import { Request, Response } from 'express';

interface BotStats {
  contatos: number;
  mensagens: number;
  status: string;
  ultimaAtividade: string;
}

export const index = (req: Request, res: Response): void => {
  res.sendFile('dashboard.html', { root: './views' });
};

export const listContacts = (req: Request, res: Response): void => {
  res.send("<h1>Lista de Contatos</h1>");
};

export const logout = (req: Request, res: Response): void => {
  res.redirect('/dashboard');
};