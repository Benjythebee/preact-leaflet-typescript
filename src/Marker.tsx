import { Marker as LeafletMarker } from 'leaflet';
import createLayer, { AbstractLayer } from './create-layer';
import { LayerTypeConstructable } from './types';

const Marker = createLayer(LeafletMarker as unknown as LayerTypeConstructable, 'position', { componentName: 'Marker' }) as AbstractLayer;

export default Marker;
