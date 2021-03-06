import { h, Component, toChildArray, VNode, JSX } from 'preact';
import { Map as LeafletMap } from 'leaflet';
import { addListenersFromProps, removeListenersFromProps } from './helpers/map-listeners';
import { ExtendedMapOptionsProps } from './types/interfaces';

interface MapState {
  map: LeafletMap;
}

export default class Map extends Component<ExtendedMapOptionsProps, MapState> {
  ref: HTMLDivElement;

  componentDidMount() {
    const { bounds, zoom = 6, ...options } = this.getProps({ leafletOptions: true });

    const map = new LeafletMap(this.ref, { zoom, ...options });

    addListenersFromProps(map, this.props);

    if (bounds) {
      map.fitBounds(bounds);
    }

    this.setState({
      map,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.hasPropChanged('center', prevProps) || this.hasPropChanged('zoom', prevProps)) {
      this.state.map.setView(this.props.center, this.props.zoom || this.state.map.getZoom());
    }

    if (this.hasPropChanged('bounds', prevProps)) {
      this.state.map.fitBounds(this.props.bounds);
    }

    addListenersFromProps(this.state.map, this.props, {
      filter: ({ prop }) => !prevProps[prop],
    });

    removeListenersFromProps(this.state.map, prevProps, {
      filter: ({ prop }) => !this.props[prop],
    });
  }

  componentWillUnmount() {
    removeListenersFromProps(this.state.map, this.props);
    this.state.map.remove();
  }

  getProps({ leafletOptions = false } = {}) {
    const mapOptions = [
      'attributionControl',
      'bounceAtZoomLimits',
      'boundsOptions',
      'bounds',
      'crs',
      'closePopupOnClick',
      'center',
      'dragging',
      'easeLinearity',
      'fadeAnimation',
      'inertia',
      'inertiaDeceleration',
      'inertiaMaxSpeed',
      'keyboard',
      'keyboardPanDelta',
      'markerZoomAnimation',
      'maxBounds',
      'maxBoundsViscosity',
      'maxZoom',
      'minZoom',
      'layers',
      'preferCanvas',
      'renderer',
      'scrollWheelZoom',
      'tap',
      'tapTolerance',
      'touchZoom',
      'transform3DLimit',
      'wheelDebounceTime',
      'wheelPxPerZoomLevel',
      'worldCopyJump',
      'zoom',
      'zoomAnimation',
      'zoomControl',
    ];

    return Object.keys(this.props)
      .filter((prop) => (leafletOptions ? mapOptions.indexOf(prop) !== -1 : mapOptions.indexOf(prop) === -1))
      .reduce((props, prop) => ({ ...props, [prop]: this.props[prop] }), {
        bounds: null,
        zoom: 6,
      });
  }

  hasPropChanged(prop, prevProps: ExtendedMapOptionsProps) {
    return this.props[prop] !== prevProps[prop];
  }

  render() {
    const children = toChildArray(this.props.children)
      .filter((c) => c)
      .map((child: VNode<any>) =>
        Object.assign(child, {
          props: { ...child.props, leafletMap: this.state.map },
        }),
      );

    return (
      <div
        {...this.getProps()}
        ref={(ref) => {
          this.ref = ref;
        }}
      >
        {!!this.state.map && children}
      </div>
    );
  }
}
