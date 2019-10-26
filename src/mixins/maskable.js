import Mask from '../includes/mask'
import Masker from '../includes/masker'

export default {
  props: {
    mask: {
      type: [String, Array]
    },
    eagerMask: {
      type: Boolean,
      default: false
    }
  },
  beforeCreate: function() {
    this.$ckd = Object.assign({}, this.$ckd, { mask: new Masker() })
  },
  methods: {
    applyMask: function(event) {
      let masks = [this.mask].flat()
      for (let i=0; i<masks.length; i++) {
        let mask = new Mask(event, masks[i], this.eagerMask)
        if (mask.run()) break
      }
    }
  }
}
