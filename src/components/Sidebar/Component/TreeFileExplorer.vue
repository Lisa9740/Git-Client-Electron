<template>
  <div>
    <template>
      <v-subheader>Fichiers du projet</v-subheader>
      <v-list-item class="mt-2">
        <div v-if="$store.state.treeFile.length !== 0">
          <v-treeview
              :open="initiallyOpen"
              :items="$store.state.treeFile.children"
              item-key="name"
          >
            <template slot="label" slot-scope="{ item }">
              <div v-if="item.type === 'file'">
                <a @click="openFile(item)"> <router-link to="/file">{{ item.name }}</router-link></a>
              </div>
              <div v-else>
                {{ item.name }}
              </div>
            </template>
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="item.type !== 'file'">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ 'mdi-nodejs' }}
              </v-icon>
            </template>
          </v-treeview>
        </div>
      </v-list-item>
    </template>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "TreeFile",
  data: () => ({
    initiallyOpen: ['public'],
    statusFile: [],
    currentPath: "",
    isOpened: false,
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
  }),
  methods: {

    openFile: function (selection){
      window.api.send('READ_FILE', selection );

      window.api.on('READ_FILE', (payload) => {
        this.$store.commit('setFileInfo', selection);
        this.$store.commit('setFileContent', payload);

        this.$store.commit('isCurrentFileEditable', false);

        this.currentFile = this.$store.state.currentFileInfo;
        this.currentPath = this.currentFile.path;
      });
    },
  }
};
</script>
