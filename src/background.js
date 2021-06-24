"use strict";
import { app, protocol, BrowserWindow, dialog, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
const dirTree = require("directory-tree");
// Import `SimpleGit` types and the default function exported from `simple-git`
import simpleGit from 'simple-git';
const git = simpleGit();
const fs = require('fs');
const path = require("path");
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);
// @ts-ignore
let win;
async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //enableRemoteModule: true, //this must be true
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preload.js")
        },
    });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST)
            win.webContents.openDevTools();
    }
    else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS);
        }
        catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    //registerLocalResourceProtocol()
    createWindow();
});
// Exit cleanly on request from parent controllers in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    }
    else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}
ipcMain.on('READ_FILE', (event, payload) => {
    const content = fs.readFileSync(payload.path, 'utf-8');
    event.reply('READ_FILE', content);
});
ipcMain.on('WRITE_FILE', (event, payload) => {
    console.log(payload);
    let newContent = payload[0];
    fs.writeFileSync(payload[1], newContent, 'utf-8');
});
ipcMain.on('CHECK_STATUS', async (event, payload) => {
    //const git = await simpleGit(payload)
    const git = simpleGit(payload, { binary: 'git' });
    let test = await git.status();
    //console.log(git, test, payload);
    event.reply('CHECK_STATUS', test);
});
ipcMain.on('ADD', async (event, payload) => {
    const git = simpleGit(payload.path, { binary: 'git' });
    let result = await git.add(payload.file);
    event.reply('ADD', result);
    //console.log(result, payload.message);
});
ipcMain.on('COMMIT', async (event, payload) => {
    const git = simpleGit(payload.path, { binary: 'git' });
    let result = await git.commit(payload.message, payload.file, { '--author': 'Lisa9740' });
    event.reply('COMMIT', result);
    console.log(result, payload.message);
});
ipcMain.on('PUSH', async (event, payload) => {
    const git = simpleGit(payload.path, { binary: 'git' });
    let result = await git.push();
    event.reply('PUSH', result);
});
ipcMain.on('select-dirs', async (event, arg) => {
    const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    });
    let tree = result.filePaths[0];
    console.log(tree);
    event.reply('select-dirs', [tree, dirTree(tree)]);
});
//# sourceMappingURL=background.js.map