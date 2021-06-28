import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';

class BaseHandler {
    fetch() { }
    pull() { }
}

export class PullController extends BaseHandler {
    fetch(){
        ipcMain.on('FETCH', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload, {binary: 'git'});

            try{
                let result = await git.fetch(['origin','--all']);
                console.log(result)
                event.reply('FETCH', result);
            }catch (e){
                console.log(e)
            }
        });
    }
    pull(){
        ipcMain.on('PULL', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            try {
                let result = await git.pull();
                event.reply('PULL', result);
                console.log(result)
            }catch (e){
                console.log(e)
            }
        });
    }
}