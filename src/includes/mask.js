export default class {
  #input
  #event
  #eager
  #format
  #definitions

  constructor(event, format, eager) {
    this.#input = event.target
    this.#event = event
    this.#eager = eager
    this.#format = format
    this.#definitions = {
      '#': /[0-9]/,
      'A': /[a-zA-Z]/,
      '*': /[a-zA-Z0-9]/
    }
  }

  run() {
    if (!['keydown', 'input'].includes(this.#event.type)) {
      console.warn(`Masking input text can only be triggered by keydown and input events. You provided: ${this.#event.type}`)
      return false
    }

    if (this.#event.type == 'input' && this.#event.inputType === 'insertFromPaste') {
      this.format()
      return false
    }

    if ((this.#event.key.length > 1 || this.#event.ctrlKey) && this.#event.key != 'Backspace') {
      return false
    }

    this.#event.preventDefault()

    if (this.#event.key == 'Backspace') {

      let positionStart = this.getCursorPosition('start')
      let positionEnd = this.getCursorPosition('end')

      // If at the beginning of the string, don't do anything
      if (positionStart < 0) return

      // If the end of our selection is the same as the start,
      // increase it by one so we're at least deleting one character
      if (positionStart == positionEnd) {
        positionStart == 0 ? positionEnd++ : positionStart--
      }

      // Get each character in the input
      const input = this.#input.value.split('')

      // Remove the selection
      input.splice(positionStart, positionEnd - positionStart)

      // If the new length of our string is greater than what the mask allows for, the input is disallowed
      if (input.length > this.#format.replace(/\\?\?/, '').length && this.#format[this.#format.length - 1] !== '<') return false

      // Set the newly formatted input value
      this.#input.value = this.getFormattedInput(input.join(''))

      // Re-place the cursor
      this.setCursorPosition(positionStart)
    } else {
      // Get the current cursor position
      let position = this.getCursorPosition()

      // Get the current input characters
      const input = this.#input.value.split('')

      // Insert the new character
      input.splice(position, this.getCursorPosition('end') - position, this.#event.key)

      // If the new length of our string is greater than what the mask allows for, the input is disallowed
      if (input.length > this.#format.replace(/\\?\?/, '').length && this.#format[this.#format.length - 1] !== '<') return false

      // Set the newly formatted input value
      this.#input.value = this.getFormattedInput(input.join(''), this.#eager)

      // Ensure that we're moving past a non-mask character to start
      if (!this.isMaskAt(position)) position++

      // Move the cursor forward past any non-masked characters
      while (!this.isMaskAt(position, true) && position <= this.#input.value.length) {
        position += (!this.isMaskAt(position - 1, true) ? 2 : 1)
      }

      // Set the new cursor position
      this.setCursorPosition(position + 1)
    }

    return true
  }

  addDefinition(char, regex) {
    if (typeof this.#definitions[char] == 'object'){
      console.error(`The definition for character ${char} is already defined.`)
      return this
    }
    this.#definitions[char] = regex
    return this
  }

  format() {
    this.#input.value = this.getFormattedInput(this.#input.value)
  }

  getMaskRegex() {
    let output = this.#format
    Object.keys(this.#definitions).forEach((key) => {
      output = output.replace(new RegExp(`\\${key}`, 'g'), `${this.#definitions[key].source}?`)
    })
    console.log(output)
    return output
  }

  getFormattedInput(input, trailing) {
    let output = ''
    let match = null

    for (var i = 0; i < this.#format.length; i++) {
      if (!this.hasInputChars(i, input) && !trailing) break
      if (this.isMaskAt(i)) {
        if ((match = input.match(this.getMaskFormat(this.#format[i]))) !== null) {
          output += match[0]
          input = input.substring(input.indexOf(match[0]) + 1)
        } else {
          break
        }
      } else {
        if (this.#format[i] === '<') {
          //console.log(i, this.#format[i], input)
          //output += input
          continue
        }
        if (this.#format[i] !== '?') {
          if (input.length > 0 || (trailing && !this.isOptionalAt(i))) {
            if (this.#format[i] !== '\\' || this.#format[i - 1] === '\\') output += this.#format[i]
          }
        }
      }
    }

    console.log(input, this.#format, this.#format.charAt(this.#format.length - 1))
    if(input.length && this.#format.charAt(this.#format.length - 1) === '<'){
      output += input
    }

    return output
  }

  setCursorPosition(position) {
    this.#input.setSelectionRange(position, position)
    return this
  }

  getCursorPosition(side) {
    if (side == 'end') {
      return this.#input.selectionEnd
    }
    return this.#input.selectionStart
  }

  hasInputChars(position, input) {
    var match
    for (var i = position; i < this.#format.length; i++) {
      if(this.#format[i] === '<'){
        return true
      }

      if (!this.isMaskAt(i)){
        continue
      }

      if ((match = input.match(this.getMaskFormat(this.#format[i]))) !== null){
        return true
      } else {
        return false
      }
    }
  }

  getMaskChars() {
    return Object.keys(this.#definitions)
  }

  isMaskAt(position, include_escape) {
    if(this.#format[position] === '<'){
      return false
    }
    return this.getMaskChars().indexOf(this.#format[position]) > -1 && (!include_escape && this.#format[position - 1] !== '\\')
  }

  isOptionalAt(position) {
    var optional = this.#format.indexOf('?')
    return optional > -1 && optional <= position && this.#format[optional - 1] !== '\\'
  }

  getMaskFormat(mask) {
    return this.#definitions[mask] || /./
  }

  isFormatMatch(mask, char) {
    return this.getMaskFormat(mask).test(char)
  }
}