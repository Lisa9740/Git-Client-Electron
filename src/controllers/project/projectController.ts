import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from "simple-git";
const dirTree = require("directory-tree");

class BaseHandler {
    openProject(win: Electron.BrowserWindow) { }
    reloadProject() {}
    initGitProject() {}
    switchBranch() {}
}

export class ProjectController extends BaseHandler {
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
  initGitProject() {
      ipcMain.on('INIT_GIT', async (event, payload) => {
          const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
          try {
              let test = await git.init().addRemote( 'origin', payload.repoPath )
                  .exec(() => console.log('Starting fetching...'))
                  .fetch(['origin'])
                  .exec(() =>{
                      console.log('Finished fetching...')
                  })
                ;
              event.reply('INIT_GIT', [{data: test, message: 'Le projet à bien été initialisé !'}])
              //git.checkout([ test.all[0]);

          } catch (e) {
              event.reply('INIT_GIT', [{data: {}, message: 'Une erreur est survenue', error:''}]);
              console.log(e)
          }
      })
  }
  switchBranch(){

  }
}