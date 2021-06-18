<template>
<div>
  <v-container>
    <h1 v-if="$store.state.currentFileInfo.name" class="text-center">{{ $store.state.currentFileInfo.name}}</h1>
    <div v-if="$store.state.currentContentFile">
      <div v-if="!$store.state.isEditable">
        <v-textarea v-if="!$store.state.isEditable" disabled solo :value="$store.state.currentContentFile" auto-grow></v-textarea>
        <v-btn v-on:click="setEditable">Modifier</v-btn>
      </div>
      <div v-if="$store.state.isEditable">
        <v-textarea v-if="$store.state.isEditable" solo v-model="fileContent" auto-grow></v-textarea>

        <v-btn v-if="$store.state.isEditable" v-on:click="setFileChange(fileContent)">Enregistrer Modifications</v-btn>
        <v-btn color="red" absolute right v-on:click="cancelEditing">Annuler</v-btn>

        <div v-if="isModified">
          <v-text-field v-model="message"></v-text-field>
          <v-btn v-on:click="setCommitFile()">Commit modification</v-btn>
        </div>


      </div>
    </div>
  </v-container>
</div>
</template>

<script>
/*import NotAdded from "@/components/GitStatus/NotAdded";
import Modified from "@/components/GitStatus/Modified";
import Staged from "@/components/GitStatus/Staged";*/
export default {
  name: "Files",
  /*components: {Modified, NotAdded, Staged},*/
  data: () => ({
    dialog: false,
    isModified: false,
    isSaved: false,
    oldContent: "" ,
    content : "",
    file: "",
    modifiedFiles: [],
    status: [],
    //isEditable: false,
    fileContent: '',
    selection: [],
    isOpened: false,
    path: null,
    message: "",
  }),
  created() {
    this.getDiffSummary()
    // this.isEditable = this.isFileEditable;
  },
  methods: {
    getDiffSummary: function(folder){
      this.diff = []
      folder = this.$store.state.treeFile
      if (folder.path){
        window.api.send('DIFF_SUMMARY', folder);
        window.api.on('DIFF_SUMMARY',  (payload) => {
          // this.status = [payload];
          // this.dialog =true;
          console.log(payload);
        });

      }
    },
    getStatus: function (folder){
      this.status = []
      if (folder.path){
        window.api.send('CHECK_STATUS', folder.path);
        window.api.on('CHECK_STATUS',  (payload) => {
          this.status = [payload];
          this.dialog =true;
          console.log(this.status);
        });

      }
    },
    cancelEditing() {
      this.$store.commit('isCurrentFileEditable', false);
      if (this.isSaved){
        this.$store.commit('getFileContent', this.fileContent);
      }else{
        this.fileContent = this.$store.state.currentContentFile;
      }


    },
    setFileChange(content){
      console.log("default" + content)
      this.content = content
      this.modifyFile(this.content);
      this.isEditable = false;

    },
    modifyFile(selection){
      let path = this.$store.state.currentFileInfo.path;
      if (path){
        window.api.send('WRITE_FILE', [selection,path] );
        window.api.on('WRITE_FILE',  (payload) => {
          console.log('test' + payload)
          this.$store.commit('getFileContent', payload)

        });
        //this.fileContent = this.$store.state.currentContentFile
        this.isSaved = true;
        this.isModified = true;
        this.$notification.new("Fichier" +  this.$store.state.currentFileInfo.path + "à été sauvegardé avec succès!", {  timer: 10 });
      }
     // this.getStatus(this.tree.path);
    },
    setCommitFile(){
      console.log(this.selected)
      let selection = {
        message: this.message,
        file: this.$store.state.currentFileInfo.path,
        path: this.$store.state.treeFile.path,
      };

      window.api.send('COMMIT', selection);
      window.api.on('COMMIT',  (payload) => {
        console.log(payload)
        this.$notification.new("Commit pushed to" + payload.branch , {  timer: 6 });
      });
    },
    setEditable(){
      this.fileContent = this.$store.state.currentContentFile
      this.$store.commit('isCurrentFileEditable', true);

    }
  }
};
</script>
