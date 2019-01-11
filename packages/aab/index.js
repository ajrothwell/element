import Aab from './src/main';

/* istanbul ignore next */
Aab.install = function(Vue) {
  Vue.component(Aab.name, Aab);
};

export default Aab;
