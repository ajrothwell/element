<template>
  <div class='wrapper grid-y'>
    <!-- <div class="callout columns small-24"> -->
    <div :class="'callout ' + this.calloutClass">
      <p v-if="this.message"
         v-html="this.message"
      />
      <!-- <topic-component-group :topic-components="this.components"
                             v-if="this.components"
      /> -->
    </div>
  </div>
</template>

<script>
  // import TopicComponent from './TopicComponent.vue';
  // import TopicComponentGroup from './TopicComponentGroup.vue'

  export default {
    // mixins: [TopicComponent],
    computed: {
      calloutClass() {
        if (this.$props.options) {
          if (this.$props.options.class) {
            return this.$props.options.class;
          } else {
            return 'columns small-24';
          }
        }
      },
      message() {
        if (this.$props.slots) {
          return this.evaluateSlot(this.$props.slots.text) || '';
        } else {
          return '';
        }
      },
      components() {
        if (this.$props.options) {
          return this.$props.options.components || null;
        } else {
          return null;
        }
      },
    },
    methods: {
      evaluateSlot(valOrGetter, transforms = [], nullValue = '') {
        // console.log('evaluateSlot is running, valOrGetter:', valOrGetter);
        // check for null val/getter
        if (!valOrGetter) {
          return valOrGetter;
        }

        const valOrGetterType = typeof valOrGetter;
        let val;

        // fn
        if (valOrGetterType === 'function') {
          const state = this.$store.state;
          const controller = this.$controller;
          const getter = valOrGetter;
          const item = this.item;

          if (item) {
            val = getter(state, item, controller);
          } else {
            // console.log('evaluateSlot, about to get value');
            val = getter(state);
            // console.log('state:', state, 'val:', val);
          }
        } else {
          val = valOrGetter;
        }

        // format nulls but not falses
        if (val === false) {

        } else if (!val) {
          return nullValue;
        }

        // apply transforms
        for (let transformKey of transforms) {
          // get transform definition from config by name
          const transform = this.$config.transforms[transformKey];
          // make object of (relevant) globals by filtering window object
          let globals;
          const globalKeys = transform.globals;
          if (globalKeys) {
            globals = Object.keys(window)
                          .filter(key => globalKeys.includes(key))
                          .reduce((obj, key) => {
                              obj[key] = window[key];
                              return obj;
                          }, {});
          }
          // run transform
          const fn = transform.transform;
          val = fn(val, globals);
        }

        return val;
      }
    }
  };
</script>

<style scoped>

.wrapper {

}

.callout {
  margin-top: 1rem;
  position: inherit;
  height: auto;
}

</style>
