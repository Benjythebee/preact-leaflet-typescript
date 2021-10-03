import { Polyline as LeafletPolyline } from 'leaflet';
import createLayer from './create-layer';
import { LayerTypeConstructable } from './types/interfaces';

const Polyline = createLayer(LeafletPolyline as unknown as LayerTypeConstructable, 'positions', {
  componentName: 'Polyline',
});

export default Polyline;
