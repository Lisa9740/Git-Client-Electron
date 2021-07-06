<template>
  <div>

    <v-container class="edit-container" fluid>
    <v-row class="mb-5">
      <span class="mb-5"> En cours de modifications ... </span> <br>
      <v-spacer></v-spacer>
      <v-btn v-on:click="save(text)" class="mr-5"><v-icon class="mr-5">mdi-content-save</v-icon> Enregistrer</v-btn>
      <v-btn color="red" v-on:click="cancelEditing">Annuler</v-btn>
    </v-row>
      <prism-editor class="my-editor" v-model="fileContentEdit" :highlight="highlighter" line-numbers></prism-editor>
    </v-container>
    <!--    <v-textarea v-model="text" class="my-editor" auto-grow></v-textarea>-->

  </div>
</template>
<style>
.container.edit-container{
  border: green 1px solid;
  padding: 20px;
}
</style>
<script>
/* eslint-disable */
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; //

export default {
  name: "EditFile",
  props: ['fileContent'],
  data: () => ({
    text: ''
  }),
  created() {
    this.text = this.fileContent
  },
  components:{
    PrismEditor
  },
  computed: {
    fileContentEdit: {
      get: function(){
        return "" + this.text
      },
      set:function (newValue) {
        this.text = newValue
      }

    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
    updateThisContent(){
      let text = this.fileContent
      this.$emit("updateContent", text)
    },
    cancelEditing() {
      this.$store.commit('isCurrentFileEditable', false);
    },
    save(content) {
      let path = this.$store.state.currentFileInfo.path;
      window.api.send('WRITE_FILE', [content, path])

      window.api.on('WRITE_FILE', (payload) => {
        this.$store.commit('setFileContent', payload)
        this.$store.commit('isCurrentFileEditable', false);
        this.$store.commit('sendNotification',  this.$store.state.currentFileInfo.name + " sauvegardé avec succès !")
        this.isModified = true
        this.isSaved = true;
      });
    },
  }
}
</script>