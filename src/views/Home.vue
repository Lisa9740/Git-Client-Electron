<template>
  <div class="about">
    <v-container>
      <v-row>
        <div v-if="$store.state.treeFile.length === 0">
          <v-btn absolute right class="text-center" v-on:click="openFilePath()">Ouvrir projet Git</v-btn>
        </div>
        <div v-if="$store.state.treeFile.length !== 0">
          <v-btn color="red" absolute right class="text-center" v-on:click="$store.state.treeFile = []">Fermer projet</v-btn>
        </div>
      </v-row>
      <h1 class="text-center">Accueil</h1>

      <div v-if="$store.state.treeFile.path">
          <span>STATUS GIT : {{ $store.state.isGitProject }} </span>
          <div v-if="!$store.state.isGitProject">
            <p>Initialiser GIT ?</p>
            <v-btn>GIT INIT</v-btn>
          </div>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Home",
  data: () => ({
    treeFiles: [],
    isOpened: false,
  }),
  methods: {
    checkIfGitRepo(path){
      window.api.send('CHECK_IS_GIT', path);
      window.api.on('CHECK_IS_GIT', (payload) => {
        this.$store.commit('isGitProject', payload[0].data);
        //console.log(payload)
      })
    },
    openProject(){
      if (this.isOpened){
        window.api.send('select-dirs');
        window.api.on('select-dirs', (payload) => {
          this.file = payload[0];
          this.$store.commit('getTreeFile', payload[1]);
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
