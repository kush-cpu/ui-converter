const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    title: "UI Library Converter",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("open-folder-dialog", (event) => {
  dialog.showOpenDialog({ properties: ["openDirectory"] }).then((result) => {
    if (!result.canceled) {
      event.sender.send("selected-folder", result.filePaths[0]);
    }
  });
});

ipcMain.on("library-selected", (event, { library, folder }) => {
  console.log(`🔄 Converting UI components to: ${library}`);
  
  // Example placeholder logic: (Replace with actual conversion logic)
  setTimeout(() => {
    event.sender.send("conversion-done", `Conversion to ${library} completed!`);
  }, 3000);
});
