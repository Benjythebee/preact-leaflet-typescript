import { Component } from 'preact';
import { addListenersFromProps, removeListenersFromProps } from './helpers/map-listeners';
import getOptions from './helpers/get-options';
import { CreateLayerOptions, LayerTypeConstructable, LayerType } from './types';
import Marker from './Marker';

const createLayer = (
  TypeOfLayer: LayerTypeConstructable,
  firstArgProp: string,
  { componentName }: { componentName?: string } = {},
) => {
  Layer.LayerType = TypeOfLayer;
  Layer.displayName = `createLayer(${componentName})`;

  return new Layer();
};

export default createLayer;

export class Layer extends Component<CreateLayerOptions, any> {
  static LayerType: LayerTypeConstructable;
  layer: LayerType;
  firstArgProps: string;

  componentDidMount() {
    const { children, leafletMap, ...props } = this.props;

    if (!leafletMap) {
      // tslint:disable-next-line
      console.error("Couldn't find leafletMap prop");
    }

    if (!props[this.firstArgProps]) {
      // tslint:disable-next-line
      console.error(`${this.firstArgProps} prop is required.`);
    }

    const options = getOptions(props, { exclude: this.firstArgProps });

    this.layer = new Layer.LayerType(props[this.firstArgProps], options);
    this.layer.addTo(leafletMap);

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
    return null;
  }
}
