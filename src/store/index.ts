import Vue from "vue";
import Vuex from "vuex";
//import Store from 'electron-store';

Vue.use(Vuex);

//const persistentStore = new Store();

export default new Vuex.Store({
  state: {
    treeFile :  [],
    isGitProject : false,
    currentFileInfo : {},
    currentContentFile : {},
    statusGit : {},
    isEditable : false,
    drawer: false,
    currentBranch: "",
    branches: []
  },
  mutations: {
    isGitProject(state, data) {
      state.isGitProject = data
    },
    getTreeFile(state, data) {
        state.treeFile = data;
    },
    getStatusGit(state, data) {
      state.statusGit = data;
    },
    getFileInfo(state, data){
      state.currentFileInfo = data
    },
    getFileContent(state, data){
      state.currentContentFile = data
    },
    isCurrentFileEditable(state, value){
      state.isEditable = value
    },
    openDrawer(state, value){
      state.drawer = value
    },
    getBranches(state, value){
      state.branches = value
    },
    getCurrentBranch(state, value){
      state.currentBranch = value
    }
  },
  actions: {
    reloadProject(context){
      context.commit("getTreeFile", [])
    }
  },
  modules: {},
});
