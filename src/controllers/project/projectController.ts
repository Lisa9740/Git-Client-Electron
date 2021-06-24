import {dialog, ipcMain} from "electron";
const dirTree = require("directory-tree");

class BaseHandler {
    openProject(win: Electron.BrowserWindow) { }
}

export class ProjectController extends BaseHandler {
    openProject(win: Electron.BrowserWindow) {
        ipcMain.on('select-dirs', async (event, arg) => {
            const result = await dialog.showOpenDialog(win, {
                properties: ['openDirectory']
            })
            let tree = result.filePaths[0];
            console.log(tree);
            event.reply('select-dirs',  [tree ,dirTree(tree)]);
        })
  }
}