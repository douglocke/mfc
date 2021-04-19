<template>
  <g :class="Overlay" :transform="`translate(0, 0)`"> </g>
</template>

<script>
import { select } from 'd3'

export default {
  name: 'Overlay',
  props: {
    //xScale: Function,
    //yTranslate: Number,
    //id: String,
  },
  computed: {
    //normalisedId() {
    //some names had spaces that were getting parsed, replace with hyphen
    // return this.id.replaceAll(' ', '-')
    //}
  },
  methods: {
    drawShapes() {
      select(`.scatterplot`)
        .append('text')
        //.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .attr('transform', 'translate(500,40)')
        .style('text-anchor', 'middle')
        .style('color', 'red')
        .style('font-size', '52px')
        .text('Testing 1....2.33.')
      //str.substring(0, str.indexOf(":"))
      //string.split(":").pop()
      /*    // Add the text label for the x axis
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Date");*/
    },
  },
  updated() {
    this.drawShapes()
  },
  mounted() {
    console.log("Call Overlay");
    this.drawShapes()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
