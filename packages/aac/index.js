import Aac from './src/main';

/* istanbul ignore next */
Aac.install = function(Vue) {
  Vue.component(Aac.name, Aac);
};

export default Aac;
