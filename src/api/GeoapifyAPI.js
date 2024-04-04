import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';

const API_Geoapify = "5e6ccbd5d70e499ebaaa411b80cc5226"

// garbage, delete this
export function GeoapifySearchBar(value, placeSelectFunction) {
    
    return(
        <div>
          <GeoapifyContext apiKey={API_Geoapify}>
            <GeoapifyGeocoderAutocomplete
              placeholder='enter a location'
              value={value}
              placeSelect={placeSelectFunction}
              skipIcons="true"
              
            />
          </GeoapifyContext>
        </div>
    );
}