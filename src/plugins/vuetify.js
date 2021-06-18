import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import VueNotification from "@kugatsu/vuenotification";
Vue.use(VueNotification, {
    timer: 20
});
Vue.use(Vuetify);
export default new Vuetify({
    theme: {
        themes: {
            dark: {
                primary: '#346751',
                secondary: '#346751',
                anchor: '#346751',
            },
        },
        dark: true
    },
});
//# sourceMappingURL=vuetify.js.map