import { Dispatcher } from '/imports/services/Dispatcher';
import { CONFIG } from '/imports/CONFIG';

export const Utils = {
  getLocale() {
    return localStorage.getItem('locale');
  },

  setLocale(locale) {
    localStorage.setItem('locale', locale);
    Dispatcher.publish('locale.changed', locale);
  },

  getCurrentPosition(cb) {
    navigator.geolocation.getCurrentPosition((position) => {
      if (cb) cb(position);
    }, (error) => {
      if (cb) cb(error);
    });
  },

  measureDistanceInMeters(lat1, lng1, lat2, lng2) {
    var R = 6378.137,
      dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180,
      dLng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180,
      a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
      d = R * c;
    return d * 1000;
  },

  isMoreThanPositionLimit(lat1, lng1, lat2, lng2) {
    return this.measureDistanceInMeters(lat1, lng1, lat2, lng2) >= CONFIG.limitDistance;
  }

}