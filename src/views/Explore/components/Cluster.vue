<script>
import { select } from 'd3'
import { v4 as uuidv4 } from 'uuid' //uuid generator
export default {
  props: {
    selector: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
      validator: value => ['ellipse', 'rectangle'].includes(value),
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    tooltipLabel: {
      type: String,
    },
    showTooltip: {
      type: Boolean,
      default: false,
    },
    tooltipPosition: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
    return null
  },
  methods: {
    drawCluster() {
      this.clusterId = this.attributes.id ? this.attributes.id : uuidv4()
      let cluster = select(this.selector).append(this.shape).lower()
      for (const [attr, value] of Object.entries(this.attributes)) {
        cluster = cluster.attr(attr, value)
      }
      for (const [prop, value] of Object.entries(this.styles)) {
        cluster = cluster.style(prop, value)
      }

      cluster = cluster.attr('id', this.clusterId)
      if (this.showTooltip) {
        console.log('add events')
        cluster = cluster
          .on('mouseenter', () => {
            console.log('in mouse enter')
            this.drawTooltip()
          })
          .on('mouseleave', this.removeTooltip)
      }

      this.cluster = cluster
    },
    removeCluster() {
      if (this.cluster) {
        this.cluster.remove()
      }
    },
    drawTooltip() {
      const { x, y } = this.tooltipPosition
      const tooltip = select(this.selector).append('g')
      tooltip.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('color', 'red')
        .attr('font-weight',900)
        .attr('font-size',19)
        .attr('font-family', 'EB Garamond')
        .text(this.tooltipLabel)

      this.tooltip = tooltip
    },
    removeTooltip() {
      this.tooltip?.remove()
    },
  },
  beforeUnmount() {
    this.removeCluster()
    this.removeTooltip()
  },
  mounted() {
    this.drawCluster()
  },
}
</script>
