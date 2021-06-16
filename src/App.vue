<template>
  <v-app>
    <v-main>
<!--      <router-view />-->
      <input type="file" :v-model="path">
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: "App",

  data: () => ({
    content : [],
    path: null
  }),
  mounted() {
    // handle reply from the backend
   ipcRenderer.on('READ_FILE', (payload) => {
     console.log(payload);
    });
  },
  methods: {

  }
});
</script>
