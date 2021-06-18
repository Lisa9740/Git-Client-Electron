<template>
  <div class="mt-5">
    <h3>Fichiers modifiés</h3>
    <div v-if="$store.state.treeFile.length!== 0">
      <v-data-iterator
          class="mt-5"
          :items="status[0].modified"
          item-key="item"
          :single-expand="false"
      >
        <template v-slot:default="{ items }">
          <p
              v-for="item in items"
              :key="item.modified"
              cols="12"
          >
            <v-checkbox
                v-model="selected"
                :label="item"
                color="green"
                :value="item"
                hide-details
            ></v-checkbox>
          </p>
          <v-text-field v-model="message"></v-text-field>
          <v-btn v-on:click="commitFile">COMMIT</v-btn>
          <v-btn v-on:click="push">PUSH</v-btn>
        </template>
      </v-data-iterator>
    </div>
  </div>
</template>


<script>
export default {
  name: "Modified",
  data () {
    return {
      status: [],
      selected: [],
      message: "Update project",
      isDisplayed: false,
      isUpdated : false
    }
  },
  created() {
  this.status = [this.$store.state.statusGit]
    },
  methods: {
    commitFile(){
      console.log(this.selected)
      let selection = {
        message: this.message,
        file: this.selected,
        path: this.$store.state.treeFile.path,
      };

      window.api.send('COMMIT', selection);
      window.api.on('COMMIT',  (payload) => {
        console.log(payload)
        this.$notification.new("test", {  timer: 5});
      });

    },
    push(){
      let selection = {
        path: this.$store.state.treeFile.path
      };
      window.api.send('PUSH', selection);
      window.api.on('PUSH',  (payload) => {
        this.status = [];
        this.status = [this.$store.state.statusGit];
        this.$notification.new("hello world", {  timer: 5 });
      });
    }
  }
};
</script>
