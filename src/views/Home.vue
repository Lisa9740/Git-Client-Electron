<template>
  <div class="about">
    <v-container>
      <div v-if="$store.state.treeFile.length === 0">
        <v-card
        height="150px"
        class="mt-9 d-flex
        justify-center
        align-content-center"
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
              <v-btn v-on:click="pull"><v-icon color="green">mdi-arrow-bottom-left</v-icon>Pull</v-btn>
              <v-spacer></v-spacer>
              <Branches/>
            </v-row>
          </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import AddRemote from "@/components/Git/AddRemote";
import Branches from "@/components/Git/Branches";

export default {
  name: "Home",
  components: {Branches, AddRemote},
  data: () => ({
    isOpened: false,
    dialogGitShow : false,
    isBranchRefreshed: false,
    pullSummary: "",
  }),
  methods: {
    reloadProject(){
      window.api.send("reload-project", this.$store.state.treeFile.path)
      window.api.on("reload-project", (payload) => {
        this.$store.commit("setTreeFile", payload )
      })
    },
    refreshBranch: function(refresh){
      this.getBranchInfo()
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
        //this.branches.push(payload[0].data.all)
        this.$store.commit('setBranches', payload[0].data.all)
        this.$store.commit('setCurrentBranch',payload[0].data.current)
      })
    },
    pull(){
      let data = {}
      data.path = this.$store.state.treeFile.path
      data.branch = this.$store.state.currentBranch
      window.api.send("PULL", data);
      window.api.on("PULL", (payload) => {
        if (payload.files.length > 0){
          this.pullSummary = "Pull terminé: " + payload.files.length + " fichier(s) ont été modifié." ;
        }else{
          this.pullSummary = "Pull terminé: projet git déjà à jour." ;
        }
        this.$store.commit("sendNotification", this.pullSummary)
      })
    },
    checkIfGitRepo(path){
      window.api.send("CHECK_IS_GIT", path);
      window.api.on("CHECK_IS_GIT", (payload) => {
        this.$store.commit('isGitProject', payload[0].data);
      })
    },
    openProject(){
      if (this.isOpened){
        window.api.send('select-dirs');
        window.api.on('select-dirs', (payload) => {
          this.file = payload[0];
          this.$store.commit('setTreeFile', payload[1]);
          this.$store.commit('openDrawer', true);
          this.checkIfGitRepo(payload[1].path)
          this.getBranchInfo()
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
