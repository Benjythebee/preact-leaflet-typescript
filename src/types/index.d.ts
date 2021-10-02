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

export interface ExtendedMapOptionsProps extends MapOptions {
  bounds: LatLngBoundsExpression;
}

// Create layer types:
export type LayerType = Marker | TileLayer | Polyline;

export type LayerTypeConstructable = LayerType & {
  new (firstArgProp: string, options: { componentName?: string }): LayerType;
};

export interface CreateLayerOptions extends TileLayerOptions, PolylineOptions, MarkerOptions {
  leafletMap: Map;
  LayerType: LayerType;
  firstArgProp: string;
  options: { componentName: string };
}

// Zoom control types

export interface ZoomControlProps {
  leafletMap: Map;
  position: ControlPosition;
  options: ZoomOptions;
}

// MarkerCluster Control props

export interface MarkerClusterProps {
  leafletMap: Map;
  position: ControlPosition;
  options: ZoomOptions;
}
