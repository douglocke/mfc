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
        xVar="x"
        yVar="y"
        keyVar="Cluster"
        :getFill="getFill"
        @mouseenter="onMouseEnter"
        :colorScale="colorScale"
        @click="$emit('onPresidentSelected', $event)"
        :colorByProperty="colorByProperty"
        hideXAxis
        hideYAxis
        :showClusters="showClusters"
        :selectedPresidentId="selectedPresidentDetails?.Id"
      >
       <template v-if="showClusters">
          <Cluster
            selector=".scatterplot"
            shape="ellipse"
            :attributes="{
              cx: 350,
              cy: 130,
              rx: 275,
              ry: 140,
            }"
            :styles="{
              fill: 'lightgreen',
              //stroke: '#232323',
              opacity: 0.15,
              'pointer-events': 'none',
              transform: 'rotate(5)',
            }"
          />
          <Cluster
            selector=".scatterplot"
            shape="ellipse"
            :attributes="{
              cx: 300,
              cy: 440,
              rx: 360,
              ry: 150,
            }"
            :styles="{
              fill: 'red',
              //stroke: '#232323',
              opacity: 0.15,
              'pointer-events': 'none',
              transform: 'rotate(5)',
            }"
          />
 <Cluster
            selector=".scatterplot"
            shape="ellipse"
            :attributes="{
              cx: 580,
              cy: 320,
              rx: 300,
              ry: 200,
            }"
            :styles="{
              fill: 'blue',
              //stroke: '#232323',
              opacity: 0.15,
              'pointer-events': 'none',
              transform: 'rotate(5)',
            }"
          />

        </template>
      </Scatterplot>
      <!--h4 v-if="speciesFilter">Species: {{ speciesFilter }}</h4-->
      <!--:onClick="value => setQueryParam('species', value)"-->
    </div>
  </div>
</template>
<script>
import { scaleOrdinal, schemeCategory10, scaleQuantize, scaleLinear, schemeAccent, scaleThreshold, schemeRdBu } from 'd3'
import Cluster from '../components/Cluster'

import Scatterplot from '../components/Scatterplot'
import Overlay from '../components/Overlay'
import colorbrewer from 'colorbrewer'
export default {
  name: 'ExploreContent',
  components: {
    Scatterplot,
    Cluster
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
      default: 'Top_Speech',
    },
    showClusters: {
      type: Boolean,
       default: false
    }
  },
  computed: {
    colorScale() {
      const colorMap = {
        'Top_Speech': this.topspeechColorScale,
        'Cluster': this.clusterColorScale,
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
    getFill(point, keyVar) {
      const propMap = {
        Top_Speech: 'Top_Speech',
        Reach: 'ReachNum',
        Cluster: 'Cluster',
        Party: 'Party'
      }

      if (point.Id === this.selectedPresidentDetails?.Id) {
        return '#0073B4'
        //3b82f6
      }

      if (this.colorByProperty in propMap) {
        return this.colorScale(point[propMap[this.colorByProperty]])
      } 


      if (this.colorByProperty === 'Bendat_Transition') {
        return this.colorScale(point.Bendat_Transition ? 'Yes' : 'No')
      }

      return this.colorScale(point[keyVar])
    },
    onMouseEnter(e, point) {
      this.$emit('onPresidentHover', point)
    },
    bendatColorScale() {
      return scaleOrdinal().domain(['Yes', 'No']).range(['#34d399', '#6B7280'])
    },
    topspeechColorScale() {
      return scaleOrdinal().domain(['Yes', 'No']).range(['#F87171', '#6B7280'])
    },
    partyColorScale() {
      return scaleOrdinal().domain(this.colorDomain).range(['#1E40AF', '#D97706', '#34D399', '#60A5FA', '#A78BFA', '#F87171'])
    },
     clusterColorScale() {
      return scaleOrdinal().domain(['1','2','3','4']).range(['#F0C808', '#52AA5E', '#1E3A8A', '#F87171'])
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
