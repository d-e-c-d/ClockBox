import './assets/tailwind.css';
import router from './router';
import { createApp } from 'vue'
import EN from './locale/en.json'
import FR from './locale/fr.json'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

const defaultLanguage = ()  => {
    const result = navigator.language.split("-")[0];
    if (result !== "fr") {
        return "en";
    } return result
};
const i18n = createI18n({
    legacy: false,
    locale: defaultLanguage(),
    fallbackLocale: 'en',
    messages: {
        en: EN,
        fr: FR
    }
})

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');