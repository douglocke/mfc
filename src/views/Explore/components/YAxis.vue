<template>
  <g :class="`axis y-axis-${normalisedId}`" :transform="`translate(${xTranslate}, 0)`">
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
