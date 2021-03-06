import { Component, ComponentClass, h } from 'preact';
import { addListenersFromProps, removeListenersFromProps } from './helpers/map-listeners';
import getOptions from './helpers/get-options';
import { LayerTypeConstructable, LayerType, LayerProps } from './types/interfaces';

const createLayer = (
  TypeOfLayer: LayerTypeConstructable,
  firstArgProp: string,
  { componentName }: { componentName?: string } = {},
): ComponentClass<LayerProps, any> => {
  class Layer extends Component<LayerProps, any> {
    static LayerType: LayerTypeConstructable;
    layer: LayerType;

    componentDidMount() {
      const { children, leafletMap, ...props } = this.props;

      if (!leafletMap) {
        // eslint-disable-next-line
        console.error("Couldn't find leafletMap prop");
      }

      if (!props[firstArgProp]) {
        // eslint-disable-next-line
        console.error(`${firstArgProp} prop is required.`);
      }

      const options = getOptions(props, { exclude: firstArgProp });

      this.layer = new Layer.LayerType(props[firstArgProp], options);
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

  Layer.LayerType = TypeOfLayer;
  Layer.displayName = `createLayer(${componentName})`;

  return Layer;
};

export default createLayer;
