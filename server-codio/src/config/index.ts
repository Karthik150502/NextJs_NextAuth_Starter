import { config } from "dotenv";

config();


export const PORT = process.env.PORT || 8080
export const APP_URL = process.env.APP_URL as string
export const DATABASE_URL = process.env.DATABASE_URL as string
export const JWT_SECRET = process.env.JWT_SECRET as string