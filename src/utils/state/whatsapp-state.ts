import * as fs from "fs";
import * as path from "path";

let currentQR: string | null = null;
let authenticated = false; 

const qrPath = path.resolve(process.cwd(), "public", "qrcode.png");

export const getCurrentQR = (): string | null => currentQR;

export const setCurrentQR = (value: string | null): void => {
  currentQR = value;
};

export const isAuthenticated = (): boolean => authenticated;

export const setAuthenticated = (value: boolean): void => {
  authenticated = value;
};

export const clearSession = (): void => {
  authenticated = false;
  currentQR = null;

  if (fs.existsSync(qrPath)) {
    fs.unlinkSync(qrPath);
  }
};