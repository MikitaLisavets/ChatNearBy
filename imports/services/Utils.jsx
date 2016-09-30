import { Dispatcher } from '/imports/services/Dispatcher';

export const Utils = {
  getLocale() {
    return localStorage.getItem('locale');
  },

  setLocale(locale) {
    localStorage.setItem('locale', locale);
    Dispatcher.publish('localeChanged', locale);
  },

}