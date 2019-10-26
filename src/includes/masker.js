export default class {
  #definitions

  constructor() {
    this.#definitions = {
      '#': /[0-9]/,
      'A': /[a-zA-Z]/,
      '*': /[a-zA-Z0-9]/
    }
  }
}