import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import VueNotification from "@kugatsu/vuenotification";
Vue.use(VueNotification, {
    timer: 20
});

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles
Vue.component('PrismEditor', PrismEditor);

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