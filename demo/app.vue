<template>
  <div id="app">
    <div class="segment">
      <label>Default Text Input</label>
      <p>Default input look with no modified props/styles</p>
      <v-text />
    </div>
    <div class="segment">
      <label>Default Text Input With Label</label>
      <p>Example featuring a simple input label</p>
      <v-text label="Enter Your Name" />
    </div>
    <div class="segment">
      <label>Text Input With Label & Placeholder</label>
      <p>Example featuring an input label and placeholder text</p>
      <v-text label="Enter Your Name" placeholder="John Smith" />
    </div>
    <div class="segment">
      <label>Text Input With Right Positioned Icon</label>
      <p>Example featuring an icon on the right side of the input</p>
      <v-text label="Search" class="icon-right">
        <template>
          <button class="search-right">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve">
              <path fill="#dfdfdf" d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </button>
        </template>
      </v-text>
    </div>
    <div class="segment">
      <label>Password Input With Fixed Validation Rules</label>
      <p>Example featuring input validation and a conditional success icon</p>
      <v-text label="Password" type="password" class="validate-required validate-length validate-uppercase validate-number validate-special" validate-on="blur" :show-errors="false" data-length="8">
        <template v-slot="props">
          <div class="check-right" :class="{ passed: getPasswordStrength(props.validations) === 'excellent' }">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 26 26">
              <path fill="lightseagreen" d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/>
            </svg>
          </div>
          <div class="requirements">
            <p class="requirement" v-for="validation in getRequirements(props.validations)" :key="validation.name">
              <span class="status">
                <div class="flip" :class="{ flipped: validation.valid }">
                  <div class="flip-container">
                    <div class="front">
                      <img src="./assets/svgs/invalid.svg" class="icon" />
                    </div>
                    <div class="back">
                      <img src="./assets/svgs/valid.svg" class="icon" />
                    </div>
                  </div>
                </div>
              </span>
              <span class="message">{{validation.message}}</span>
            </p>
          </div>
        </template>
      </v-text>
    </div>
    <div class="segment">
      <label>Password Input With Strength Meter</label>
      <p>Example featuring a growing strength bar based on password complexity</p>
      <v-text label="Password" type="password" class="validate-required validate-length validate-uppercase validate-number validate-special metered" validate-on="blur" :show-errors="false" data-length="8">
        <template v-slot="props">
          <div class="check-right" :class="{ passed: props.isValid }">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 26 26">
              <path fill="lightseagreen" d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/>
            </svg>
          </div>
          <div class="strength" :class="getPasswordStrength(props.validations)"></div>
        </template>
      </v-text>
    </div>
    <div class="segment">
      <label>Text Input Variant</label>
      <p>Simple input style variant with validation on blur</p>
      <v-text label="First Name" class="cutout validate-length" validate-on="blur" data-length="8" />
    </div>
    <div class="segment">
      <label>Text Input Variant</label>
      <p>Simple input style variant with validation on blur</p>
      <v-text label="First Name" class="frame validate-length" validate-on="blur" data-length="8" />
    </div>
    <div class="segment">
      <label>Text Input Variant</label>
      <p>Simple style variant with left positioned icon</p>
      <v-text placeholder="Search" class="search">
        <template>
          <div class="search-left">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve">
              <path fill="#ffffff" d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </div>
        </template>
      </v-text>
    </div>
    <div class="segment">
      <label>Text Input Variant</label>
      <p>Simple input style variant with validation on blur</p>
      <v-text label="First Name" class="frame validate-length" validate-on="blur" data-length="8" :show-errors="false" v-model="text">
        <template v-slot="props">
          <transition name="fade-slide">
            <div v-if="props.errors.length" class="errors-box">
              <p v-for="error in props.errors" :key="error">{{error}}</p>
            </div>
          </transition>
        </template>
      </v-text>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import VText from '@/text.vue'

