import {
  LatLngBoundsExpression,
  FeatureGroup,
  MapOptions,
  Map,
  Marker,
  MarkerOptions,
  Polyline,
  PolylineOptions,
  TileLayer,
  TileLayerOptions,
  ZoomOptions,
  ControlPosition,
} from 'leaflet';

// Map.tsx types:

interface ExtendedMapOptionsProps extends MapOptions {
  bounds: LatLngBoundsExpression;
}

// Create layer types:
type LayerType = Marker | TileLayer | Polyline;

type LayerTypeConstructable = LayerType & {
  new (firstArgProp: string, options: { componentName?: string }): LayerType;
};

interface CreateLayerOptions extends TileLayerOptions, PolylineOptions, MarkerOptions {
  leafletMap: Map;
  LayerType: LayerType;
  firstArgProp: string;
  options: { componentName: string };
}

// Zoom control types

interface ZoomControlProps {
  leafletMap: Map;
  position: ControlPosition;
  options: ZoomOptions;
}

// MarkerCluster Control props

interface MarkerClusterProps {
  leafletMap: Map;
  position: ControlPosition;
  options: ZoomOptions;
}
