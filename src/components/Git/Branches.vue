<template>
  <div v-if="$store.state.branches.length > 0" class="mr-0">
    <v-row align="center">
      <v-select
          v-model="currentBranch"
          :items="$store.state.branches"
          prepend-inner-icon="mdi-source-branch"
          v-on:change="switchBranch"
          menu-props="auto"
          hint="Branche Actuelle"
          persistent-hint
          single-line
      ></v-select>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Branches",
  data: () => ({
   currentBranch: ""
  }),
  created() {
    this.getBranchInfo()

  },
  methods: {
    switchBranch() {
     let data = {}
      data.path = this.$store.state.treeFile.path
      data.branch = this.currentBranch

      window.api.send("CHANGE_BRANCH", data)
      window.api.on("CHANGE_BRANCH", (payload) => {
          if (payload[0].error){
            this.$store.commit("sendNotification", payload[0].message)
          }else{
            this.$store.commit("sendNotification", payload[0].message)
            this.getBranchInfo()
            this.reloadProject()
          }
      })

    },
    getBranchInfo(){
      window.api.send("CHECK_BRANCH_STATUS", this.$store.state.treeFile.path)
      window.api.on("CHECK_BRANCH_STATUS", (payload) => {
        //this.branches.push(payload[0].data.all)
        this.$store.commit('setBranches', payload[0].data.all)
        this.$store.commit('setCurrentBranch',payload[0].data.current)
        this.currentBranch = this.$store.state.currentBranch
      })
    },
    reloadProject(){
      window.api.send("reload-project", this.$store.state.treeFile.path)
      window.api.on("reload-project", (payload) => {
        this.$store.commit("setTreeFile", payload )
      })
    },
  }
}
</script>