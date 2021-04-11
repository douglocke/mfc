<template>
  <div :class="$style.mainViz">
    <Header :class="$style.header" />
    <main :class="$style.main">
      <div>Selected president details</div>
      <!-- <Component :is="currentExploreComponent" />-->
      <PresidentDetails :presidentDetails="selectedPresidentDetail" />
      <router-view @onPresidentHover="onPresidentHover" @onPresidentSelected="onPresidentSelected" :presidentsData="filteredPresidents" :selectedPresidentDetails="selectedPresidentDetail" />
    </main>
    <aside :class="$style.aside">
      <!--each filter group needs listeners-->
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
/*PresidentsSidebar is default exported */
import PresidentSidebar from './components/PresidentSidebar'

/*named import... filter is a named export in filterPresidents */

import {filter} from './services/filterPresidents'

export default {
  name: 'Explore',
  /* this name can be used in ErrorCapture if error is thrown , otherwise this name is not referenced again specifcially.  used if we did something recursive.*/
  components: {
    Header,
    PresidentDetails,
    PresidentSidebar
  },
  data () {
    return {
      presidentsData: {}, /*empty object, we will assign a new object that contains the ID and the rest of the item details*/
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
      /*filters: default values below*/
      filters: {
        // 'Party': ['Democratic', 'Federalist', 'Independent', 'Democratic-Republican', 'Republican', 'Whig'],
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
      console.log('Value of selectedPresidents: ', this.selectedPresidents)
      
      // Return if this president is already selected
      // Doug.  arrow function, if itemID is already there, then true
      /*we are looping through the currently selected presidents.  _ is a common naming convention for private scope */
      /*if it finds it return the item*/
      /*return only called if its found*/
      
      if (this.selectedPresidents.find(_item => _item.Id === item.Id)) return
      
      /*not found so keep going*/
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
      //Reflect asks if filterkey exists in this.filters (true/false)
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
        //but if none are checked then currently all presidents show
        this.filters[filterKey] = this.filters[filterKey].filter(_value => _value !== value)
      }      
    },
    //question on reduce.
    //The accumulator is the value that we end with and the reducer is what action we will perform in order to get to one value.
    normaliseData(data) {
      return data.reduce((acc, item) => {
        acc[item.Id] = item
        //console.log('Doug: acc: ', acc[item.Id])
        return acc
      }, {})
    },
    setInitialPresidentDetail(presidentsData) {
      const {id} = this.$route.query
      if (!id) return
      this.selectedPresidentDetail = presidentsData[id]
      
    },  
    getMainVizData () {
      fetch('/data/MainVizData.json')
        .then(response => response.json())
        .then(data => {
          console.log({data})
          this.presidentsData = this.normaliseData(data)
          this.setInitialPresidentDetail(this.presidentsData)
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
  background: rgb(130, 168, 168);
  //display: flex;
  //align-items: left;
}

.header {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  background: lightgoldenrodyellow;
  /*
  grid-area: 1 / 1 / 2 / 3
  grid-area: row-start / col-start / row-end / col-end
  */
}

.main {
  grid-row: 2 / 4;
  grid-column: 1 / 2;
  background: rgb(195, 148, 197);
}

.aside {
  grid-row: 2 / 4;
  grid-column: 2 / 3;
  //display: flex;
  //align-items: left;
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
