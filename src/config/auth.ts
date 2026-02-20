import dotenv from "dotenv";

dotenv.config();

export const authConfig = {
  username: process.env.AUTH_USERNAME || "admin",
  password: process.env.AUTH_PASSWORD || "password",
  port: process.env.PORT || 3000,
  isDev: process.env.NODE_ENV === "development" || !process.env.NODE_ENV,
};