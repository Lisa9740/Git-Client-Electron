<template>
  <v-app>
    <Sidebar/>
    <v-app-bar app>
      <h1> Client GIT</h1>
<!--      <v-app-bar-nav-icon @click.stop="/*drawer = !drawer*/"></v-app-bar-nav-icon>-->
    </v-app-bar>
    <v-main>
      <v-container fluid>
         <router-view>
         </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import Files from "./views/File";
import Sidebar from "@/components/Sidebar";
import Commits from "@/views/Commits";

export default Vue.extend({
  name: "App",
  components: {Commits, Files, Sidebar},
});
</script>
