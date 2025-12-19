import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const fileUrl = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileUrl);
const loadLanguageFile = (lang) => {
    const filePath = path.join(__dirname, `../lang/${lang}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
};
export const setLanguage = (req, res, next) => {
    req.lang = loadLanguageFile('en');
    next();
};
