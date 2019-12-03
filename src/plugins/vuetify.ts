import Vue from 'vue';
import Vuetify, {
  VBtn,
  VCard,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VContainer,
  VFlex,
  VIcon,
  VImg,
  VLayout,
  VSpacer,
} from 'vuetify/lib';
import ru from 'vuetify/src/locale/ru';

Vue.use(Vuetify, {
  components: { VFlex, VLayout, VContainer, VImg, VCard, VCardTitle, VCardSubtitle, VCardText, VSpacer, VIcon, VBtn },
  customProperties: true,
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#EE44AA',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { ru },
    current: 'ru',
  },
  icons: {
    iconfont: 'md',
  },
});
