import { app, BrowserWindow,ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

import {HorseDatabase} from './utilities/dbManager';
import * as HorseParser from './utilities/horseInfoParser';

const db = new HorseDatabase(path.join(__dirname,'../../database/horses_test.db'));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// ---- DATABASE HANDLERS START
// TODO could probably directly call the module and skip this 
// handler function?
async function handleAddHorse (event,horse_data) {
  // TODO parse horse data
  const parsedData = HorseParser.parseHorseInfo(horse_data);
  const is_success_addhorse = db.insertHorse(parsedData.basic);
  const is_success = db.insertSkills(parsedData.skills);
  console.log('database insert successful:',is_success)
  return is_success;
}

async function handleGetHorses (event) {
  const horses_data = db.getHorses();
  return horses_data;
}
// ---- DATABASE HANDLERS END


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'detach' });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  ipcMain.handle('db:addHorse', handleAddHorse);
  ipcMain.handle('db:getHorses', handleGetHorses);

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    db.closeConnection();
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
