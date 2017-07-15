// -----------------------------------------------------------------
// Presentational component for a Google Maps widget
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import GoogleMapReact from 'google-map-react';

import s from '../../scss/GoogleMaps.scss'

const Marker = ({ text }) => (
    <div className={s.marker}>
        {text}
    </div>
);

const GoogleMaps = (props) => (
    
    <div className={s.map}>
        <h1>Google Maps</h1>
        <GoogleMapReact
            defaultCenter={{lat: 59.95, lng: 30.33}}
            defaultZoom={11}
            bootstrapURLKeys={{
                key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
            }}
        >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text={'Kreyser Avrora'}
            />
        </GoogleMapReact>
        <h1>End</h1>
    </div>
)

GoogleMaps.propTypes = {
}

export default GoogleMaps

