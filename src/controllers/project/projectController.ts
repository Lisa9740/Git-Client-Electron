import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from "simple-git";
const dirTree = require("directory-tree");

export class ProjectController {

    openProject(win: Electron.BrowserWindow) {
        ipcMain.on('select-dirs', async (event, arg) => {
            const result = await dialog.showOpenDialog(win, {
                properties: ['openDirectory']
            })
            let tree = result.filePaths[0];
            //console.log(tree);
            event.reply('select-dirs',  [tree, dirTree(tree)]);
        })
  }

  reloadProject() {
      ipcMain.on('reload-project', async (event, payload) => {
          try {
              event.reply('reload-project', dirTree(payload))
          } catch (e) {
              console.log(e)
          }
      })
  }
}