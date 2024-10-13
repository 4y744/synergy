const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const window = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("../app/build/index.html");
  //window.loadURL("https://synergy-44df2.web.app");
});
