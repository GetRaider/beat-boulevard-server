import {config} from "dotenv";

config();

interface IProcessEnvHelper {
  PORT: string;
  DB_BASE_URL: string;
  DB_CLUSTER_URL: string;
  DB_LOGIN: string;
  DB_PASSWORD: string;
  SECRET: string;
}

export const processEnv = process.env as unknown as IProcessEnvHelper;
