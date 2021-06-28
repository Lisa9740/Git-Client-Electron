<template>
  <div class="about">
    <v-container>
      <div v-if="$store.state.treeFile.length === 0">
        <v-card
        height="150px"
        class="mt-9 d-flex justify-center align-content-center"
        >
          <v-btn class="text-center mt-9" v-on:click="openFilePath()">Ouvrir projet Git</v-btn>
        </v-card>
      </div>

      <div v-if="$store.state.treeFile.path">
          <div v-if="!$store.state.isGitProject">
            <AddRemote @getBranchInfoRefresh="refreshBranch"/>
          </div>
          <div v-if="$store.state.isGitProject">
            <v-row>
              <v-btn v-on:click="getRemotesInfo">Remote Info</v-btn>
              <v-btn v-on:click="getBranchInfo">Branch Info</v-btn>
              <v-btn v-on:click="pull">Pull</v-btn>
              <v-spacer></v-spacer>

              <div v-if="branches.length > 0" class="mr-0">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                      BRANCHES
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                        v-for="(item, index) in branches[0]"
                        :key="index"
                    >
                      <v-list-item-title v-on:click="switchBranch(item)">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-row>
            <v-container class="mt-6">
              <p v-if="this.$store.state.currentBranch">Branche actuelle : {{ this.$store.state.currentBranch }}</p>
              <p v-else>Aucune branche selectionné</p>
            </v-container>
          </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import AddRemote from "@/components/AddRemote";
export default {
  name: "Home",
  components: {AddRemote},
  data: () => ({
    treeFiles: [],
    isOpened: false,
    dialogGitShow : false,
    name: '',
    path: '',
    branches: [],
    currentBranch: '',
    isBranchRefreshed: false
  }),
  methods: {
    reloadProject(){
      window.api.send("reload-project", this.$store.state.treeFile.path)
      window.api.on("reload-project", (payload) => {
        this.$store.commit("getTreeFile", payload )
      })
    },
    refreshBranch: function(refresh){
      this.getBranchInfo()
    },
    switchBranch(branch) {
      let data = {}
      data.path = this.$store.state.treeFile.path
      data.branch = branch
      console.log(branch)
      window.api.send("CHANGE_BRANCH", data)
      window.api.on("CHANGE_BRANCH", (payload) => {
        if (payload[0].error){
          this.$notification.error(payload[0].message , {  timer: 10 });
        }else{
          this.$notification.new(payload[0].message , {  timer: 10 });
          this.getBranchInfo()
          this.reloadProject()
        }
      })
    },
    getRemotesInfo(){
      window.api.send("GET_REMOTE_INFO", this.$store.state.treeFile.path)
      window.api.on("GET_REMOTE_INFO", (payload) => {
        console.log(payload)
      })
    },
    getBranchInfo(){
      window.api.send("CHECK_BRANCH_STATUS", this.$store.state.treeFile.path)
      window.api.on("CHECK_BRANCH_STATUS", (payload) => {
        this.branches.push(payload[0].data.all)
        this.$store.commit('getCurrentBranch',payload[0].data.current)
      })
    },
    pull(){
      let data = {}
      data.path = this.$store.state.treeFile.path
      data.branch = this.$store.state.currentBranch
      window.api.send("PULL", data);
      window.api.on("PULL", (payload) => {
        console.log(payload)
      })
    },
    checkIfGitRepo(path){
      window.api.send("CHECK_IS_GIT", path);
      window.api.on("CHECK_IS_GIT", (payload) => {
        this.$store.commit('isGitProject', payload[0].data);
        if (payload[0].data){
          this.getBranchInfo()
        }
      })
    },
    openProject(){
      if (this.isOpened){
        window.api.send('select-dirs');
        window.api.on('select-dirs', (payload) => {
          this.file = payload[0];
          this.$store.commit('getTreeFile', payload[1]);
          this.$store.commit('openDrawer', true);
          this.checkIfGitRepo(payload[1].path)
        });
      }
    },
    openFilePath(){
      this.isOpened = true;
      this.openProject();
    },
  }
};

</script>
