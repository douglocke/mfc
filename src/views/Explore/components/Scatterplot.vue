<template>
  <svg ref="scatterplot" :height="height" :width="width" class="scatterplot">
    <slot />

    <text :y="margin / 2" :x="width / 2" class="center-align">
      <!--{{ xVar }} vs {{ yVar }}-->
    </text>
    <!-- <Overlay /> -->

    <g class="points">
      <LabeledPoint
        :key="point.key"
        v-for="point in points"
        :x="xScale(point[xVar])"
        :y="yScale(point[yVar])"
        :text="point.Name"
        :r="5"
        :fill="getFillColor(point)"
        @click="$emit('click', point)"
        :font-style="point.Boller_Top === 1 ? 'italic' : 'normal'"
        :font-weight="point.Id === selectedPresidentId || point.Boller_Top === 1 ? 'bold' : 'normal'"
        @mouseenter="$emit('mouseenter', $event, point)"
      ></LabeledPoint>
    </g>
    <XAxis
      v-if="!hideXAxis"
      :xScale="xScale"
      :yTranslate="height - margin"
      :id="id"
    />
    <YAxis v-if="!hideYAxis" :yScale="yScale" :xTranslate="margin" :id="id" />
  </svg>
</template>

<script>
import { min, max, scaleLinear, select, scaleBand, legend, swatches } from 'd3'
import LabeledPoint from './LabeledPoint.vue'
import XAxis from './XAxis.vue'
import YAxis from './YAxis.vue'

