import {config} from "dotenv";

config();

interface processEnvHelperInterface {
  PORT: string;
  DB_LOGIN: string;
  DB_PASSWORD: string;
  SECRET: string;
}

export const processEnv = process.env as unknown as processEnvHelperInterface;
