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
    branches: [],
    message: "",
    snackbar : false
  },
  mutations: {
    openDrawer(state, value){
      state.drawer = value
    },

    sendNotification(state, value){
          state.snackbar = true
          state.message = value
    },
    isGitProject(state, data) {
      state.isGitProject = data
    },
    setTreeFile(state, data) {
        state.treeFile = data;
    },
    getStatusGit(state, data) {
      state.statusGit = data;
    },
    setFileInfo(state, data){
      state.currentFileInfo = data
    },
    setFileContent(state, data){
      state.currentContentFile = data
    },
    isCurrentFileEditable(state, value){
      state.isEditable = value
    },
    setBranches(state, value){
      state.branches = value
    },
    setCurrentBranch(state, value){
      state.currentBranch = value
    }
  },
  actions: {

  },
  modules: {},
});
