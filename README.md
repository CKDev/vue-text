# CKD Vue Text

## Installation
```
yarn add @ckd/vue-text@latest
```

## Demo

A simple demo of several component implementations can be found in the packages /demo directory. It can be run using `yarn serve`

## Usage

Register the component for use in a Vue application

```
import Text from '@ckd/vue-text'

// Import vue-button stylesheet
import '@ckd/vue-text/dist/@ckd/vue-text.css'

Vue.component('v-text', Text)
```

or, use UMD:

```
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@ckd/vue-text"></script>

<link rel="stylesheet" href="https://unpkg.com/@ckd/vue-text@latest/dist/@ckd/vue-text.css">

<script>
new Vue({
  components: {
    VText: window['@ckd/vue-text']
  }
}).$mount('#app')
</script>
```

Then, use the component in your markup
```
<v-text placeholder="Hello World" label="Write Something" />
```

## Options

TODO

## Tests

TODO