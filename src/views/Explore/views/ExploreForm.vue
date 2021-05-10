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
        xVar="Year"

        yVar="Flesch Kincaid Grade Level"
        keyVar="Cluster"
        :getFill="getFill"
        @mouseenter="onMouseEnter"
        :colorScale="colorScale"
        @click="$emit('onPresidentSelected', $event)"
        :colorByProperty="colorByProperty"
      >
        <template v-if="showClusters">
          <!--Cluster
            selector=".scatterplot"
            shape="ellipse"
            :attributes="{
              cx: 350,
              cy: 80,
              rx: 295,
              ry: 120,
            }"
            :styles="{
              fill: 'lightgreen',
              stroke: '#232323',
              opacity: 0.15,
              transform: 'rotate(5)',
            }"
            showTooltip
            tooltipLabel="Hello tooltip"
            :tooltipPosition="{x: 120, y: 80}"
          /-->

          <!-- 
            <Cluster>
            <template #default="{isHovering}">
              <TooltipText v-if="isHovering" />
            </template>
          </Cluster>
          <TooltipText label="Hello tooltip" :position="{x: 0, y:0}" x="0" y="25" /> -->
           <Cluster
            selector=".scatterplot"
            shape="rect"
            :attributes="{
              x: 40,
              y: 30,
              width: 380,
              height: 360,
            }"
            :styles="{
              fill: 'blue',
              stroke: '#232323',
              opacity: 0.07,
              transform: 'rotate(5)',
            }"
            showTooltip
            tooltipLabel="The Early Republic; More Complex Speeches"
            :tooltipPosition="{x: 65, y: 35}"
          />
 <Cluster
            selector=".scatterplot"
            shape="rect"
            :attributes="{
              x: 380,
              y: 200,
              width: 305,
              height: 300,
            }"
            :styles="{
              fill: 'red',
              stroke: '#232323',
              opacity: 0.07,
              transform: 'rotate(5)',
            }"
            showTooltip
            tooltipLabel="The Civil War to the Great Depression"
            :tooltipPosition="{x: 390, y: 200}"
          />

           <Cluster
            selector=".scatterplot"
            shape="rect"
            :attributes="{
              x: 670,
              y: 400,
              width: 495,
              height: 240,
            }"
            :styles="{
              fill: 'green',
              stroke: '#232323',
              opacity: 0.07,
              transform: 'rotate(5)',
            }"
            showTooltip
            tooltipLabel="Speechwriter and Mass Communications Era"
            :tooltipPosition="{x: 740, y: 410}"
          />
        </template>
      </Scatterplot>
      <!--h4 v-if="speciesFilter">Species: {{ speciesFilter }}</h4-->
      <!--:onClick="value => setQueryParam('species', value)"-->
    </div>
  </div>
</template>
<script>
import {
  scaleOrdinal,
  schemeCategory10,
  scaleQuantize,
  scaleLinear,
  schemeAccent,
  scaleThreshold,
  schemeRdBu,
} from 'd3'
import Scatterplot from '../components/Scatterplot'
import Cluster from '../components/Cluster'
import colorbrewer from 'colorbrewer'
export default {
  name: 'ExploreForm',
  components: {
    Scatterplot,
    Cluster,
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
      default: false,
    },
  },
  computed: {
    colorScale() {
      const colorMap = {
        Top_Speech: this.topspeechColorScale,
        Cluster: this.clusterColorScale,
        Party: this.partyColorScale,
        Bendat_Transition: this.bendatColorScale,
        Reach: this.reachColorScale,
      }

      console.log('in color scale computed', this.colorByProperty, colorMap)
      return colorMap[this.colorByProperty]()
    },
    colorDomain() {
      return Array.from(
        new Set(
          this.presidentsData.map(d => {
            return d[this.colorByProperty] || 'None'
          })
        )
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
        return '#3b82f6'
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
    topspeechColorScale() {
      return scaleOrdinal().domain(['Yes', 'No']).range(['#F87171', '#6B7280'])
    },
    bendatColorScale() {
      return scaleOrdinal().domain(['Yes', 'No']).range(['#34d399', '#6B7280'])
    },
    partyColorScale() {
      return scaleOrdinal()
        .domain(this.colorDomain)
        .range(['#1E40AF', '#D97706', '#34D399', '#60A5FA', '#A78BFA', '#F87171'])
    },
    clusterColorScale() {
      return scaleOrdinal()
        .domain(['1', '2', '3', '4'])
        .range(['#F0C808', '#52AA5E', '#1E3A8A', '#F87171'])
    },
    reachColorScale() {
      try {
        //return scaleThreshold([25, 100], schemeRdBu[9])
        return scaleThreshold()
          .domain([25, 50, 75, 100])
          .range(['#F87171', '#F87171', '#60A5FA', '#2563EB', '#1E3A8A'])
      } catch (error) {
        console.error(error)
        return ''
      }
    },
  },
  mounted() {},
}
</script>
<style module>
.activePresident {
  font-weight: bold;
  color: indigo;
}
</style>
