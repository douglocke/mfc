// Inaugural.vue

<template>
  <div>
    <div class="title">
    <h1>"My Fellow Citizens..."</h1>
    </div>
    <div class="subtitle">
    <h2>The Inaugural Addresses of the Presidents of the United States</h2>
    <h2>1789-2021</h2>
    
    <h4>Explore the presidential inaugurals below.</h4>
    <h4>Click on any image to continue.</h4>
    </div>
    <ol id="president-list">
      <li
        v-for="inauguralData in inauguralDataList"
        :key="inauguralData.Id"
        class="inaugural-data"
      >
        <Component :is="inauguralData.Speech === 1 ? 'router-link' : 'div'" class="presidentBlock" :to="`/explore/content?id=${inauguralData.Id}`">
          <span class="Photo"
            ><img
              :src="'/imgs/portrait_original/' + inauguralData.Photo"
              :width="90"
              :height="110"
              class="presidentImage"
          /></span>
          <div class="inaugural-stats">
            <span class="Name">{{ inauguralData.Name }}</span>
            <br />
            <span class="Year">{{ inauguralData.Year }}</span>
            <br />
            <span class="Note">{{ inauguralData.Note }}</span>
          </div>
        </Component>
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
  },
  created () {
    this.getInauguralData()
  }
}
</script>

<style lang="scss" scoped>
/*
.Year2 text {
  opacity: 0;
}
*/

a.presidentBlock {
  .presidentImage {
    transition: 0.25s all;
  }
  .presidentImage:hover {
    box-shadow: 0 10px 15px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.5);
    transform: translateY(5px);
    opacity: 0.75;
  }
}

.title {

 font-family: RemsenScript, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 3em;

}

.subtitle {

 font-family: EB Garamond, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}


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
  z-index: 2;
  top: 0;
  transform: translateY(-90%);
  left: 0px;
  width: 200px;
  border: 1px solid gray;
  border-radius: 5px;
  background: lightgoldenrodyellow;
  text-align: left;
}
.inaugural-data:hover .inaugural-stats {
  display: block;
}

</style>
