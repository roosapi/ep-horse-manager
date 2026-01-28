// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('databaseAPI', {
  addHorse: (horse_data) => ipcRenderer.invoke('db:addHorse',horse_data),
  getHorses: () => ipcRenderer.invoke('db:getHorses'),
})