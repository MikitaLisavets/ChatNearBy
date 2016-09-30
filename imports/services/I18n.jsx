import { Utils } from '/imports/services/Utils';
import { Dispatcher } from '/imports/services/Dispatcher';

export const I18n = {
  locale: Utils.getLocale(),
  init() {
    Dispatcher.subscribe('localeChanged', (locale) => {
      this.locale = locale;
    });
  },
  translate(key, args) {
    var translate = this.message[key][this.locale];
    if(args && args.length) {
      for (var i = 0, len = args.length; i < len; i += 1) {
        translate = translate.replace('{' + i + '}', args[i]);
      }
    }
    return translate;
  },
  message: {
    'header.changeLang': {
      'en': 'Change Language',
      'ru': 'Сменить язык'
    },
    'notification.getCurrentPosition': {
      'en': 'Getting current position',
      'ru': 'Получения текущего местоположения'
    },
    'notification.successCurrentPosition': {
      'en': 'Possition getted',
      'ru': 'Местоположение получено'
    },
  }
}

I18n.init();