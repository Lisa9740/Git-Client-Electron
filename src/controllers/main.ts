import {StatusController} from "./git/statusController";
import {CommitController} from "./git/commitController";
import {PushController} from "./git/pushController";
import {PullController} from "./git/pullController";
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
        ProjectController.prototype.initGitProject()
        ProjectController.prototype.reloadProject()
        FileController.prototype.openFile()
        FileController.prototype.modifyFile()
    }

    getGitCommands() {
        CommitController.prototype.postCommit()
        CommitController.prototype.getCommitHistory()
        CommitController.prototype.addFileBeforeCommit()
        StatusController.prototype.isGitProject()
        StatusController.prototype.getGitStatus()
        StatusController.prototype.getBranchStatus()
        StatusController.prototype.getCurrentBranch()
        StatusController.prototype.changeBranch()
        StatusController.prototype.getStatusRemote()
        DiffController.prototype.getDiffByFile()
        PushController.prototype.push()
        PullController.prototype.fetch()
        PullController.prototype.pull()
    }
}


