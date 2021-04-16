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
    <!-- xVar="Flesch Reading Ease"
        yVar="CP_Public_Persuasion"-->
    <div>
      <Scatterplot
        :points="presidentsData"
        xVar="Flesch Reading Ease"
        yVar="CP_Public_Persuasion"
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
import { scaleOrdinal, schemeCategory10, scaleQuantize, scaleLinear, schemeAccent, scaleThreshold, schemeRdBu } from 'd3'
import Scatterplot from '../components/Scatterplot'
import colorbrewer from 'colorbrewer'
export default {
  name: 'ExploreForm',
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
      const colorMap = {
        'Party': this.partyColorScale,
        'Bendat_Transition': this.bendatColorScale,
        'Reach': this.reachColorScale
      }

      console.log('in color scale computed', this.colorByProperty, colorMap)
      return colorMap[this.colorByProperty]()
    },       
    colorDomain() {
      return Array.from(
        new Set(this.presidentsData.map(d => {
          return d[this.colorByProperty] || 'None'
        }))
      )
    },
  },
  methods: {
    onMouseEnter(e, point) {
      this.$emit('onPresidentHover', point)
    },
    bendatColorScale() {
      return scaleOrdinal().domain(['No', 'Yes']).range(['#34d399', '#f59e0b'])
    },
    partyColorScale() {
      return scaleOrdinal().domain(this.colorDomain).range(['#F87171', '#34d399', '#60A5FA', '#2563EB', '#1E3A8A', '#f59e0b'])
    },
    reachColorScale() {
      try {
        //return scaleThreshold([25, 100], schemeRdBu[9])
        return scaleThreshold().domain([25, 50, 75, 100]).range(['#F87171', '#F87171', '#60A5FA', '#2563EB', '#1E3A8A'])
      } catch (error) {
        console.error(error)
        return ''
      }
    },
  },
  mounted() {
  }
}
</script>
<style module>
.activePresident {
  font-weight: bold;
  color: indigo;
}
</style>
