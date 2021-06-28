import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();
const fs = require('fs');

class BaseHandler {
    getGitStatus() { }
    getBranchStatus() { }
    isGitProject() { }
    getStatusRemote() {}
    changeBranch() {}
}

export class StatusController extends BaseHandler {
    isGitProject() {
        ipcMain.on('CHECK_IS_GIT', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload, {binary: 'git'});
            try {
                // @ts-ignore
                let response = await git.checkIsRepo("root");
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
    getBranchStatus() {
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
    getGitStatus() {
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
    getStatusRemote() {
        ipcMain.on('GET_REMOTE_INFO', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload, {binary: 'git'});
            try {
                let response = await git.remote(['-v']);
                console.log(response);
                if (response){
                    event.reply('GET_REMOTE_INFO', [{data: response, message: ''}]);
                }

            } catch (e) {
                event.reply('GET_REMOTE_INFO', [{data: "", message: 'Une erreur est survenue'}]);
                console.log(e)
            }
        });
    }
}