import "express";
import { AccessTokenPayload } from "./tokens";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload/*{
        user_id: string;
      };*/,
      lang?: any;
      token?: string,
    }
  }
}

// export {};