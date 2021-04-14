<template>
  <g class="labeled-point" :transform="`translate(${x}, ${y})`">
    <!--<circle :r="r" :fill="fill"></circle>-->
    <text :fill="fill">{{ text }}</text>
  </g>
</template>

<script>
export default {
  name: 'LabeledPoint',
  props: {
    x: Number,
    y: Number,
    r: Number,
    fill: String,
    text: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.labeled-point text {
  opacity: 1;
  font-size: 14px;
  // pointer-events: none;
}
.labeled-point:hover text {
  opacity: 1;
}
circle {
  stroke: black;
  stroke-width: 1px;
  opacity: 0.5;
}
</style>
