// Inaugural.vue

<template>
  <div>
    <div class="title">"My Fellow Citizens..."</div>
    <div class="subtitle">
      <!--George Washington's First Inaugural Address-->
      <div v-if="selectedPresident">
        {{ selectedPresident.Name }}{{ selectedPresident.Label }}<br />
        {{ selectedPresident.Year }}<br />
        <span class="subtitle-note">{{ selectedPresident.Note }}</span
        ><br />
      </div>
      <div v-else>
        The Inaugural Addresses of the Presidents of the United States<br />
        1789-2021<br />
        <br />
      </div>
      <!--1789-->
    </div>
    <div class="instructions">
      <br />
      Click on a president to continue.
    </div>

    <ol id="president-list">
      <li
        v-for="inauguralData in inauguralDataList"
        :key="inauguralData.Id"
        class="inaugural-data"
        @mouseenter="selectedPresident = inauguralData"
        @mouseleave="selectedPresident = null"
      >
        <Component
          :is="inauguralData.Speech === 1 ? 'router-link' : 'div'"
          :class="[
            'presidentBlock',
            inauguralData.Speech === 1 ? 'has-speech' : 'no-speech',
          ]"
          :to="`/explore/content?id=${inauguralData.Id}`"
        >
          <!--if they had a speech then router link, else create a div-->

          <span class="Photo"
            ><img
              :src="'/imgs/portrait_original/' + inauguralData.Photo"
              :width="90"
              :height="110"
              class="presidentImage"
          /></span>
          <div class="inaugural-stats">
            <span class="Name"
              ><b>{{ inauguralData.Name }}{{ inauguralData.Label }}</b></span
            >
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
  data() {
    return {
      inauguralDataList: [],
      clickedInauguralId: '',
      selectedPresident: null,
    }
  },
  props: {
    /* receiving variables */
  },
  methods: {
    getInauguralData() {
      fetch('./data/smalltitle.json')
        .then(response => response.json())
        .then(data => (this.inauguralDataList = data))
    },
  },
  created() {
    this.getInauguralData()
  },
}
</script>

<style lang="scss" scoped>
/*
.Year2 text {
  opacity: 0;
}
*/

.presidentBlock {
  &.has-speech {
    .presidentImage {
      transition: 0.25s all;
    }
    .presidentImage:hover {
      box-shadow: 0 10px 15px -1px rgba(0, 0, 0, 0.1),
        0 4px 6px -1px rgba(0, 0, 0, 0.5);
      transform: translateY(5px);
      opacity: 0.75;
    }
  }
  &.no-speech:hover {
    animation: shake 0.5s;
    animation-iteration-count: 1;
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.title {
  font-family: RemsenScript, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 6em;
  font-style: bold;
  margin-block: 0;
}

.subtitle {
  //font-family: EB Garamond, Helvetica, Arial, sans-serif;
  font-family: EB Garamond, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 2em;
}

.subtitle-note {
  font-size: 1.4rem;
}

.instructions {
  //font-family: EB Garamond, Helvetica, Arial, sans-serif;
  font-family: EB Garamond, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1em;
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
  font-family: EB Garamond, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1em;

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
  background: #fef7ee;
  text-align: left;
}
.inaugural-data:hover .inaugural-stats {
  //display: block;
  //uncomment to restore pop-up
}
</style>
