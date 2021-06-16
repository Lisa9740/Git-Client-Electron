<template>
  <v-app>
    <v-main>
<!--      <router-view />-->
<!--      <input type="file" :onclick="isOpened = true">-->

      <v-container>
        <h1> Client GIT</h1>
        <v-btn v-on:click="openFilePath()">Ouvrir projet</v-btn>

        <div v-if="treeFile.length !== 0">
          <h1>{{ treeFile.name }}</h1>
          <v-treeview
              v-model="tree"
              :open="initiallyOpen"
              :items="treeFile.children"
              activatable
              item-key="name"
              open-on-click
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="item.type !== 'file'">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ 'mdi-nodejs' }}
              </v-icon>
              <v-btn v-on:click="openFile(item)">Ouvrir fichier</v-btn>
            </template>
          </v-treeview>

          <div v-if="defaultContent">
            <v-textarea v-model="content" auto-grow>
            </v-textarea>

            <v-btn v-on:click="setFileChange(content)">Enregistrer Modifications</v-btn>

          </div>
        </div>
      </v-container>

    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    initiallyOpen: ['public'],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    },
    content : "",
    defaultContent : "",
    treeFile: [],
    file: "",
    currentPath: "",
    selection: [],
    isOpened: false,
    path: null
  }),
  methods: {
    openFilePath(){
      this.isOpened = true;
      this.openProject();
    },
    openProject(){
      if (this.isOpened){
        window.api.send('select-dirs');
          window.api.on('select-dirs', (payload) => {
            this.file = payload[0];
            this.treeFile = payload[1];
            console.log(this.treeFile);
          });
      }
    },
    openFile(selection){
      console.log(selection)
      window.api.send('READ_FILE', selection );
      window.api.on('READ_FILE', (payload) => {
        this.currentPath = selection.path;
        this.defaultContent = payload
        this.content = payload
        //console.log(payload);
      });

    },
    setFileChange(content){
      console.log("default" + content)
      this.modifyFile(this.content);
    },
    modifyFile(selection){
      let path = this.currentPath;
      window.api.send('WRITE_FILE', [selection,path] );
      window.api.on('WRITE_FILE');
    }
  }
});
</script>
