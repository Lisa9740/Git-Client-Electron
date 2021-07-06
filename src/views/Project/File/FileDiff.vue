<template>
  <div>
    <router-link to="/history-commits-by-file">
      <v-btn>Retour</v-btn>
    </router-link>

    <div v-if="diffText.length > 0">
        <div>
          <h2 v-if="$store.state.currentFileInfo.name" class="text-center mb-6">{{ $store.state.currentFileInfo.name}} <br>
            <span class="path-subtitle text-center">{{ $store.state.currentFileInfo.path }}</span>
          </h2>
          <div>

              <v-alert
                  text
                  dense
                  color="teal darken-1"
                  type="info"
              >
                Commit du {{ history.date | moment('Do MMMM  YYYY à HH:mm') }} <br>
                Message : {{ history.message }} <br>
                Author : {{ history.author_name }}
              </v-alert>


          </div>
        </div>


        <div  class="diff-viewer" >
          <div v-html="prettyHtml" />
        </div>


    </div>
  </div>
</template>
<style>
.custom, .diff-viewer{
  background-color: white;
  padding: 20px;
  color: black;

}
.d2h-diff-tbody, .d2h-file-list-wrapper, .d2h-file-name-wrapper{
  color: black;
}
</style>
<script>
import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';

export default {
  name: "FileDiff",
  props: ["history"],
  data: () => ({
    data : "",
    diffText: "",
  }),
  mounted() {
    this.getHistoryContent()
  },
  computed: {
    prettyHtml() {
        return Diff2Html.html(this.diffText , {
          drawFileList: true,
          matching: 'lines',
          outputFormat: 'side-by-side',
        });

    },
  },
  methods:{
    resetState(){
      let info = {}
      info.path = this.$store.state.treeFile.path
      window.api.send('RESET_STATE_BY_COMMIT', info);
      window.api.on('RESET_STATE_BY_COMMIT', (payload) => {
        console.log(payload);
      });
    },
    getHistoryContent: function () {
      let info = {}
      info.path = this.$store.state.treeFile.path
      info.hash = this.history.hash
      info.file = this.$store.state.currentFileInfo.path

      window.api.send('SHOW_DIFF_BY_COMMIT', info);
      window.api.on('SHOW_DIFF_BY_COMMIT', (payload) => {
       this.diffText = payload
        console.log(payload);
      });
      this.resetState()
    }
  }
}
</script>