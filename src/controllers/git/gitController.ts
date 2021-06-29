import {dialog, ipcMain} from "electron";
import simpleGit, {SimpleGit} from "simple-git";
const dirTree = require("directory-tree");

export class GitController {
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

    gitInit() {
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

    commit() {
        ipcMain.on('COMMIT', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            let result = await git.commit(payload.message, payload.file, {'--author': 'Lisa9740'});
            event.reply('COMMIT', result);
            //console.log(result, payload.message);
        });
    }

    push(){
        ipcMain.on('PUSH', async (event, payload) => {
            const git: SimpleGit = simpleGit(payload.path, {binary: 'git'});
            let result = await git.push();
            event.reply('PUSH', result);
        });
    }

    status() {
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

    getRemoteStatus() {
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