const { app, BrowserWindow } = require("electron");
const { join } = require("path");

app.whenReady().then(() => {
  const window = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "./preload.js"),
    },
  });

  window.loadFile(join(__dirname, "../app/build/index.html"));
});
