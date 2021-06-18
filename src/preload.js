const { contextBridge, ipcRenderer } = require('electron');
window.ipcRenderer = ipcRenderer
const validChannels = ['READ_FILE', 'WRITE_FILE', 'select-dirs', 'CHECK_STATUS', 'COMMIT', 'LOG', 'PUSH', 'ADD', 'DIFF_SUMMARY'];
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            //let validChannels = ['toMain']
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, func) => {
            //let validChannels = ['fromMain']
            if (validChannels.includes(channel)) {
                    // Strip event as it includes `sender` and is a security risk
                    ipcRenderer.on(channel, (event, ...args) => func(...args));
                }
        },
    },
);
