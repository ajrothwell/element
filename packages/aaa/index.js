import aaa from './src/main';

/* istanbul ignore next */
aaa.install = function(Vue) {
  Vue.component(aaa.name, aaa);
};

export default aaa;
