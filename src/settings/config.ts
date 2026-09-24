import { config } from "dotenv";

config();

const env = process.env;

// Логин и пароль супер-админа (можно переопределить переменными окружения).
export const ADMIN_USERNAME = env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || "qwerty";

if (!env.MONGO_URL) {
  throw new Error("MONGO_URL is not set. Add it to your .env file.");
}

export const SETTINGS = {
  PORT: env.PORT || 5003,
  MONGO_URL: env.MONGO_URL,
  DB_NAME: env.DB_NAME || "backend-blogers-platform",
};
