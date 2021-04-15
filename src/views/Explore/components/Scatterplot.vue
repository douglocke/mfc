<template>
  <svg ref="scatterplot" :height="height" :width="width" class="scatterplot">
    <text :y="margin / 2" :x="width / 2" class="center-align">
      <!--{{ xVar }} vs {{ yVar }}-->
    </text>
    <g class="points">
      <LabeledPoint
        :key="point.key"
        v-for="point in points"
        :x="xScale(point[xVar])"
        :y="yScale(point[yVar])"
        :text="point.Name"
        :r="5"
        :fill="getFillColor(point)"
        @click="$emit('click', point)"
        @mouseenter="$emit('mouseenter', $event, point)"
      ></LabeledPoint>
    </g>
    <g class="legend-container">
      <text class="legend-label" x="5" y="0">Legend</text>
    </g>
    <XAxis :xScale="xScale" :yTranslate="height - margin" :id="id" />
    <YAxis :yScale="yScale" :xTranslate="margin" :id="id" />
  </svg>
</template>

<script>
import { max, scaleLinear, select, scaleBand } from 'd3'
import LabeledPoint from './LabeledPoint.vue'
import XAxis from './XAxis.vue'
import YAxis from './YAxis.vue'

export default {
  name: 'Scatterplot',
  components: {
    LabeledPoint,
    XAxis,
    YAxis,
  },
  data() {
    return {
      margin: 30,
      width: 900,
      height: 600,
    }
  },
  props: {
    points: Array,
    keyVar: String,
    xVar: String,
    yVar: String,
    getFill: Function,
    colorScale: {},
    colorByProperty: String,
  },
  computed: {
    id() {
      return `${this.xVar}-${this.yVar}`
    },
    colorLegend() {
      return legendColor().scale(this.colorScale).shape('circle')
    },
    xScale() {
      return (
        scaleLinear()
          .domain([-2, max(this.points, d => +d[this.xVar] + 0.5)])
          // .domain([-2, 7])
          .range([this.margin, this.width - this.margin])
      )
    },
    yScale() {
      return (
        scaleLinear()
          .domain([-2, max(this.points, d => +d[this.yVar])])
          //.domain([-2, 3])
          .range([this.height - this.margin, this.margin])
      )
    },
  },
  methods: {
    getFillColor(point) {
      if (this.colorByProperty === 'Reach') {
        return this.getFill(point.ReachNum)
      }
      return this.getFill(point[this.keyVar])
    },
    addLegend({
      color,
      title,
      tickSize = 6,
      width = 320,
      height = 44 + tickSize,
      marginTop = 18,
      marginRight = 0,
      marginBottom = 16 + tickSize,
      marginLeft = 0,
      ticks = width / 64,
      tickFormat,
      tickValues,
    }) {
      const x = scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight])
      console.log('refs', this.$refs)
      select('.scatterplot')
        .append('g')
        .attr('class', 'legend-element')
        .selectAll('rect')
        .data(color.domain())
        .join('rect')
        .attr('x', x)
        .attr('y', marginTop)
        .attr('width', Math.max(0, x.bandwidth() - 1))
        .attr('height', height - marginTop - marginBottom)
        .attr('fill', color)
    },
    updateLegend({
      color,
      title,
      tickSize = 6,
      width = 320,
      height = 44 + tickSize,
      marginTop = 18,
      marginRight = 0,
      marginBottom = 16 + tickSize,
      marginLeft = 0,
      ticks = width / 64,
      tickFormat,
      tickValues,
    }) {
      const x = scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight])
      console.log('refs', this.$refs)
      select('.scatterplot')       
        .selectAll('rect')
        .data(color.domain())
        .join('rect')       
        .attr('fill', color)
    },
  },
  updated() {
    this.updateLegend({
        color: this.colorScale,
        title: 'Presidents legend',
      })
  },
  mounted() {
    console.log('color scale', this.colorScale, this.colorScale.domain())
    setTimeout(() => {
      this.addLegend({
        color: this.colorScale,
        title: 'Presidents legend',
      })
    }, 100)
  },
}
</script>

<style scoped>
.legend-container {
  transform: translate(800px, 40px);
}
text {
  cursor: pointer;
}
.scatterplot {
  justify-self: center;
}

.center-align {
  text-anchor: middle;
}
</style>
