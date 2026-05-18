import dotenv from 'dotenv';
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  if(!process.env.ENV) {
    throw "ERROR: ENV environment variables is not set !!"
  }
  try {
    if (process.env.ENV) {
      dotenv.config({
        path: `.env.${process.env.ENV}`,
        override: true
      });
    }
  } catch (error) {
    console.error("Error in loading environment variables", error);
    throw error;
  }
}

export default globalSetup;