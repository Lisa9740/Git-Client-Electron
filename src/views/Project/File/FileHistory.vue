<template>
  <div>
    <router-link to="/file">
      <v-btn>Retour</v-btn>
    </router-link>
    <h2 class="text-center"> <v-icon class="mr-3">mdi-history</v-icon> Historique des Commits </h2>
    <h2 v-if="$store.state.currentFileInfo.name" class="text-center mb-6">{{ $store.state.currentFileInfo.name}} <br>
      <span class="path-subtitle text-center">{{ $store.state.currentFileInfo.path }}</span>
    </h2>

    <div v-if="diff.length!== 0">
      <v-data-iterator
          class="mt-5"
          :items="diff"
          item-key="item"
          :single-expand="false"
      >
        <template v-slot:default="{ items }">
          <v-timeline
              align-top
              dense
          >
          <div
              v-for="item in items"
              :key="item.all"
              cols="12"
          >

              <div v-for="history in item.all"  :key="history.hash" class="mb-6 pb-6">

                  <v-timeline-item>
                    <span class="text-left">{{ history.date | moment('Do MMMM  YYYY à HH:mm')}}</span> <br>

                    {{ history.message}} -  {{ history.author_name}} <br>
                    <v-btn class="mt-4 mb-6" v-on:click="goToDiffPage(history)">
                      VOIR
                    </v-btn>
                  </v-timeline-item>
                <v-divider></v-divider>
              </div>

          </div>
          </v-timeline>
        </template>
      </v-data-iterator>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileHistory",
  data: () => ({
    diff: "",
    diffText: "",
  }),
  created() {
    this.getDiffSummary()
  },
  methods: {
    goToDiffPage(elem){
      this.$router.push({name:'FileDiff', params: {history: elem}})
    },
    getDiffSummary: function () {
      let data = {}
      data.path = this.$store.state.treeFile.path
      data.file = this.$store.state.currentFileInfo.name;

      window.api.send('SHOW_COMMIT_BY_FIlE', data);
      window.api.on('SHOW_COMMIT_BY_FIlE', (payload) => {
        this.diff = []
        this.diff = [payload]
        console.log(payload);
      });
    },
  }
}
</script>