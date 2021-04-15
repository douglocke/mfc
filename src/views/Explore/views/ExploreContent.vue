<template>
  <div>
    <!--This is Scatter Plot for Content-->
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
        :colorScale="colorScale"
        @click="$emit('onPresidentSelected', $event)"
        :colorByProperty="colorByProperty"
      />
      <!--h4 v-if="speciesFilter">Species: {{ speciesFilter }}</h4-->
      <!--:onClick="value => setQueryParam('species', value)"-->
    </div>
  </div>
</template>
<script>
import { scaleOrdinal, schemeCategory10, scaleQuantize, schemeSpectral, scaleThreshold, schemeRdBu } from 'd3'
import Scatterplot from '../components/Scatterplot'
import colorbrewer from 'colorbrewer'
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
  watch: {
    colorScale(color) {
      color.domain().forEach(value => {
        console.log('value', value)
      })
      console.log({color})
    }
  },
  computed: {
    colorScale() {
      const colorMap = {
        'Party': this.categoricalColorScale,
        'Bendat_Transition': this.categoricalColorScale,
        'Reach': this.reachColorScale
      }
      return colorMap[this.colorByProperty]
    },
    thresholdColorScale() {
      return scaleQuantize()
        .domain([ 25, 60, 100 ])
        .range(colorbrewer.Blues[9])
    },
    reachColorScale() {
      try {
        console.log('scheme rdbu', schemeRdBu)
        //return scaleThreshold([25, 100], schemeRdBu[9])
        return scaleThreshold().domain([25, 50, 75, 100]).range(['#F87171', '#F87171', '#60A5FA', '#2563EB', '#1E3A8A'])
      } catch (error) {
        console.error(error)
        return ''
      }
    },
    categoricalColorScale() {
      return scaleOrdinal(schemeCategory10).domain(this.colorDomain)
    },
    colorDomain() {
      return Array.from(
        new Set(this.presidentsData.map(d => d[this.colorByProperty]))
      )
    },
  },
  methods: {
    onMouseEnter(e, point) {
      this.$emit('onPresidentHover', point)
    },
  },
  mounted() {
    console.log('check', this.colorScale(5))
  }
}
</script>
<style module>
.activePresident {
  font-weight: bold;
  color: indigo;
}
</style>
