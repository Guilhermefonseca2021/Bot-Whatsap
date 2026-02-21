import dotenv from "dotenv";

dotenv.config();

export const authConfig = {
  username: process.env.AUTH_USERNAME || "admin",
  password: process.env.AUTH_PASSWORD || "password",
  port: Number(process.env.PORT) || 3000,

  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",

  sessionPaths: {
    auth: process.env.AUTH_FOLDER || ".wwebjs_auth",
    cache: process.env.CACHE_FOLDER || ".wwebjs_cache",
    sessions: process.env.SESSION_FOLDER || "public/sessions",
  },
  qrCodePath: process.env.QR_CODE_PATH || "public/qrcode.png",
};
