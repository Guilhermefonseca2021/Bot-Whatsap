import dotenv from "dotenv";

dotenv.config();

export const authConfig = {
  username: process.env.AUTH_USERNAME || "admin",
  password: process.env.AUTH_PASSWORD || "password",
  port: process.env.PORT || 3000,
};