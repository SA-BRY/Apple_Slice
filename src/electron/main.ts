import {
  app,
  BrowserWindow,
  globalShortcut,
  clipboard,
  ipcMain,
  nativeImage,
} from "electron";
import { isDev } from "./util.js";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPreloadPath(): string {
  return path.join(__dirname, "preload.cjs");
}

app.whenReady().then(() => {
  const iconPath = path.join(__dirname, "./fruit.png");
  const icon = nativeImage.createFromPath(iconPath);

  ipcMain.handle("clipboard:read", () => {
    const text = clipboard.readText();
    console.log("Clipboard:", text);
    return text;
  });

  const mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: true,
    focusable: true,
    icon: icon,

    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setAlwaysOnTop(true, "screen-saver");

  mainWindow.center();

  mainWindow.on("blur", () => {
    mainWindow.hide();
  });

  globalShortcut.register("CommandOrControl+Shift+V", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      app.focus();
      mainWindow.center();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  //mainWindow.loadURL("http://localhost:5123");

  const appPath = app.getAppPath();
  mainWindow.loadFile(path.join(appPath, "dist-react", "index.html"));
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
