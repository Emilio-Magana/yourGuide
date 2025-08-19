import { config } from "dotenv";
config({ path: ".env" }); // Load .env into process.env

export const ENV_VARS = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE: process.env.DATABASE,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_PORT: process.env.EMAIL_PORT,
  SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
  SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
};
