import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();
const fs = require('fs');


export class BranchController {
    getStatus() {
        ipcMain.on('CHECK_BRANCH_STATUS', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload, {binary: 'git'});
            try {
                let test = await git.branch();
                event.reply('CHECK_BRANCH_STATUS', [{data: test, message: 'Le projet à bien été changé de branch', error: ''}]);
                console.log(test);
            } catch (e) {
                event.reply('CHECK_BRANCH_STATUS', [{data: {}, message: 'Une erreur est survenue', error: e}]);
                console.log(e)
            }
        });
    }
    getCurrentBranch() {
        ipcMain.on('CURRENT_BRANCH', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload, {binary: 'git'});
            try {
                //let test = await git.raw(["name-rev", "–name-only" ,"HEAD" ]);
                let test = await git.branch(["--show-current"]);
                event.reply('CURRENT_BRANCH', [{data: test, message: '', error: ''}]);
                console.log(test);
            } catch (e) {
                event.reply('CURRENT_BRANCH', [{data: {}, message: 'Une erreur est survenue', error: e}]);
                console.log(e)
            }
        });
    }

    changeBranch(){
        ipcMain.on('CHANGE_BRANCH', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            try {
                console.log(payload.branch)
                let verifyRemote = payload.branch.split("/");
                let test = '';
                if (verifyRemote.length > 2){
                    test = await git.raw(['checkout', '--track', payload.branch]);
                }else{
                    test = await git.raw(['checkout', payload.branch]);
                }
                event.reply('CHANGE_BRANCH', [{data: test, message: 'La branch à bien été changé', error: ''}]);
                console.log(test);
            } catch (e) {
                event.reply('CHANGE_BRANCH', [{data: {}, message: 'Une erreur est survenue', error: e}]);
                console.log(e)
            }

        });
    }

}