import { TileLayer as LeafletTileLayer } from 'leaflet';
import createLayer from './create-layer';
import { LayerTypeConstructable } from './types';

const TileLayer = createLayer(LeafletTileLayer as unknown as LayerTypeConstructable, 'url', {
  componentName: 'TileLayer',
});

export default TileLayer;
