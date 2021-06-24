import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';

class BaseHandler {
    push() { }
}

export class PushController extends BaseHandler {
   push(){
       ipcMain.on('PUSH', async (event, payload) => {
           const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
           let result = await git.push();
           event.reply('PUSH', result);
       });
   }
}