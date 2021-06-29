<template>
  <div>
    <v-row class="mb-5">
      <v-btn v-on:click="save(text)"><v-icon class="mr-3">mdi-content-save</v-icon> Enregistrer</v-btn>
      <v-btn color="red" absolute right v-on:click="cancelEditing">Annuler</v-btn>
    </v-row>
    <v-textarea solo v-model="text" auto-grow></v-textarea>
  </div>
</template>

<script>
export default {
  name: "EditFile",
  props: ['fileContent'],
  data: () => ({
    text: ''
  }),
  created() {
    this.text = this.fileContent
  },
  methods: {
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