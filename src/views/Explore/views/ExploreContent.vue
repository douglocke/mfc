<template>
  <div>
    This is Scatter Plot for Content
    <!--button @click.prevent="$emit('onHoverPresident')">Click me </button-->

    <!--<div v-for="(item, index) of presidentsData" :key="index">
      <div
        @click="$emit('onPresidentSelected', item)"
        @mouseenter="$emit('onPresidentHover', item)"
        :class="
          selectedPresidentDetails.Id === item.Id && $style.activePresident
        "
      >
        {{ item.Name }} - {{ item.Year }}
      </div>

    </div>-->
    <!--this is a div temporary, it could have been button, scatterplot goes here-->
    <div>
      <Scatterplot
        :points="presidentsData"
        xVar="x"
        yVar="y"
        keyVar="Party"
        :getFill="colorScale"
        @mouseenter="onMouseEnter"
        @click="$emit('onPresidentSelected', $event)"
      />
      <!--h4 v-if="speciesFilter">Species: {{ speciesFilter }}</h4-->
      <!--:onClick="value => setQueryParam('species', value)"-->
    </div>
  </div>
</template>
<script>
import { scaleOrdinal, schemeCategory10 } from 'd3'
import Scatterplot from '../components/Scatterplot'
export default {
  components: {
    Scatterplot,
  },
  props: {
    presidentsData: {
      type: Array,
      required: true,
    },
    selectedPresidentDetails: {
      type: Object,
      default: () => ({}),
    },
    colorByProperty: {
      type: String,
      default: 'Party',
    },
  },
  computed: {
    colorScale() {
      return scaleOrdinal(schemeCategory10).domain(this.colorDomain)
    },
    colorDomain() {
      return Array.from(new Set(this.presidentsData.map(d => d[this.colorByProperty])))
    },
  },
  methods: {
    onMouseEnter(e, point) {
      console.log('on mouse enter', e, point)
      this.$emit('onPresidentHover', point)
    },
  },
}
</script>
<style module>
.activePresident {
  font-weight: bold;
  color: indigo;
}
</style>
