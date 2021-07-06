<template>
  <div>
    <v-container>
      <h1> <v-icon class="mr-3">mdi-history</v-icon>Historique des commits</h1>
      <v-data-iterator
          class="mt-5"
          :items="logs"
          :single-expand="false"
          hide-default-footer
      >

        <template v-slot:default="{ items }">
          <v-timeline
              align-top
              dense
          >
            <div
                v-for="item in items"
                :key="item.hash"
                cols="12"
            >

                  <v-timeline-item v-for="commit in item.all" :key="commit.hash">

                      {{ commit.hash }}  -   {{ commit.message}}
                      <br>
                      {{ commit.refs }}
                      <br>
                      {{ commit.date | moment('Do MMMM  YYYY à HH:mm') }}
                      <br>
                      {{ commit.author_name }}
                  </v-timeline-item>


            </div>
          </v-timeline>
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
