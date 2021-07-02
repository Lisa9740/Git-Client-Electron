import {ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';
import {exec} from "child_process";

export class DiffController {
    getDiffByFile(){
        ipcMain.on('DIFF_SUMMARY', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            let result = await git.raw(["diff", payload.currentFile]);
            event.reply('DIFF_SUMMARY', result);
        });
    }
    async isFileIsInIndex(path){
        const git: SimpleGit = simpleGit(path, { binary: 'git' });

    }
    // récupère le contenu d'un fichier selon le commit
    getDiffByCommit(){
        ipcMain.on('SHOW_DIFF_BY_COMMIT',  async (event, payload) => {
           const git: SimpleGit = simpleGit(payload.path, { binary: 'git' });
            let status = await git.status()
            console.log('diff ' + status)
            if (status.files.length > 0){
                let result = await git.stash().raw(["checkout", payload.hash, payload.file]).exec(() => {
                    exec(`cat ${ payload.file }`, (err, stdout) =>{
                        event.reply('SHOW_DIFF_BY_COMMIT', stdout)
                    })
                })
            }else{
                let result = await git.raw(["checkout", payload.hash, payload.file]).exec(() => {
                    exec(`cat ${ payload.file }`, (err, stdout) =>{
                        event.reply('SHOW_DIFF_BY_COMMIT', stdout)
                    })
                })
            }
        });
    }
    resetState(){
        ipcMain.on('RESET_STATE_BY_COMMIT',  async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, { binary: 'git' });
            let result = await git.raw(['reflog'])
            let status = await git.status()
            console.log(status)
            let hash = result.split(' ')
            let head = hash[1].split(':')
            if (status.files.length > 0){
                let reset = await git.raw(["reset", "--hard", head[0]]).raw(['stash','apply']).raw(["reflog", "expire"])
                event.reply('RESET_STATE_BY_COMMIT',  reset)
                console.log(reset)
            }else{
                let reset = await git.raw(["reset", "--hard", head[0]]).raw(["reflog", "expire"])
                event.reply('RESET_STATE_BY_COMMIT',  reset)
                console.log(reset)
            }

        });
    }
}