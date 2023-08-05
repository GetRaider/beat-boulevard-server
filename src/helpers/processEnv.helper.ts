import {config} from "dotenv";

config();

interface processEnvHelperInterface {
  PORT: string;
  DBLOGIN: string;
  DBPASSWORD: string;
}

export const processEnv = process.env as unknown as processEnvHelperInterface;
