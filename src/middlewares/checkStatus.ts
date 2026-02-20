import { sessionState } from "../utils/whatsapp/client-whatsapp";

export const checkAuthMiddleware = (req: any, res: any, next: any) => {
  if (sessionState.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

export const dashboardRoute = (req: any, res: any) => {
  res.send("Bem-vindo ao Dashboard do WhatsApp!");
};
