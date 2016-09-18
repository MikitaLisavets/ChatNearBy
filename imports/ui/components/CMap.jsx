import { default as React, Component } from 'react';
import { default as ReactDOM } from 'react-dom';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';

const mapState = {
    controls: ['default']
};

const points = [
    [55.737693, 37.723390],
    [55.737693, 37.733390],
    [55.744665, 37.491304],
    [55.636063, 37.566835],
    [55.865323, 37.599794],
    [55.741567, 37.960969]
];

export class CMap extends Component {
  onAPIAvailable() {
    console.log('API loaded');
  }

  onMarkerClick() {
    console.log('Marker clicked');
  }

  render() {
    return (
      <div className="map">
        <Map onAPIAvailable={this.onAPIAvailable.bind(this)}
          state={mapState}
          width={'100%'}
          height={'100%'}
          center={[55.754734, 37.583314]}
          zoom={10}>
            {points.map(([lat, lon], i) =>  (
              <Marker key={'marker_' + i} lat={lat} lon={lon} onClick={this.onMarkerClick.bind(this)}>
                  <MarkerLayout>
                      <div className="map__marker">
                      </div>
                  </MarkerLayout>
              </Marker>
            ))}
          </Map>
      </div>
    );
  }
}