import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
const loadLanguageFile = (lang: string) => {
  const filePath = path.join(__dirname, "..", "lang", `${lang}.json`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};

export const setLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.lang = loadLanguageFile("en");
  next();
};
