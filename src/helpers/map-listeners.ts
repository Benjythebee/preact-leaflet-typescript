import { FeatureGroup, Map } from 'leaflet';
import { LayerType } from '../types/interfaces';

const onPropRegex = /on[A-Z](.*)/;

const getProvidedEventListeners = (props: any): { callback: (...e: any) => void; event: string; prop: string }[] =>
  Object.keys(props)
    .filter((prop: string) => prop.match(onPropRegex))
    .map((prop: string) => ({
      callback: props[prop],
      event: prop.slice(2).replace(/^[A-Z]/, (e) => e.slice(0, 1).toLowerCase()),
      prop,
    }));

const manageListeners = (inst: Map | LayerType | FeatureGroup, props, { filter, type }) => {
  let listeners = getProvidedEventListeners(props);

  if (filter) {
    listeners = listeners.filter(filter);
  }

  listeners.forEach(({ event, callback }) => {
    inst[type](event, callback);
  });
};

const addListenersFromProps = <T extends Map | LayerType | FeatureGroup>(inst: T, props, { filter = null } = {}) => {
  manageListeners(inst, props, { filter, type: 'on' });
};

const removeListenersFromProps = (inst: Map | LayerType | FeatureGroup, props, { filter = null } = {}) => {
  manageListeners(inst, props, { filter, type: 'off' });
};

export { addListenersFromProps, onPropRegex, removeListenersFromProps };
