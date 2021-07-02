<template>
  <div>
    <v-row class="mb-5">
      <v-btn v-on:click="save(text)"><v-icon class="mr-3">mdi-content-save</v-icon> Enregistrer</v-btn>
      <v-btn color="red" absolute right v-on:click="cancelEditing">Annuler</v-btn>
    </v-row>
    <prism-editor class="my-editor" v-model="text" :highlight="highlighter" line-numbers></prism-editor>

  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles
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
  methods: {
    highlighter() {
      return highlight(this.text, languages.js); //returns html
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