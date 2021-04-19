<template>
  <g :class="`axis y-axis-${normalisedId}`" :transform="`translate(${xTranslate}, 0)`">
  </g>
    <g :class="`axis y-axis-${normalisedId}Label`" :transform="`translate(${xTranslate}, 0)`">
  </g>
</template>

<script>
import { select, axisLeft } from 'd3'

export default {
  name: 'YAxis',
  props: {
    yScale: Function,
    xTranslate: Number,
    id: String,
  },
 computed: {
    normalisedId() {
      return this.id.replaceAll(' ', '-')
    }
  },
  methods: {
    updateAxis() {
      select(`.y-axis-${this.normalisedId}`).call(axisLeft(this.yScale))
      select(`.y-axis-${this.normalisedId}Label`).append("text")
        //.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .attr("transform", "translate(-100,300)")
        .style("text-anchor", "middle")
        .style("color", "red")
        .style("font-size", "12px")
        .text(this.id.split("-").pop());
    },
  },
  updated() {
    this.updateAxis()
  },
  mounted() {
    this.updateAxis()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
