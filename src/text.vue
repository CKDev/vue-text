<template>
  <div class="v-text" :class="{ 'has-error': errors.length, 'has-input': hasInput, 'has-placeholder': hasPlaceholder, 'is-focused': isFocused }">
    <div class="component-wrapper">
      <div class="input-wrapper">
        <input
          class="input"
          ref="input"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          v-bind="$attrs"
          v-on="listeners"
        />
        <div class="underline"></div>
        <label v-if="label" class="label">{{label}}</label>
      </div>
      <slot
        :errors="errors"
        :validations="validations"
        :isValid="validations.all().every(v => v.valid)"
      />
    </div>
    <transition-group v-if="showErrors" name="error" tag="div" class="errors"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave">
      <p v-for="error in errors" :key="error" class="error">{{error}}</p>
    </transition-group>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import VInput from '@ckd/vue-input'

import Maskable from './mixins/maskable'

export default {
  name: 'VText',
  extends: VInput,
  mixins: [Maskable],
  props: {
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    showErrors: {
      type: Boolean,
      default: true
    },
    validateOn: {
      type: String,
      default: 'submit',
      validator: function(value){
        return ['submit', 'blur'].indexOf(value) !== -1
      }
    }
  },
  created: function() {
    this.$ckd.validator.addRule(
      'validate-number',
      'Must contain at least 1 number.',
      function(value, data) {
        return /[0-9]/.test(value)
      }
    )
    this.$ckd.validator.addRule(
      'validate-uppercase',
      'Must contain at least 1 uppercase character.',
      function(value, data) {
        return /[A-Z]/.test(value)
      }
    )
    this.$ckd.validator.addRule(
      'validate-special',
      'Must contain at least 1 special character.',
      function(value, data) {
        return /[`~@#!\$%\^&*\(\)\\\/\[\]\{\}:;'"\?><\.,\|]/.test(value)
      }
    )
  },
  mounted: function() {
    this.verify(this.$refs.input.value)
  },
  methods: {
    updateInput: function(event) {
      this.hasInput = event.target.value.trim() != ''
      this.errors = []
    },
    enter: function(element) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      getComputedStyle(element).height

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter: function(element) {
      element.style.height = 'auto'
    },
    leave: function(element) {
      const height = getComputedStyle(element).height
      
      element.style.height = height

      getComputedStyle(element).height

      setTimeout(() => {
        element.style.height = 0
      })
    }
  },
  computed: {
    listeners: function() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.updateInput(event)
          this.verify(event.target.value)
          this.$emit('input', event.target.value)
        },
        focus: (event) => {
          this.isFocused = true
        },
        blur: (event) => {
          this.isFocused = false
          if(this.validateOn === 'blur'){
            this.validate(this.$refs.input.value)
          }
        },
        keydown: (event) => {
          if(this.mask) {
            this.applyMask(event)
          }
        }
      }
    }
  },
  data: function() {
    return {
      isFocused: false,
      hasInput: (this.value || this.$attrs.value || '').trim() != '',
      hasPlaceholder: this.placeholder.trim() != ''
    }
  }
}
</script>

<style lang="scss" scoped>
.v-text {
  display: inline-block;
  box-sizing: border-box;

  &.has-error .underline {
    background-color: #d30000;
  }

  .input:focus ~ .label,
  &.has-input .input ~ .label,
  &.has-placeholder .input ~ .label {
    transform: scale(0.9);
    top: -50%;
  }
}

.component-wrapper {
  position: relative;
  display: block;
}

.input-wrapper {
  position: relative;
}

.input {
  outline: none;
  padding: 5px 0;
  border: 0;
  border-bottom: 1px solid #c3c3c3;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  line-height: 1.45;

  &:focus ~ .underline {
    width: 100%;
    left: 0;
  }
}

.underline {
  transition: width 175ms ease-out, left 175ms ease-out, color 175ms ease-out;
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: lightseagreen;
}

.label {
  transition: top 250ms ease-out, transform 250ms ease-out;
  transform-origin: 0 50%;
  position: absolute;
  width: auto;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  pointer-events: none;
}

.error {
  font-size: 13px;
  margin: 3px 0 0;
  line-height: 1.45;
  color: #d30000;
}

.error-enter-active, .error-leave-active {
  transition: opacity 350ms ease-out, height 150ms ease-out;
  overflow: hidden;
}

.error-enter, .error-leave-to {
  opacity: 0;
  height: 0;
}
</style>