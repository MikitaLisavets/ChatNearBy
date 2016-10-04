import { default as React, PropTypes } from 'react';
import { default as ReactDOM } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { Dispatcher } from '/imports/services/Dispatcher';
import { CControls } from '/imports/ui/components/CControls';
import { I18n } from '/imports/services/I18n';
import { Chats } from '/imports/api/Chats';

const CMap = React.createClass({
  propTypes: {
    chats: PropTypes.array.isRequired
  },

  contextTypes: {
    router: PropTypes.object.isRequired
  },

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
      autoDismiss: 3,
      uid: 'successCurrentPosition'
    },
    errorCurrentPosition: {
      level: 'error',
      autoDismiss: 3,
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
    this.refs.mapControls.setCoords(this.state.center.lat, this.state.center.lng);

    Dispatcher.publish('notification.add', this.notifications.getCurrentPosition);
    navigator.geolocation.getCurrentPosition((position) => {
      Dispatcher.publish('notification.remove', this.notifications.getCurrentPosition);
      Dispatcher.publish('notification.add', this.notifications.successCurrentPosition);

      localStorage.setItem('lastLat', position.coords.latitude);
      localStorage.setItem('lastLng', position.coords.longitude);
      localStorage.setItem('lastZoom', 14);

      this.refs.mapControls.setCoords(position.coords.latitude, position.coords.longitude);

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

  onMarkerClick(chat) {
    this.context.router.push('/chat/' + chat._id);
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
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
              }}>
              {this.props.chats.map((chat, index) => (
                <Marker
                  key={index}
                  title={chat.title}
                  position={{
                    lat: chat.lat,
                    lng: chat.lng
                  }}
                  onClick={() => this.onMarkerClick(chat)}
                />
              ))}
            </GoogleMap>
          }
         />
       <CControls ref="mapControls"/>
     </div>
    );
  }
});

export default createContainer(() => {
  Meteor.subscribe('chats');
  return {
    chats: Chats.find({}).fetch()
  };
}, CMap);