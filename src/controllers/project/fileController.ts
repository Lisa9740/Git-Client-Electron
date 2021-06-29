import {ipcMain} from "electron";
const fs = require('fs');

export class FileController {
    openFile() {
        ipcMain.on('READ_FILE', (event, payload) => {
            const content = fs.readFileSync(payload.path, 'utf-8');
            event.reply('READ_FILE', content);
            //console.log(content)
        });
    }

    modifyFile() {
        ipcMain.on('WRITE_FILE', (event, payload) => {
            //console.log(payload)
            let newContent = payload[0];
            fs.writeFileSync(payload[1], newContent, 'utf-8')
            event.reply('WRITE_FILE', newContent)
        });
    }
}