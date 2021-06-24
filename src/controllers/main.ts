import {StatusController} from "./git/statusController";
import {CommitController} from "./git/commitController";
import {PushController} from "./git/pushController";
import {ProjectController} from "./project/projectController";
import {FileController} from "./project/fileController";
import {DiffController} from "@/controllers/git/diffController";

class BaseHandler {
    getGitCommands() { }
    getProject(win: Electron.BrowserWindow) {}
}

export class MainProcess extends BaseHandler {
    getProject(win: Electron.BrowserWindow) {
        ProjectController.prototype.openProject(win)
        FileController.prototype.openFile()
        FileController.prototype.modifyFile()
    }

    getGitCommands() {
        CommitController.prototype.postCommit()
        CommitController.prototype.getCommitHistory()
        CommitController.prototype.addFileBeforeCommit()
        StatusController.prototype.getStatus()
        StatusController.prototype.isGitProject()
        DiffController.prototype.getDiffByFile()
        PushController.prototype.push()
    }
}


