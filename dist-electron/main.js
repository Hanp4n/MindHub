import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let win2;
let win3;
let win4;
let win5;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/login.html`);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "containers/login.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("abrir-login", () => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/login.html`);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "containers/login.html"));
  }
  win.on("closed", () => {
    win = null;
  });
});
ipcMain.on("cerrar-login", () => {
  if (win && !win.isDestroyed()) {
    win.close();
    win = null;
  }
});
ipcMain.on("abrir-mindHub", () => {
  win2 = new BrowserWindow({
    width: 1e3,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win2.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F1") {
      event.preventDefault();
      abrirAyudaMH();
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win2.webContents.openDevTools();
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    win2.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/mindHub.html`);
  } else {
    win2.loadFile(path.join(RENDERER_DIST, "containers/mindHub.html"));
  }
  win2.on("closed", () => {
    win2 = null;
  });
});
ipcMain.on("cerrar-mindHub", () => {
  if (win2 && !win2.isDestroyed()) {
    win2.close();
    win2 = null;
  }
});
ipcMain.on("abrir-korolang", () => {
  if (win3) {
    win3.focus();
    return;
  }
  win3 = new BrowserWindow({
    width: 1e3,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win3.webContents.openDevTools();
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    win3.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/koroLang.html`);
  } else {
    win3.loadFile(path.join(RENDERER_DIST, "containers/koroLang.html"));
  }
  win3.on("closed", () => {
    win3 = null;
  });
});
ipcMain.on("cerrar-korolang", () => {
  if (win3 && !win3.isDestroyed()) {
    win3.close();
    win3 = null;
  }
});
ipcMain.on("abrir-ayudamh", abrirAyudaMH);
ipcMain.on("cerrar-ayudamh", () => {
  if (win4 && !win4.isDestroyed()) {
    win4.close();
    win4 = null;
  }
});
function abrirAyudaMH() {
  if (win4) {
    win4.focus();
    return;
  }
  win4 = new BrowserWindow({
    width: 1e3,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win4.webContents.openDevTools();
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    win4.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/ayudamh.html`);
  } else {
    win4.loadFile(path.join(RENDERER_DIST, "containers/ayudamh.html"));
  }
  win4.on("closed", () => {
    win4 = null;
  });
}
ipcMain.on("abrir-ayudakl", abrirAyudaKL);
ipcMain.on("cerrar-ayudakl", () => {
  if (win5 && !win5.isDestroyed()) {
    win5.close();
    win5 = null;
  }
});
function abrirAyudaKL() {
  if (win5) {
    win5.focus();
    return;
  }
  win5 = new BrowserWindow({
    width: 1e3,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win5.webContents.openDevTools();
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    win5.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/ayudakl.html`);
  } else {
    win5.loadFile(path.join(RENDERER_DIST, "containers/ayudakl.html"));
  }
  win5.on("closed", () => {
    win5 = null;
  });
}
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
