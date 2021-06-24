<template>
      <div v-if="tree">
        <div v-if="status">
          <div v-if="status.length !== 0">
            <v-spacer></v-spacer>
              <v-btn
                        right
                        absolute
                        color="primary"
                        v-on:click="getStatus(tree)"
                    >Actualiser</v-btn>
  <!--                  <NotAdded :notAddedStatus="status" :treeFile="tree"/>-->
<!--                    <Staged :stagedStatus="status" :treeFile="tree"/>-->
                    <Modified/>
            </div>
          </div>
        </div>
</template>
<script>
import Modified from "@/components/GitStatus/Modified";

export default {
  name: "Status",
  data: () => ({
    status: [],
    tree: []
  }),
  created() {
    this.getStatus()
    this.tree = this.$store.state.treeFile
    //this.isEditable = this.isFileEditable;
  },
  components: { Modified },
  methods: {
    getStatus: function (folder) {
      folder = this.$store.state.treeFile;
      this.status = []

      if (folder.path) {
        window.api.send('CHECK_STATUS', folder);

        window.api.on('CHECK_STATUS', (payload) => {
          this.$store.commit('getStatusGit', payload[0].data)
          this.status =  [this.$store.state.statusGit];
          console.log(this.status);
        });
      }
    },
  }
};
</script>
