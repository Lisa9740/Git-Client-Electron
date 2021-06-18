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
    openProject(){
      if (this.isOpened){
        window.api.send('select-dirs');
        window.api.on('select-dirs', (payload) => {
          this.file = payload[0];
          this.$store.commit('getTreeFile', payload[1]);
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
