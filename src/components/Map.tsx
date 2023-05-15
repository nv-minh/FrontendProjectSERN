import { memo } from 'react';
import GoogleMapReact from 'google-map-react';
import { HiLocationMarker } from 'react-icons/hi';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const Map = ({ latLng }: any) => {
  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDaOulQACiJzBfqumbsqg_-vKha8fCnL-s' }}
        defaultCenter={latLng}
        defaultZoom={11}
      >
        <AnyReactComponent
          lat={latLng.lat}
          lng={latLng.lng}
          text={<HiLocationMarker color="red" size={26} />}
        />
      </GoogleMapReact>
    </div>
  );
};
export default memo(Map);
