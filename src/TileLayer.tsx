import { TileLayer as LeafletTileLayer } from 'leaflet';
import createLayer from './create-layer';
import { LayerTypeConstructable } from './types/interfaces';

const TileLayer = createLayer(LeafletTileLayer as unknown as LayerTypeConstructable, 'url', {
  componentName: 'TileLayer',
});

export default TileLayer;
