import {ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();


class BaseHandler {
    postCommit() { }
    getAllCommitHistory() {}
    addFileBeforeCommit() {}
}

export class CommitController extends BaseHandler {
    addFileBeforeCommit() {
        ipcMain.on('ADD', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            try {
                let result = await git.add(payload.file);
                event.reply('ADD', [{data: result, message: 'Le fichier à bien été ajouter !'}]);
            } catch (e) {
                event.reply('ADD', [{data: {}, message: 'Une erreur est survenue'}]);
            }
            //console.log(result, payload.message);
        });
    }

    getAllCommitHistory() {
        ipcMain.on('LOG', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            let result = await git.log();
            event.reply('LOG', result);
            console.log(result, payload.path);
        });
    }

    getCommitHistoryByFile(){
        ipcMain.on('SHOW_COMMIT_BY_FIlE',  async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, { binary: 'git' });
            let result = await git.log(["--", payload.file]);
            event.reply('SHOW_COMMIT_BY_FIlE',  result);
        });
    }
}