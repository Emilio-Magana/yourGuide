import { type IUser } from "@server/models/userModel";
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: string;
      DATABASE: string;
      DATABASE_USERNAME: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      EMAIL_HOST: string;
      EMAIL_FROM: string;
      EMAIL_PORT: number;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: StringValue;
      JWT_COOKIE_EXPIRES_IN: number;
      SENDGRID_USERNAME: string;
      SENDGRID_PASSWORD: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
    }
  }
}

export {};
