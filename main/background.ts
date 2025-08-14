import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import path from "path";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import { appSettingsStore } from "./helpers/stores";
import { getPreferredLocale, logSystemInfo } from "./helpers/utils";
import {
  IS_APP_RUNNING_IN_PRODUCTION_MODE,
  MINIMAL_WINDOW_SIZE,
} from "./constants";

const sessionId = new Date().valueOf();

if (IS_APP_RUNNING_IN_PRODUCTION_MODE) {
  serve({ directory: "app" });

  log.transports.file.resolvePathFn = () => {
    return path.join(app.getPath("logs"), `${sessionId}.log`);
  };
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

void (async () => {
  await app.whenReady().then(() => {
    logSystemInfo();
    log.initialize(); // Initialize the logger for renderer process
    autoUpdater.logger = log;

    if (IS_APP_RUNNING_IN_PRODUCTION_MODE) {
      autoUpdater.allowPrerelease = false;
      void autoUpdater.checkForUpdatesAndNotify();
    } else {
      log.info("Skipping auto-updater in development mode.");
    }
  });

  const mainWindow = createWindow("main", {
    height: MINIMAL_WINDOW_SIZE.height,
    width: MINIMAL_WINDOW_SIZE.width,
    minHeight: MINIMAL_WINDOW_SIZE.height,
    minWidth: MINIMAL_WINDOW_SIZE.width,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Retrieve the stored locale from app settings, or use the client's preferred locale
  const preferredLocale = getPreferredLocale();
  const locale = appSettingsStore.get("locale", preferredLocale);

  const port = process.argv[2];

  if (IS_APP_RUNNING_IN_PRODUCTION_MODE) {
    await mainWindow.loadURL(`app://./${locale}/`);
  } else {
    await mainWindow.loadURL(`http://localhost:${port}/${locale}`);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
})();

app.on("window-all-closed", () => {
  // On macOS, apps typically remain active after closing all windows
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// TODO: Add more meaningful code to these functions :)
autoUpdater.on("checking-for-update", () => {
  log.info("Checking for update...");
});

autoUpdater.on("update-available", () => {
  log.info("Update available.");
});

autoUpdater.on("update-not-available", () => {
  log.info("Update not available.");
});

autoUpdater.on("error", (error) => {
  log.error(`Error in auto-updater: ${error.message}`);
});

autoUpdater.on("update-downloaded", () => {
  log.info("Download completed.");

  //TODO: Let the user decide if he wants to update after download
  autoUpdater.quitAndInstall();
});

autoUpdater.on("download-progress", (info) => {
  log.info("Download running", info);
});
