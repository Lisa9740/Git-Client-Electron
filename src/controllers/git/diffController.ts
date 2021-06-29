import {ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';

class BaseHandler {
    getDiffByFile() { }
}

export class DiffController extends BaseHandler {
    getDiffByFile(){
        ipcMain.on('DIFF_SUMMARY', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            let result = await git.raw(["diff", payload.currentFile]);
            event.reply('DIFF_SUMMARY', result);
        });
    }
}