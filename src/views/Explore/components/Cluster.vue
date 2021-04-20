<script>
import {select} from 'd3'
import { v4 as uuidv4 } from 'uuid';
export default {
  props: {
    selector: {
      type: String,
      required: true
    },
    shape: {
      type: String,
      required: true,
      validator: value => ['ellipse'].includes(value)
    },
    attributes: {
      type: Object,
      default: () => ({})
    },
    styles: {
      type: Object,
      default: () => ({})
    },   
  },
  render() {
    return null
  },
  methods: {
    drawCluster() {
      this.clusterId = this.attributes.id ? this.attributes.id : uuidv4()
      let g = select(this.selector).append(this.shape)
      for (const [attr, value] of Object.entries(this.attributes)) {
        g = g.attr(attr, value)
      }
      for (const [prop, value] of Object.entries(this.styles)) {
        g = g.style(prop, value)
      }

      g = g.attr('id', this.clusterId)
      this.g = g
    },
    removeCluster() {
      this.g.remove()
    }
  },
  beforeUnmount() {
    this.removeCluster()
  },
  mounted() {
    this.drawCluster()
  }
}
</script>