<template>
  <g :class="`axis x-axis-${normalisedId}`" :transform="`translate(0, ${yTranslate})`">
  </g>
  <g :class="`axis x-axis-${normalisedId}Label`" :transform="`translate(0, ${yTranslate})`">
  </g>
</template>

<script>
import { select, axisBottom } from 'd3'

export default {
  name: 'XAxis',
  props: {
    xScale: Function,
    yTranslate: Number,
    id: String,
  },
  computed: {
    normalisedId() {
      //some names had spaces that were getting parsed, replace with hyphen
      return this.id.replaceAll(' ', '-')
    }
  },
  methods: {
    updateAxis() {
      select(`.x-axis-${this.normalisedId}`).call(axisBottom(this.xScale))
      select(`.x-axis-${this.normalisedId}Label`).append("text")
        //.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .attr("transform", "translate(500,40)")
        .style("text-anchor", "middle")
        .style("color", "red")
        .style("font-size", "12px")
        .text(this.id.substring(0, this.id.indexOf("-")));
//str.substring(0, str.indexOf(":"))
        //string.split(":").pop()
/*    // Add the text label for the x axis
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Date");*/



    }
  },
  updated() {
    this.updateAxis()
  },
  mounted() {
    this.updateAxis()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
