<template>
  <v-navigation-drawer
      v-model="$store.state.drawer"
      app
  >
    <template class="mt-6"
    >
      <v-list
          nav
          dense
      >
        <router-link to="/">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>
        </router-link>

        <router-link to="/commits" v-if="$store.state.isGitProject">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-calendar-multiple</v-icon>
            </v-list-item-icon>
           <v-list-item-title>Historique</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/status" v-if="$store.state.isGitProject">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-git</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Status GIT</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </template>
    <v-divider></v-divider>
    <TreeFile/>
  </v-navigation-drawer>
</template>
<script>
import TreeFile from "@/components/Sidebar/Component/TreeFileExplorer";
export default {
  name: "Sidebar",
  components: {TreeFile },
  data: () => ({
    treeFiles: [],
    initiallyOpen: ['public'],
    statusFile: [],
    currentPath: "",
    isOpened: false,
    drawer: false,
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
        console.log(payload)
        this.$store.commit('isCurrentFileEditable', false);

        this.currentFile = this.$store.state.currentFileInfo;
        this.currentPath = this.currentFile.path;

        this.content = payload
        this.defaultContent = payload

      });
    },
  }
};
</script>
