<template>
  <div>
    <router-link to="/file">
      <v-btn>Retour</v-btn>
    </router-link>
    <h2 class="text-center">Historique des Commits de {{ $store.state.currentFileInfo.name }}</h2>
    <div v-if="diff.length!== 0">
      <v-data-iterator
          class="mt-5"
          :items="diff"
          item-key="item"
          :single-expand="false"
      >
        <template v-slot:default="{ items }">
          <div
              v-for="item in items"
              :key="item.all"
              cols="12"
          >
            <div v-for="history in item.all"  :key="history.hash" class="mb-6 pb-6">
              <p>{{ history.hash}} -  {{ history.message}} <br>
                {{ history.author_name}} <br>
                {{ history.date}}
              </p>
              <router-link :to="/diff-by-file/ + history.hash">
                <v-btn class="mb-6">
                  VOIR
                </v-btn>
              </router-link>
              <v-divider></v-divider>
            </div>
          </div>
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