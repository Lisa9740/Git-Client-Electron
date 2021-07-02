import {BranchController} from "./git/branchController";
import {CommitController} from "./git/commitController";
import {ProjectController} from "./project/projectController";
import {FileController} from "./project/fileController";
import {DiffController} from "@/controllers/git/diffController";
import {GitController} from "@/controllers/git/gitController";

class BaseHandler {
    getGitCommands() { }
    getProject(win: Electron.BrowserWindow) {}
}

export class MainProcess extends BaseHandler {
    getProject(win: Electron.BrowserWindow) {
        ProjectController.prototype.openProject(win)
        ProjectController.prototype.reloadProject()

        FileController.prototype.openFile()
        FileController.prototype.modifyFile()
    }

    getGitCommands() {
        GitController.prototype.isGitProject()
        GitController.prototype.status()
        GitController.prototype.getRemoteStatus()
        GitController.prototype.gitInit()
        GitController.prototype.commit()
        GitController.prototype.push()
        GitController.prototype.pull()

        BranchController.prototype.getStatus()
        BranchController.prototype.getCurrentBranch()
        BranchController.prototype.changeBranch()

        DiffController.prototype.getDiffByFile()
        DiffController.prototype.getDiffByCommit()


        CommitController.prototype.getAllCommitHistory()
        CommitController.prototype.getCommitHistoryByFile()
        CommitController.prototype.addFileBeforeCommit()
    }
}


