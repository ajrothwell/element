import aab from './src/main';

/* istanbul ignore next */
aab.install = function(Vue) {
  Vue.component(aab.name, aab);
};

export default aab;
