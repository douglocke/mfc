<template>
  <svg :height="height" :width="width" class="scatterplot">
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
        :fill="getFill(point[keyVar])"
        @click="$emit('click', point)"
        @mouseenter="$emit('mouseenter', $event, point)"
      ></LabeledPoint>
    </g>
    <XAxis :xScale="xScale" :yTranslate="height - margin" :id="id" />
    <YAxis :yScale="yScale" :xTranslate="margin" :id="id" />
  </svg>
</template>

<script>
import { max, scaleLinear } from 'd3'
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
  },
  computed: {
    id() {
      return `${this.xVar}-${this.yVar}`
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
}
</script>

<style scoped>
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
