// src/@types/express/index.d.ts
// import * as express from "express";
import { AccessTokenPayload } from "./tokens";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
      lang?: any;
      token?: string;
    }
  }
}

export {};
