import Vue from "vue";
import VueRouter from "vue-router";
import Files from "../views/Project/File/FileView.vue";
import NotAdded from "@/components/Git/Status/NotAddedFiles.vue";
import Modified from "@/components/Git/Status/ModifiedFiles.vue";
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Files",
        component: Files,
    },
    {
        path: "/",
        name: "NotAdded",
        component: NotAdded,
    }, {
        path: "/",
        name: "Modified",
        component: Modified,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
export default router;
//# sourceMappingURL=index.js.map