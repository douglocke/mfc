<template>
  <g :class="`axis x-axis-${normalisedId}`" :transform="`translate(0, ${yTranslate})`">
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
      return this.id.replaceAll(' ', '-')
    }
  },
  methods: {
    updateAxis() {
      select(`.x-axis-${this.normalisedId}`).call(axisBottom(this.xScale))
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
