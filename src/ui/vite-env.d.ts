export {};

declare global {
  interface Window {
    api: {
      readClipboard: () => Promise<string>;
    };
  }
}
/// <reference types="vite/client" />

declare module "*.css";
