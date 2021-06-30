<template>
  <div>
    <router-link to="/history-commits-by-file">
      <v-btn>Retour</v-btn>
    </router-link>

   <code-diff :old-string="diffText" :new-string="$store.state.currentContentFile" :context="10" title="test" outputFormat="side-by-side"/>
    <v-row>
<!--      <v-col>
        <v-textarea :value="$store.state.currentContentFile" auto-grow></v-textarea>
      </v-col>
      <v-col>
        <v-textarea :value="diffText" auto-grow></v-textarea>
      </v-col>-->
    </v-row>
  </div>
</template>

<script>
import CodeDiff from 'vue-code-diff'
export default {
  components: {CodeDiff},
  name: "FileDiff",
  props: ["hash"],
  data: () => ({
    diffText: "",
  }),
  created() {
    this.getHistoryContent()
  },
  methods:{
    getHistoryContent: function () {
      let info = {}
      info.path = this.$store.state.treeFile.path
      info.hash = this.hash
      info.file = this.$store.state.currentFileInfo.path

      window.api.send('SHOW_DIFF_BY_COMMIT', info);
      window.api.on('SHOW_DIFF_BY_COMMIT', (payload) => {
        this.diffText = payload
        console.log(payload);
      });
    }
  }
}
</script>