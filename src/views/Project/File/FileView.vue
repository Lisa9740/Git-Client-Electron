<template>
<div>
  <v-container>
    <v-row v-if="!$store.state.isEditable">
      <v-btn v-on:click="setEditable"><v-icon class="mr-3">mdi-pencil</v-icon>Modifier</v-btn>
      <v-spacer></v-spacer>
      <router-link to="/history-commits-by-file">
        <v-btn>
          <v-icon class="mr-3" >mdi-eye</v-icon>Historique
        </v-btn>
      </router-link>
    </v-row>

    <h1 v-if="$store.state.currentFileInfo.name" class="text-center">{{ $store.state.currentFileInfo.name}}</h1>

    <div v-if="$store.state.currentContentFile">
      <div v-if="!$store.state.isEditable">
        <v-textarea v-if="!$store.state.isEditable" disabled solo :value="$store.state.currentContentFile" auto-grow></v-textarea>
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
</style>
<script>
import EditFile from "@/components/EditFile";
export default {
  name: "Files",
  components: {EditFile},
  data: () => ({
    dialog: false,
    isModified: false,
    isSaved: false,
    file: "",
    modifiedFiles: [],
    status: [],
    fileContent: '',
    contentSaved: '' ,
    selection: [],
    isOpened: false,
    path: null,
    message: "",
  }),
  created() {
    //this.getDiffSummary()
  },
  methods: {
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
    showDiff(){
       let data = {}
       data.path = this.$store.state.treeFile.path
       data.currentFile = this.$store.state.currentFileInfo.name
        window.api.send('DIFF_SUMMARY', data);
        window.api.on('DIFF_SUMMARY', (payload) => {
          console.log(payload);
       });
    }
  }
};
</script>
