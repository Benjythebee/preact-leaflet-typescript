import { Marker as LeafletMarker } from 'leaflet';
import createLayer from './create-layer';
import { LayerTypeConstructable } from './types';

const Marker = createLayer(LeafletMarker as unknown as LayerTypeConstructable, 'position', { componentName: 'Marker' });

export default Marker;
