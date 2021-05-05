<template>
  <div>
     <ol id="president-list">
      <li
        v-for="president in presidentsData"
        :key="president.Id"
        class="president-data"
      >
        <button class="president-button" :to="`/explore/content?id=${president.Id}`" @click="$emit('president-selected', president)">
          <span class="Photo"
            ><img
              :src="`${publicPath}imgs/portrait_original/${president.Sequence}.jpeg`"
              :width="140"
              :height="170"
          /></span>
          <div class="president-stats">
            <span class="Name">{{ president.Name }}</span>
            <br />
            <span class="Year">{{ president.Year }}</span>
            <br />
            <span class="Note">{{ president.Note }}</span>
          </div>
        </button>
      </li>
    </ol>
  </div>
</template>

<script>

export default {
  data() {
    return {
      presidentsData: [],
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
    async getPresidentsData () {
      try {
        const response = await fetch(`${process.env.BASE_URL}data/MainVizData.json`)
        const data = await response.json()
        const presidentsWithSpeeches = data.filter(president => !!president.Filename)
        this.presidentsData = presidentsWithSpeeches.reverse()
      } catch (error) {
        console.error(error)
      }
    },
  },
  created () {
    this.getPresidentsData()
  }
}
</script>
<style scoped>

#president-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
}

.president-data {
  position: relative;
  background: white;
}

.president-stats {
  display: none;
  /* position: absolute; */
  position: absolute;
  z-index: 2;
  top: -50px;
  left: 0px;
  width: 200px;
  border: 1px solid gray;
  border-radius: 5px;
  background: lightgoldenrodyellow;
  text-align: left;
}
.president-data:hover .president-stats {
  display: block;
}
</style>