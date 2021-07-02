<template>
  <div>
    <router-link to="/history-commits-by-file">
      <v-btn>Retour</v-btn>
    </router-link>

    <div v-if="diffText.length > 0">
      <v-container>

      </v-container>

    <v-row>
      <v-col>
            <prism-editor class="my-editor" v-model="$store.state.currentContentFile" :highlight="highlighterBase" readonly line-numbers></prism-editor>
        </v-col>
        <v-col>
        <prism-editor class="my-editor" v-model="diffText" :highlight="highlighter" line-numbers readonly></prism-editor>
        </v-col>
    </v-row>
    </div>
  </div>
</template>
<style>
.custom{
  background-color: white;
}
</style>
<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles
export default {
  components: {
    PrismEditor,
  },
  name: "FileDiff",
  props: ["hash"],
  data: () => ({
    diffText: "",
    code: 'console.log("Hello World")'
  }),
  created() {
    this.getHistoryContent()
  },
  methods:{
    highlighter() {
      return highlight(this.diffText, languages.js); //returns html
    },
    highlighterBase() {
      return highlight(this.$store.state.currentContentFile, languages.js); //returns html
    },
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
      info.hash = this.hash
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