import Vue from "vue";
import Vuex from "vuex";
//import PersistedState from 'vuex-electron-store';

Vue.use(Vuex);

//const persistentState = new Store();

export default new Vuex.Store({
  state: {
    treeFile : [],
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
 /* plugins: [
    PersistedState.create({
      paths: ['treeFile']
    })
  ],*/
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
       //persistentStore.set('treeFile', state.treeFile);
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
