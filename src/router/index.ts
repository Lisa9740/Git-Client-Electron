import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Files from "../views/File.vue";
import NotAdded from "@/components/GitStatus/NotAdded.vue";
import Modified from "@/components/GitStatus/Modified.vue";
import Commits from "@/views/Commits.vue";
import Home from "@/views/Home.vue";
import Status from "@/views/Status.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/file",
    name: "Files",
    component: Files,
  },
  {
    path: "/commits",
    name: "Commits",
    component: Commits,
  },
  {
    path: "/status",
    name: "Status",
    component: Status,
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
