import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { Dispatcher } from '/imports/services/Dispatcher';
import { I18n } from '/imports/services/I18n';

export const CMap = React.createClass({
  notifications: {
    getCurrentPosition: {
      message: I18n.translate('notification.getCurrentPosition'),
      level: 'info',
      autoDismiss: 0,
      uid: 'getCurrentPosition'
    },
    successCurrentPosition: {
      message: I18n.translate('notification.successCurrentPosition'),
      level: 'success',
      autoDismiss: 4,
      uid: 'successCurrentPosition'
    },
    errorCurrentPosition: {
      level: 'error',
      autoDismiss: 4,
      uid: 'errorCurrentPosition'
    },
  },


  getInitialState() {
    return {
      center: {
        lat: +localStorage.getItem('lastLat') || 0,
        lng: +localStorage.getItem('lastLng') || 0,
      },
      zoom: +localStorage.getItem('lastZoom') || 2,
    };
  },

  componentDidMount() {
    Dispatcher.publish('notification.add', this.notifications.getCurrentPosition);
    navigator.geolocation.getCurrentPosition((position) => {
      Dispatcher.publish('notification.remove', this.notifications.getCurrentPosition);
      Dispatcher.publish('notification.add', this.notifications.successCurrentPosition);

      localStorage.setItem('lastLat', position.coords.latitude);
      localStorage.setItem('lastLng', position.coords.longitude);
      localStorage.setItem('lastZoom', 14);

      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 14,
        loaded: true
      });
    }, (error) => {
      this.notifications.errorCurrentPosition.message = error.message;
      Dispatcher.publish('notification.remove', this.notifications.getCurrentPosition);
      Dispatcher.publish('notification.add', this.notifications.errorCurrentPosition);
    });
  },

  onMapInit(map) {
  },

  render() {
    return (
      <div className="map">
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              style={{
                height: `100%`,
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => this.onMapInit(map)}
              zoom={this.state.zoom}
              center={{ lat: this.state.center.lat, lng: this.state.center.lng }}
              defaultOptions={{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: true,
                fullscreenControl: false
              }}
            />
          }
         />
     </div>
    );
  }
});