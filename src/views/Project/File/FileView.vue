<template>
<div>
  <v-container class="view-file-container" fluid>
    <v-row class="mb-5" v-if="!$store.state.isEditable">
      <v-btn v-on:click="setEditable" v-if="!$store.state.isEditable" class="mb-5"><v-icon class="mr-3">mdi-pencil</v-icon>Modifier</v-btn>
      <v-spacer></v-spacer>
      <router-link to="/history-commits-by-file">
        <v-btn>
          <v-icon class="mr-3">mdi-history</v-icon>COMMITS
        </v-btn>
      </router-link>
    </v-row>

    <h2 v-if="$store.state.currentFileInfo.name" class="text-center mb-6">{{ $store.state.currentFileInfo.name}} <br>
      <span class="path-subtitle text-center">{{ $store.state.currentFileInfo.path }}</span>
    </h2>


    <v-divider></v-divider>
    <div v-if="$store.state.currentContentFile">
      <div v-if="!$store.state.isEditable">
        <prism-editor class="my-editor" v-model="fileContentView" :highlight="highlighter" line-numbers readonly></prism-editor>
      </div>
      <div v-else>
         <EditFile :fileContent="$store.state.currentContentFile"/>
      </div>
      <div v-if="isModified">
        <v-text-field v-model="message"></v-text-field>
        <v-btn v-on:click="setCommitFile()">Commit modification</v-btn>
      </div>
    </div>

  </v-container>
</div>
</template>
<style>
a {
  text-decoration: none !important;
}
.path-subtitle{
  text-align: center !important;
  font-size: 14px;
  font-weight: normal;
}
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: white;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}
.view-file-container{
  padding: 25px;
}
</style>
<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; //

import EditFile from "@/components/EditFile";
export default {
  name: "Files",
  components: {EditFile, PrismEditor},
  data: () => ({
    dialog: false,
    isModified: false,
    isSaved: false,
    modifiedFiles: [],
    status: [],
    contentSaved: '' ,
    fileContent:'',
    selection: [],
    isOpened: false,
    path: null,
    message: "",
    file: ''
  }),
  computed: {
    fileContentView: function (){
      return "" + this.$store.state.currentContentFile
    }
  },
  methods: {
    highlighter(file) {
      return highlight(file, languages.js); //returns html
    },
    setEditable() {
      this.$store.commit('isCurrentFileEditable', true);
    },
    setCommitFile() {
      let selection = {
        message: this.message,
        file: this.$store.state.currentFileInfo.path,
        path: this.$store.state.treeFile.path,
      };

      window.api.send('COMMIT', selection);
      window.api.on('COMMIT', (payload) => {
        console.log(payload)
        this.$notification.new("Commit pushed to" + payload.branch, {timer: 6});
      });
    },
    getDiffSummary: function (folder) {
      this.diff = []
      folder = this.$store.state.treeFile
      if (folder.path) {
        window.api.send('DIFF_SUMMARY', folder);
        window.api.on('DIFF_SUMMARY', (payload) => {
          console.log(payload);
        });

      }
    },
  }
};
</script>
