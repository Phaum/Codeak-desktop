const path = require("path");
const { app, dialog, BrowserWindow, shell, Menu } = require("electron");
const { autoUpdater } = require("electron-updater");

const HOME_URL = "https://codeak.ru";
Menu.setApplicationMenu(null);

let mainWindow = null;
let reloadOnNextShow = false;

function setupAutoUpdate() {
  if (!app.isPackaged) return;

  autoUpdater.on("error", (e) => console.error("[autoUpdater] error", e));

  autoUpdater.on("update-downloaded", async () => {
    const res = await dialog.showMessageBox({
      type: "info",
      buttons: ["Перезапустить и обновить", "Позже"],
      defaultId: 0,
      message: "Доступно обновление Code.ak. Перезапустить сейчас?",
    });
    if (res.response === 0) autoUpdater.quitAndInstall();
  });

  autoUpdater.checkForUpdatesAndNotify();
}

function isAllowedUrl(raw) {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && (u.hostname === "codeak.ru" || u.hostname.endsWith(".codeak.ru"));
  } catch {
    return false;
  }
}

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

  win.on("show", () => {
    if (!reloadOnNextShow) return;
    reloadOnNextShow = false;
    setTimeout(() => reloadWindow(win), 100);
  });

  return win;
}

app.whenReady().then(() => {
  mainWindow = createWindow();
  setupAutoUpdate();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
      setupAutoUpdate();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});