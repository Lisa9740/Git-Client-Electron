<template>
  <div>
    <h3>Fichiers non ajouté : {{ notAddedStatus[0].not_added.length}} </h3>

    <v-data-iterator
        :items="notAddedStatus[0].not_added"
        item-key="item"
        group-by="item"
        :single-expand="true"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
    >
      <template v-slot:default="{ items }">
        <p
            v-for="item in items"
            cols="12"
        >
          <v-checkbox
              v-model="selected"
              :label="item"
              color="red darken-3"
              :value="item"
              hide-details
          ></v-checkbox>
        </p>
      </template>
    </v-data-iterator>
    <v-row>
      <v-col>
        <v-btn right absolute v-on:click="addFile">Ajouter selectionné(s)</v-btn>
      </v-col>
    </v-row>

  </div>

</template>

<script>
export default {
  name: "NotAdded",
  props: ['notAddedStatus', 'treeFile'],
  data () {
    return {
      selected: [],
      page: 1,
      itemsPerPage: 15,
    }
  },
  methods: {
    addFile(){
      console.log(this.selected)
      let selection = {
        file: this.selected,
        path: this.treeFile.path,
      };

      window.api.send('ADD', selection);
      window.api.on('ADD',  (payload) => {
        console.log(payload)
        this.$notification.new("test", {  timer: 1 });
      });

    },
  }
};
</script>
