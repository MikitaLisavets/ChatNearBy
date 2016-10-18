import { default as React, PropTypes } from 'react';
import { default as ReactDOM } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';
import { Dispatcher } from '/imports/services/Dispatcher';
import { Utils } from '/imports/services/Utils';
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

  componentWillMount() {
    this.setState({
      center: {
        lat: +localStorage.getItem('lastLat') || 0,
        lng: +localStorage.getItem('lastLng') || 0,
      },
      zoom: +localStorage.getItem('lastZoom') || 2,
    });
  },

  showLocation() {
    Dispatcher.publish('notification.add', this.notifications.getCurrentPosition);
    Utils.getCurrentPosition((data) => {
      Dispatcher.publish('notification.remove', this.notifications.getCurrentPosition);
      if (data.coords) {
        localStorage.setItem('lastLat', data.coords.latitude);
        localStorage.setItem('lastLng', data.coords.longitude);
        localStorage.setItem('lastZoom', 14);

        this.setState({
          center: {
            lat: data.coords.latitude,
            lng: data.coords.longitude
          },
          zoom: 14
        });

        Dispatcher.publish('notification.add', this.notifications.successCurrentPosition);
      } else {
        this.notifications.errorCurrentPosition.message = data.message;
        Dispatcher.publish('notification.add', this.notifications.errorCurrentPosition);
      }
    });
  },

  onMapInit(map) {
  },

  onMarkerClick(chat) {
    this.context.router.push('/chat/' + chat._id);
  },

  addNewChat() {
    Dispatcher.publish('notification.add', this.notifications.getCurrentPosition);
    Utils.getCurrentPosition((data) => {
      Dispatcher.publish('notification.remove', this.notifications.getCurrentPosition);
      if (data.coords) {
        let isAllowToCreate = true;

        this.props.chats.forEach((chat) => {
          if(!Utils.isMoreThanPositionLimit(chat.lat, chat.lng, data.coords.latitude, data.coords.longitude)) {
            isAllowToCreate = false;
          }
        });

        if (isAllowToCreate) {
          var title = prompt('Please set title for chat', '') || '';

          Meteor.call('chats.insert', {
            title: title,
            lat: data.coords.latitude,
            lng: data.coords.longitude
          });
        } else {
          this.notifications.errorCurrentPosition.message = 'sorry';
          Dispatcher.publish('notification.add', this.notifications.errorCurrentPosition);
        }
      } else {
        this.notifications.errorCurrentPosition.message = data.message;
        Dispatcher.publish('notification.add', this.notifications.errorCurrentPosition);
      }
    })
  },

  renderMap() {
    return (
      <GoogleMap
        ref={(map) => this.onMapInit(map)}
        zoom={this.state.zoom}
        center={{ lat: this.state.center.lat, lng: this.state.center.lng }}
        defaultOptions={{
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM
          },
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        }}>
        {this.renderMarkers()}
      </GoogleMap>
    );
  },

  renderMarkers() {
    return (
      this.props.chats.map((chat, index) => (
        <Marker
          key={index}
          title={chat.title}
          position={{
            lat: chat.lat,
            lng: chat.lng
          }}
          onClick={() => this.onMarkerClick(chat)}
        />
      ))
    );
  },

  render() {
    return (
      <div className="map">
        <GoogleMapLoader
          containerElement={
            <div
              className="map__inner"
            />
          }
          googleMapElement={this.renderMap()}
         />
       <div className="map__current"
         onClick={this.showLocation}>Current Location</div>
       { this.props.user ?
         <div className="map__add" onClick={this.addNewChat}>Add</div>
         : ''
       }
     </div>
    );
  }
});

export default createContainer(() => {
  Meteor.subscribe('chats');
  return {
    user: Meteor.user(),
    chats: Chats.find({}).fetch()
  };
}, CMap);