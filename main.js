const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { convertProject } = require("./converter");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: { 
      nodeIntegration: true, 
      contextIsolation: false 
    }
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("open-folder-dialog", async (event) => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (!result.canceled && result.filePaths.length > 0) {
    event.sender.send("selected-folder", result.filePaths[0]);
  }
});

ipcMain.on("library-selected", async (event, { library, folder }) => {
  try {
    convertProject(folder, library);  // Call conversion function
    event.sender.send("conversion-done", `✅ Conversion to ${library} completed!`);
  } catch (error) {
    event.sender.send("conversion-done", `❌ Error: ${error.message}`);
  }
});
