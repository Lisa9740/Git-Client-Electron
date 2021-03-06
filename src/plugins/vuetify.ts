import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import VueNotification from "@kugatsu/vuenotification";
const moment = require('moment')
require('moment/locale/fr')

Vue.use(VueNotification, {
    timer: 20
});
Vue.use(Vuetify);
Vue.use(require('vue-moment'), {
    moment
});

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
