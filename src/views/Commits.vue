<template>
  <div>
    <v-container>
      <h1>Historique des commits</h1>
      <v-data-iterator
          class="mt-5"
          :items="logs"
          :single-expand="false"
          hide-default-footer
      >
        <template v-slot:default="{ items }">
          <div
              v-for="item in items"
              :key="item.hash"
              cols="12"
          >
            <ul class="mt-5" v-for="commit in item.all" :key="commit.hash">
              <li>
                {{ commit.hash }}  -   {{ commit.message}}
                <br>
                {{ commit.refs }}
                <br>
                {{ commit.date | moment("ddd, MMMM YYYY, hh:mm:ss") }}
                <br>
                {{ commit.author_name }}
              </li>
            </ul>
          </div>
        </template>
      </v-data-iterator>
<!--      <v-btn v-if="$store.state.treeFile && this.$store.state.treeFile.length !== 0" v-on:click="getLogs()">Historique des commits</v-btn>-->
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Commits",
  data: () => ({
    logs: [],
    tree: []
  }),
  created() {
    this.getLogs()
    this.tree = this.$store.state.treeFile
    //this.isEditable = this.isFileEditable;
  },
  methods: {
    getLogs: function (folder) {
      folder = this.$store.state.treeFile;
      this.logs = []
      console.log(folder.path)
      if (folder.path) {
        window.api.send('LOG', folder);

        window.api.on('LOG', (payload) => {
          this.logs = [payload];
          console.log(this.logs);
        });
      }
    },
  }
};
</script>