export default {
  name: 'Scatterplot',
  components: {
    LabeledPoint,
    XAxis,
    YAxis,
  },
  data() {
    return {
      margin: 45,
      width: 1100,
      height: 670,
    }
  },
  props: {
    points: Array,
    keyVar: String,
    xVar: String,
    yVar: String,
    getFill: Function,
    colorScale: {},
    colorByProperty: String,
    hideXAxis: {
      type: Boolean,
      default: false,
    },
    hideYAxis: {
      type: Boolean,
      default: false,
    },
    selectedPresidentId: {
      type: String,
      default: ''
    }
  },
 
  computed: {
    //derived from state, or prop from parent. re-rendered when thing change
    id() {
      return `${this.xVar}-${this.yVar}`
    },
    xScale() {
      //console.log('xScale domain', [min(this.points, d => +d[this.xVar]), max(this.points, d => +d[this.xVar] + 0.5)], 'range', [this.margin, this.width - this.margin])
      return (
        scaleLinear()
          //.domain([-2, max(this.points, d => +d[this.xVar] + 0.5)])
          .domain([
            min(this.points, d => +d[this.xVar]),
            max(this.points, d => +d[this.xVar] + 0.5),
          ])

          // .domain([-2, 7])
          .range([this.margin, this.width - this.margin])
      )
    },
    yScale() {
      //console.log('yScale domain', [-2, max(this.points, d => +d[this.yVar])], 'range', [this.height - this.margin, this.margin])
      return (
        scaleLinear()
          .domain([min(this.points, d => +d[this.yVar]), max(this.points, d => +d[this.yVar])])
          //.domain([-2, max(this.points, d => +d[this.yVar])])
          //.domain([-2, 3])
          .range([this.height - this.margin, this.margin])
      )
    },
  },
  methods: {
    getFillColor(point) {
      /*if (this.colorByProperty === 'Top_Speech') {
        return this.getFill(point.Top_Speech)
      }

      if (this.colorByProperty === 'Reach') {
        return this.getFill(point.ReachNum)
      }

      if (this.colorByProperty === 'Cluster') {
        return this.getFill(point.Cluster)
      }

      if (this.colorByProperty === 'Party') {
        return this.getFill(point.Party)
      }

      if (this.colorByProperty === 'Bendat_Transition') {
        return this.getFill(point.Bendat_Transition ? 'Yes' : 'No')
      }
      return this.getFill(point[this.keyVar])*/
      return this.getFill(point, this.keyVar)
    },


    addLegend({
      color,
      title,
      tickSize = 10,
      width = 50,
      height = 70 + tickSize,
      marginTop = 10,
      marginRight = 10,
      marginBottom = 40 + tickSize,
      marginLeft = 150,
      ticks = width / 64,
      tickFormat,
      tickValues,
    }) {
      /*const y = scaleBand()
        .domain(color.domain()) // bind text elements.
        .rangeRound([marginLeft, width - marginRight])*/

      console.log("Doug this.colorByProperty: " + this.colorByProperty);
      console.log('domain', color.domain())

      const g = select('.scatterplot')
        .append('g')
        .attr('class', 'legend-element')
        .attr('transform', 'translate(1100, 50)')

      const g2 = select('.scatterplot')
        .append('g')
        .attr('class', 'legend-title')
        .attr('transform', 'translate(1100, 50)')

       /*
        const g2 = select('.scatterplot')
        .append('g')
        .attr('class', 'legend-title')
        .attr('transform', 'translate(800, 25)')
        .join('text')
        .attr('x', marginRight-40)             
        .attr('y', marginTop -35)
        .text('Doug Legend');
        */
        /*svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Value vs Date Graph");*/

        g2.append('text')
        .join('text')
        .attr('x', marginRight-5)             
        .attr('y', marginTop -10)
        .style('font-size', '20px') 
        .style('font-size', '20px') 
        .text(this.colorByProperty.replace(/_/g,' '));

      g.selectAll('text')
        .data(color.domain())
        .join('text')
        .attr('x', marginRight + 30)
        .attr('y', (d, index) => {
          return marginTop + 15 + 23 * index
        })
        .attr('height', height - marginTop - marginBottom)
        .text((d, i) => {
          return d
        })

      g.selectAll('rect')
        .data(color.domain())
        .join('rect')
        .attr('x', marginRight)
        .attr('y', (domain, index) => {
          return marginTop + 23 * index
        })
        // .attr('width', Math.max(0, y.bandwidth() - 1))
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', color)

      /*
        You can use a rest operator to grab all the arguments passed to a function
        .attr('y', (...args) => {
          console.log('d', ...args)
          return marginTop
        })
        */
    },
    updateLegend({
      color,
      title,
      tickSize = 6,
      width = 320,
      height = 44 + tickSize,
      marginTop = 18,
      marginRight = 0,
      marginBottom = 16 + tickSize,
      marginLeft = 0,
      ticks = width / 64,
      tickFormat,
      tickValues,
    }) {
      /*const y = scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight])*/

      /* select('.scatterplot')       
        .selectAll('rect')
        .data(color.domain())
        .join('rect')       
        .attr('fill', color) */
      const g2 = select('.legend-title')
         g2.selectAll('text').remove()
     

        g2.append('text')
        .join('text')
        .attr('x', marginRight-5)             
        .attr('y', marginTop -10)
        .style('font-size', '20px') 
        .style('font-size', '20px') 
        .text(this.colorByProperty.replace(/_/g,' '));



      const g = select('.legend-element')
      console.log('domain', color.domain())
      g.selectAll('text').remove()
      g.selectAll('rect').remove()

      g.selectAll('text')
        .data(color.domain())
        .join('text')
        .attr('x', marginRight + 30)
        .attr('y', (d, index) => {
          return marginTop + 15 + 23 * index
        })
        .attr('height', height - marginTop - marginBottom)
        .text((d, i) => {
          return d
        })

      g.selectAll('rect')
        .data(color.domain())
        .join('rect')
        .attr('x', marginRight)
        .attr('y', (domain, index) => {
          return marginTop + 23 * index
        })
        // .attr('width', Math.max(0, y.bandwidth() - 1))
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', color)
    },
  },
  updated() {
    this.updateLegend({
      color: this.colorScale,
      title: this.colorByProperty ,
      //title: 'presidents legend'
    })
  },
  mounted() {
    setTimeout(() => {  
      this.addLegend({
        color: this.colorScale,
        title: this.colorByProperty,
        //title: 'Presidents legend',
      })
    }, 100)
  },
}
</script>

<style scoped>
.legend-container {
  /*transform: translate(800px, 40px);*/
}
.legend-element {
  transform: translate(800px, -100px);
}

text {
  cursor: pointer;
}
.scatterplot {
  justify-self: center;
  overflow: initial !important;
  padding-top: 1px;
}

.center-align {
  text-anchor: middle;
}
</style>
