const { contextBridge, ipcRenderer } = require('electron');
window.ipcRenderer = ipcRenderer
const validChannels = [
    'select-dirs',
    'READ_FILE',
    'WRITE_FILE',
    'CHECK_IS_GIT',
    'INIT_GIT',
    'CHECK_STATUS',
    'CHECK_BRANCH_STATUS',
    'CHANGE_BRANCH',
    'CURRENT_BRANCH',
    'GET_REMOTE_INFO',
    'FETCH',
    'PULL',
    'LOG',
    'ADD',
    'COMMIT',
    'PUSH',
    'DIFF_SUMMARY',
    'reload-project'
];
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, func) => {
            if (validChannels.includes(channel)) {
                    // Strip event as it includes `sender` and is a security risk
                    ipcRenderer.on(channel, (event, ...args) => func(...args));
                }
        },
    },

);
