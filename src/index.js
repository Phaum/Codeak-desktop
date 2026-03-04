const path = require("path");
const { app, BrowserWindow, shell, Menu } = require("electron");

const HOME_URL = "https://codeak.ru";
Menu.setApplicationMenu(null);

function isAllowedUrl(raw) {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && (u.hostname === "codeak.ru" || u.hostname.endsWith(".codeak.ru"));
  } catch {
    return false;
  }
}

let mainWindow = null;
let tray = null;
let reloadOnNextShow = false;

function reloadWindow(win) {
  if (!win) return;
  win.webContents.reloadIgnoringCache();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, "..", "assets", "icon.png"),
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.loadURL(HOME_URL);

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedUrl(url)) return { action: "allow" };
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (e, url) => {
    if (!isAllowedUrl(url)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on("show", () => {
    if (!reloadOnNextShow) return;
    reloadOnNextShow = false;
    setTimeout(() => reloadWindow(mainWindow), 100);
  });

  return win;
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});