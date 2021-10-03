import { Marker as LeafletMarker } from 'leaflet';
import createLayer from './create-layer';
import { LayerTypeConstructable } from './types/interfaces';

export default createLayer(LeafletMarker as unknown as LayerTypeConstructable, 'position', { componentName: 'Marker' });
