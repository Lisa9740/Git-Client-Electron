<template>
  <v-app>
    <Sidebar/>
    <v-app-bar app>
      <h1> Client GIT</h1>
      <v-spacer></v-spacer>
      <div v-if="$store.state.treeFile.length !== 0">
        <v-btn color="red" class="text-center mr-0" v-on:click="closeProject">Fermer projet</v-btn>
      </div>
<!--      <v-app-bar-nav-icon @click.stop="/*drawer = !drawer*/"></v-app-bar-nav-icon>-->
    </v-app-bar>
    <v-main>
      <Notifications/>
      <v-container fluid>
         <router-view>
         </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import Sidebar from "@/components/Sidebar/Sidebar";
import Notifications from "@/components/Notifications";

export default Vue.extend({
  name: "App",
  components: {Sidebar, Notifications},
  methods: {
    closeProject() {
      this.$store.state.treeFile = [];
      this.$store.commit('isGitProject', false);
      this.$store.commit('openDrawer', false);
    }
  }
});
</script>
