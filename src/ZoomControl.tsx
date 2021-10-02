import { Component } from 'preact';
import { Control, control, Map, ZoomOptions } from 'leaflet';
import { ZoomControlProps } from './types';

export default class ZoomControl extends Component<ZoomControlProps, any> {
  control: Control;
  componentDidMount() {
    const { leafletMap, ...options } = this.props;
    // eslint-disable-next-line new-cap
    this.control = new Control.Zoom(options);
    this.control.addTo(leafletMap);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position) {
      this.control.setPosition(this.props.position);
    }
  }

  componentWillUnmount() {
    this.control.remove();
  }

  render() {
    return null;
  }
}
