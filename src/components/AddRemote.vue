<template>
  <div>
    <v-alert
        prominent
        color="blue-grey"
        type="info"
        class="mt-5"
    >
      <v-row align="center">
        <v-col class="grow">
          Ce dossier ne fait pas partie d'un projet git.
        </v-col>
        <v-col class="shrink">
          <v-btn v-on:click="dialogGitShow = true">GIT INIT</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <div v-if="dialogGitShow">
      Ajouter remote
      <v-text-field label="Nom de la branche" v-model="name"></v-text-field>
      <v-text-field label="Repo" v-model="path"></v-text-field>
      <v-btn v-on:click="addRemote">Ajouter remote</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddRemote",
  data: () => ({
    isOpened: false,
    dialogGitShow : false,
    name: '',
    path: ''
  }),
  methods: {
    reloadProject(){
      window.api.send("reload-project", this.$store.state.treeFile.path)
      window.api.on("reload-project", (payload) => {
        this.$store.commit("getTreeFile", payload )
      })
    },
    addRemote: function (){
      let payload = {}
      payload.path = this.$store.state.treeFile.path
      payload.repo = this.name
      payload.repoPath = this.path

      window.api.send('INIT_GIT', payload);
      window.api.on('INIT_GIT', (data) => {
        if (data[0].error){
          this.$notification.error(data[0].message , {  timer: 10 });
        }else{
          this.dialogGitShow = false
          this.$store.commit('isGitProject', true);
          this.$notification.new( data[0].message);
          //this.getBranchInfo()
          this.$emit("getBranchInfoRefresh", true)
          this.reloadProject()
        }
      })
    },
  }
};

</script>