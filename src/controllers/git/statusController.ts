import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();
const fs = require('fs');

class BaseHandler {
    getStatus() { }
    isGitProject() { }
}

export class StatusController extends BaseHandler {
    getStatus() {
        ipcMain.on('CHECK_STATUS', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            try {
                let test = await git.status();
                event.reply('CHECK_STATUS', [{data: test, message: ''}]);
                console.log(test);
            } catch (e) {
                event.reply('CHECK_STATUS', [{data: {}, message: 'Une erreur est survenue'}]);
                console.log(e)
            }
        });
    }
    isGitProject() {
        ipcMain.on('CHECK_IS_GIT', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload, {binary: 'git'});
            try {
                let response = await git.checkIsRepo();
                console.log(response);
                if (response){
                    event.reply('CHECK_IS_GIT', [{data: response, message: ''}]);
                }

            } catch (e) {
                event.reply('CHECK_IS_GIT', [{data: false, message: 'Une erreur est survenue'}]);
                console.log(e)
            }
        });
    }
}