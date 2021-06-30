import {ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';

export class DiffController {
    getDiffByFile(){
        ipcMain.on('DIFF_SUMMARY', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            let result = await git.raw(["diff", payload.currentFile]);
            event.reply('DIFF_SUMMARY', result);
        });
    }
    getDiffByCommit(){
        ipcMain.on('SHOW_DIFF_BY_COMMIT',  async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, { binary: 'git' });
            let result = await git.raw("show",  [payload.hash+ ":"  +payload.file]);
            //let result = await git.raw(["checkout", payload.hash, "--", payload.file]);
            console.log(result)
            event.reply('SHOW_DIFF_BY_COMMIT',  result);
        });
    }
}