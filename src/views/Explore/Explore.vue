<template>
  <div :class="$style.mainViz">
    <Header :class="$style.header" />
    <main :class="$style.main">
      <div>Selected president details</div>
      <!-- <Component :is="currentExploreComponent" />-->
      <PresidentDetails :presidentDetails="selectedPresidentDetail" />
      <router-view @onPresidentHover="onPresidentHover" @onPresidentSelected="onPresidentSelected" :presidentsData="filteredPresidents" />
    </main>
    <aside :class="$style.aside">
      <PresidentSidebar :selectedPresidents="selectedPresidents" @onFilterChange="onFilterChange" :filters="filters" @onSelectFilterChange="onSelectFilterChange" />
    </aside>
    <!-- <footer :class="$style.footer">
      Notes field
    </footer>-->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import PresidentDetails from './components/PresidentDetails'
import PresidentSidebar from './components/PresidentSidebar'
import {filter} from './services/filterPresidents'
export default {
  name: 'Mainviz',
  components: {
    Header,
    PresidentDetails,
    PresidentSidebar
  },
  data () {
    return {
      presidentsData: {
        1: {},
        2: {}
      },
      selectedPresidentDetail: null /* get from Sidebar */,
      selectedPresidents: [] /* get from sidebar */,
      /* filters: [
        {
          name: 'Party',
          values: ['Federalist', 'Democrat', 'Republican'],
          selected: []
        },
        {
          name: 'Wartime president',
          values: [true, false],
          selected: false
        }
      ]*/
      filters: {
        'Party': ['Republican', 'Whig'],
        'Sentiment': ['Positive']
      }
    }
  },
  computed: {
    filteredData () {
      return this.speeches.filter()
    },
    filteredPresidents() {
      return Object.values(this.presidentsData).filter(item => {
        return filter(item, this.filters)
      })
    }
  },
  methods: {
    onPresidentHover(item) {
      console.log('on hover president', item.Name)
      this.selectedPresidentDetail = item
    },
    onPresidentSelected(item) {
      console.log('on president selected', item.Name)
      // Return if this president is already selected
      if (this.selectedPresidents.find(_item => _item.Id === item.Id)) return
      // If we have two presidents already, we want to keep the last one added
      if (this.selectedPresidents.length == 2) {
        this.selectedPresidents = [this.selectedPresidents[1], item]
      } else {
        this.selectedPresidents.push(item)
      }
    },
    onSelectFilterChange({filterKey, value}) {
      console.log('on select filter', filterKey, value)
      // Add a filter if it's not present yet
      if (!Reflect.has(this.filters, filterKey)) {
        this.filters[filterKey] = []
      }
      // Set the filter value, e.g. this.filters.Bendat_Transition = 'significant'
      this.filters[filterKey] = value
    },
    onFilterChange({filterKey, value, checked}) {
      console.log('on filter change')
      // Add a filter if it's not present yet
      if (!Reflect.has(this.filters, filterKey)) {
        this.filters[filterKey] = []
      }

      if (checked) {
        // If the filter is to be added, push it to the filters array
        this.filters[filterKey].push(value)
      } else {
        // Remove the filter
        this.filters[filterKey] = this.filters[filterKey].filter(_value => _value !== value)
      }      
    },
    normaliseData(data) {
      return data.reduce((acc, item) => {
        acc[item.Id] = item
        return acc
      }, {})
    },
    getMainVizData () {
      fetch('/data/MainVizData.json')
        .then(response => response.json())
        .then(data => {
          console.log({data})
          this.presidentsData = this.normaliseData(data)
        })
    }
  },
  created () {
    this.getMainVizData()
  }
}
</script>

<style lang="scss" module>
.mainViz {
  display: grid;
  grid-template-columns: 1fr 22rem;
  grid-template-rows: 80px 1fr;
  min-height: 100vh;
}

.header {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  /*
  grid-area: 1 / 1 / 2 / 3
  grid-area: row-start / col-start / row-end / col-end
  */
}

.main {
  grid-row: 2 / 4;
  grid-column: 1 / 2;
}

.aside {
  grid-row: 2 / 4;
  grid-column: 2 / 3;
}

/*
.footer {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
}
*/
/*
put a section for each block here?
*/

/*
#president-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;

.inaugural-stats {
    display: none;
    position: absolute;
    position: absolute;
    top: -50px;
    left: 0px;
    border: 1px solid gray;
    border-radius: 5px;
    background: lightgoldenrodyellow;
    text-align:left;
}
.inaugural-data:hover .inaugural-stats {
    display: block;
*/
</style>
