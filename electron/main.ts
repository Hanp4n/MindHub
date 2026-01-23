import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { convertToModelMessages, streamText } from "ai";
import fs from "fs";
import pathFile from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
let win2: BrowserWindow | null;
let win3: BrowserWindow | null;
let win4: BrowserWindow | null;
let win5: BrowserWindow | null;


//LOGIN

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F1") {
      event.preventDefault();
      abrirAyudaMH();
    }
    if (input.key === "F12" && win) {
      event.preventDefault();
      win.webContents.openDevTools();
    }
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/login.html`);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "containers/login.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//LOGIN

ipcMain.on("abrir-login", () => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F1") {
      event.preventDefault();
      abrirAyudaMH();
    }
    if (input.key === "F12" && win) {
      event.preventDefault();
      win.webContents.openDevTools();
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

// MINDHUB

ipcMain.on("abrir-mindHub", () => {
  win2 = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win2.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F1") {
      event.preventDefault();
      abrirAyudaMH();
    }
    if (input.key === "F12" && win2) {
      event.preventDefault();
      win2.webContents.openDevTools();
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

//KOROLANG

ipcMain.on("abrir-korolang", () => {
  if (win3) {
    // Si ya existe, solo la enfocamos
    win3.focus();
    return;
  }

  win3 = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win3.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F1") {
      event.preventDefault();
      abrirAyudaKL();
    }
    if (input.key === "F12" && win3) {
      event.preventDefault();
      win3.webContents.openDevTools();
    }
  });

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

// Ayuda MindHub

ipcMain.on("abrir-ayudamh", abrirAyudaMH);

ipcMain.on("cerrar-ayudamh", () => {
  if (win4 && !win4.isDestroyed()) {
    win4.close();
    win4 = null;
  }
});

function abrirAyudaMH() {
  if (win4) {
    // Si ya existe, solo la enfocamos
    win4.focus();
    return;
  }

  win4 = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win4.webContents.on("before-input-event", (event, input) => {
    
    if (input.key === "F12" && win4) {
      event.preventDefault();
      win4.webContents.openDevTools();
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win4.loadURL(`${process.env.VITE_DEV_SERVER_URL}containers/ayudamh.html`);
  } else {
    win4.loadFile(path.join(RENDERER_DIST, "containers/ayudamh.html"));
  }

  win4.on("closed", () => {
    win4 = null;
  });
}
// Ayuda MindHub

ipcMain.on("abrir-ayudakl", abrirAyudaKL);

ipcMain.on("cerrar-ayudakl", () => {
  if (win5 && !win5.isDestroyed()) {
    win5.close();
    win5 = null;
  }
});

function abrirAyudaKL() {
  if (win5) {
    // Si ya existe, solo la enfocamos
    win5.focus();
    return;
  }

  win5 = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win5.webContents.on("before-input-event", (event, input) => {
    
    if (input.key === "F12" && win5) {
      event.preventDefault();
      win5.webContents.openDevTools();
    }
  });

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
