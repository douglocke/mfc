// Inaugural.vue

<template>
  <div>
    <h1>"My Fellow Citizens..."</h1>
    <h2>The Inaugural Addresses of the Presidents of the United States</h2>
    <h2>1789-2021</h2>
    <br />
    <h4>Explore the presidential inaugurals below.</h4>
    <h4>Click on any image to continue.</h4>
    <ol id="president-list">
      <li
        v-for="inauguralData in inauguralDataList"
        :key="inauguralData.Id"
        class="inaugural-data"
      >
        <router-link :to="`/explore/content?id=${inauguralData.Id}`">
          <span class="Photo"
            ><img
              :src="'/imgs/portrait_original/' + inauguralData.Photo"
              :width="140"
              :height="170"
          /></span>
          <div class="inaugural-stats">
            <span class="Name">{{ inauguralData.Name }}</span>
            <br />
            <span class="Year">{{ inauguralData.Year }}</span>
            <br />
            <span class="Note">{{ inauguralData.Note }}</span>
          </div>
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Inaugural',
  data () {
    return {
      inauguralDataList: [],
      clickedInauguralId: ''
    }
  },
  props: {
    /* receiving variables */
  },
  methods: {
    getInauguralData () {
      fetch('./data/smalltitle.json')
        .then(response => response.json())
        .then(data => (this.inauguralDataList = data))
    },
    setHovered (nextHovered) {
      this.hovered = nextHovered
    }
  },
  created () {
    this.getInauguralData()
  }
}
</script>

<style scoped>
/*
.Year2 text {
  opacity: 0;
}
*/
.Photo img {
  border-radius: 70px;
}

circle {
  stroke: black;
  stroke-width: 1px;
  opacity: 0.5;
}

#president-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
}

.inaugural-data {
  position: relative;
  background: white;
}

.inaugural-stats {
  display: none;
  /* position: absolute; */
  position: absolute;
  top: -50px;
  left: 0px;
  border: 1px solid gray;
  border-radius: 5px;
  background: lightgoldenrodyellow;
  text-align: left;
}
.inaugural-data:hover .inaugural-stats {
  display: block;
}

/* if mainviz is selected via onClick then show it & hide the Title  ......   otherwise hide the main viz.*/
</style>
