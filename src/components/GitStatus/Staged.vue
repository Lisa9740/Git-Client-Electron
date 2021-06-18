<template>
  <div>
    <h3>Fichiers staged: {{ status.staged.length}}</h3>

    <v-data-iterator
        :items="status.staged"
        item-key="item"
        :single-expand="false"
        hide-default-footer
    >
      <template class="mt-5" v-slot:default="{ items }">
        <p
            v-for="item in items"
            :key="item.staged"
            cols="12"
        >
         {{ item }}
        </p>
<!--        <v-text-field v-model="message"></v-text-field>-->
<!--        <v-btn v-on:click="commitFile">COMMIT</v-btn>-->
<!--        <v-btn v-on:click="push">PUSH</v-btn>-->
      </template>
    </v-data-iterator>
  </div>

</template>

<script>
export default {
  name: "Staged",
  props: ['stagedStatus', 'treeFile'],
  data () {
    return {
      status: [],
      selected: [],
      message: "Update project",
      isDisplayed: false,
      isUpdated : false
    }
  },
  mounted() {
    this.status = this.stagedStatus[0]
  },
};
</script>
