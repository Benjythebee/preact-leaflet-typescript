import { h, Component, toChildArray, VNode } from 'preact';
import { MarkerClusterGroup } from 'leaflet.markercluster';
import { addListenersFromProps, removeListenersFromProps } from './helpers/map-listeners';
import getOptions from './helpers/get-options';
import { MarkerClusterProps } from './types';
import { FeatureGroup } from 'leaflet';

export default class MarkersCluster extends Component<MarkerClusterProps, any> {
  layer: FeatureGroup;
  constructor(props: MarkerClusterProps) {
    super(props);
    this.layer = MarkerClusterGroup(getOptions(props)) as FeatureGroup;
  }

  componentDidMount() {
    this.layer.addTo(this.props.leafletMap);
    addListenersFromProps(this.layer, this.props);
  }

  componentDidUpdate(prevProps) {
    addListenersFromProps(this.layer, this.props, {
      filter: ({ prop }) => !prevProps[prop],
    });

    removeListenersFromProps(this.layer, prevProps, {
      filter: ({ prop }) => !this.props[prop],
    });
  }

  componentWillUnmount() {
    removeListenersFromProps(this.layer, this.props);
    this.layer.removeFrom(this.props.leafletMap);
  }

  render() {
    const children = toChildArray(this.props.children)
      .filter((c) => c)
      .map((child: VNode<any>) => ({
        ...child,
        props: { ...child.props, leafletMap: this.layer },
      }));

    return <div>{children}</div>;
  }
}