export default {
  name: 'app',
  components: { VText },
  methods: {
    getPasswordStrength: function(validations) {
      return ['weak', 'weak', 'medium', 'strong', 'excellent'][validations.valid().length - 1]
    },
    getRequirements: function(validations) {
      return validations.filter(v => ['validate-number', 'validate-special', 'validate-uppercase', 'validate-length'].includes(v.name))
    }
  },
  data: function(){
    return {
      input: '',
      text: 'hello'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 2rem;
  font-size: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem 2rem;
}

.segment label {
  display: block;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
}

.segment p {
  font-size: 13px;
  color: #777;
  margin: 0 0 15px;
  line-height: 1.4;
}

.segment code {
  background-color: #e5e5e5;
  line-height: 1.4;
  padding: 2px 4px;
  border-radius: 3px;
}

.v-text {
  width: 100%;
}

.search-right {
  position: absolute;
  top: 0;
  right: 0;
  padding: 9px;
  width: 35px;
  height: 100%;
  background: none;
  border: 0;
  cursor: pointer;
}

.icon-right /deep/ .input,
.icon-right /deep/ .label {
  padding-right: 35px;
}

.check-right {
  transition: top 250ms ease-out, opacity 150ms ease-out;
  position: absolute;
  top: -18px;
  right: 0;
  opacity: 0;
  box-sizing: border-box;
  padding: 8px;
  width: 35px;
  height: 100%;

  &.passed {
    top: 0;
    opacity: 1;
  }
}

.segment .requirements {
  margin-top: 5px;
}

.segment .requirements .requirement {
  margin-bottom: 0;
  display: flex;
}

.flip {
  background-color: transparent;
  width: 15px;
  height: 15px;
  perspective: 1000px;

  &.flipped .flip-container {
    transform: rotateY(180deg);
  }
}

.flip-container {
  transition: transform 300ms ease-out;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
}

.flip .front,
.flip .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip .back {
  transform: rotateY(180deg);
}

.requirement .status {
  margin-right: 4px;
}

.requirement .status .icon {
  width: 15px;
  height: 15px;
}

.metered /deep/ .underline {
  display: none;
}

.metered /deep/ .strength {
  transition: width 250ms ease-out, background-color 250ms ease-out, opacity 250ms ease-out;
  position: absolute;
  bottom: -1px;
  border-radius: 4px;
  left: 0;
  height: 2px;
  width: 0;
  opacity: 0;
  background-color: #f13838;

  &.weak {
    width: 25%;
    background-color: #f13838;
  }

  &.medium {
    width: 50%;
    background-color: #f1a61e;
  }

  &.strong {
    width: 75%;
    background-color: #c3d01e;
  }

  &.excellent {
    width: 100%;
    background-color: lightseagreen;
  }
}

.metered.is-focused /deep/ .strength {
  opacity: 1;
}

.cutout /deep/ .input ~ .label {
  left: 12px;
}

.cutout {
  /deep/ .input:focus ~ .label,
  &.has-input /deep/ .input ~ .label,
  &.has-placeholder /deep/ .input ~ .label {
    transform: scale(0.8);
    top: 6px;
  }

  &.is-focused /deep/ .input-wrapper {
    background-color: #ededed;
  }
}

.cutout /deep/ .input-wrapper {
  transition: background-color 300ms ease-out;
  background-color: #f7f7f7;
  border-radius: 4px;
}

.cutout /deep/ .input {
  border-bottom: 0;
  padding: 20px 12px 8px;
}

.cutout /deep/ .underline {
  display: none;
}

.frame {
  /deep/ .input ~ .label {
    left: 10px;
    display: inline-block;
    background-color: white;
    padding: 0 3px;
  }

  /deep/ .input:focus ~ .label,
  &.has-input /deep/ .input ~ .label,
  &.has-placeholder /deep/ .input ~ .label {
    transform: scale(0.9);
    top: -8px;
    left: 10px;
  }
}

.frame /deep/ .input {
  transition: border-color 250ms ease-out;
  border: 1px solid #c3c3c3;
  border-radius: 3px;
  padding: 8px 10px;
}

.frame /deep/ .underline {
  display: none;
}

.frame.has-error /deep/ .input {
  border-color: #d30000;
}

.frame /deep/ .errors-box {
  background-color: #d30000;
  border-radius: 3px;
  padding: 8px;
  display: inline-block;
  margin-top: 8px;
  position: relative;
  box-shadow: 0 2px 5px -2px rgba(0, 0, 0, 0.2), 0 -2px 5px -2px rgba(0, 0, 0, 0.2);

  &::after {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(211, 0, 0, 0);
    border-bottom-color: #d30000;
    border-width: 8px;
    margin-left: -8px;
  }
}

.frame /deep/ .errors-box p {
  color: #fff;
  margin: 0;
  white-space: nowrap;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 250ms ease-out, transform 250ms ease-out;
}

.search {
  transition: background-color 300ms ease-out;
  padding: 5px 8px;
  background-color: #234051;
  border-radius: 45px;

  &.is-focused {
    background-color: lighten(#234051, 5%);
  }
}

.search /deep/ .input {
  border-bottom: 0;
  padding-left: 35px;
  color: #fff;
}

.search /deep/ .underline {
  display: none;
}

.search-left {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 8px;
  width: 35px;
  height: 100%;
}
</style>
