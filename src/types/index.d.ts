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
  bounds?: LatLngBoundsExpression;
  style?: Partial<CSSStyleDeclaration>;
}

// Create layer types:
type LayerType = Marker | TileLayer | Polyline;

type LayerTypeConstructable = LayerType & {
  new (firstArgProp: string, options: { componentName?: string }): LayerType;
};

interface LayerProps extends TileLayerOptions, PolylineOptions, MarkerOptions {
  url?: string;
  position?: number[];
  positions?: number[][];
  readonly leafletMap?: Map;
}

// Zoom control types

interface ZoomControlProps {
  readonly leafletMap?: Map;
  position?: ControlPosition;
  options?: ZoomOptions;
}

// MarkerCluster Control props

interface MarkerClusterProps {
  leafletMap?: Map;
  position: ControlPosition;
  options: ZoomOptions;
}
