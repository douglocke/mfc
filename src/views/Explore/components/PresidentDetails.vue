<template>
  <div class="details-bar">
    <!--President details-->
    <!--"Filename": "33_1917_WW.txt",
    "Year": 1917,
    "Id": 38,
    "Sequence": 28,
    "Reach": "85%",
    "Reach_vs_Avg": "18%",
    "Bendat_Transition": "Eve of U.S. Entry to Civil War",
    "Notes": "First private oath taking on a Sunday",
    "Boller_Top": 0,
    "Name": "Woodrow Wilson",
    "Party": "Democratic",
    "War": "World War I",
    "War_Ind": 1,
    "Recession": "",
    "Recession_Ind": 0,
    "CP_Public_Persuasion": 11,
    "CP_Overall": 11,
    "CP_Top10": 0,
    "CP_Bottom10": 0,
    "Rating": "D",
    "Flesch Reading Ease": 62.4,
    "Flesch Kincaid Grade Level": 10.1,
    "Word Count": 1529,
    "Words With Seven Letters": 294,
    "Words With One Syllable": 1084,
    "Dale-Chall Difficult Words": 323,
    "Unique Word Count": 524,
    "Words Per Sentence": 25.1,
    "Speaking Time": "13:00",
    "Sentiment": "Positive",
    "Tone Number": 35,
    "Insistence": 10.52,
    "Activity": 25.37,
    "Activity_Rank": 59,
    "Optimism": 63.99,
    "Optimism_Rank": 1,
    "Certainty": 50.06,
    "Certainty_Rank": 25,
    "Realism": 50.09,
    "Realism_Rank": 23,
    "Commonality": 46.15,
    "Commonaliy_Rank": 57,-->

    <div class="flex" v-if="presidentDetails">
      <div class="p-facts">
        <span class="p-name">{{ presidentDetails.Name }}<br></span>
        <b>{{ presidentDetails.Year }}</b> {{ presidentDetails.Short_Label }}<br>
        Party <b>{{ presidentDetails.Party }} </b><br />
        C-SPAN Persuasion Rank <b>{{ presidentDetails.CP_Public_Persuasion }}</b
        ><br />
        C-SPAN Overall Rank <b>{{ presidentDetails.CP_Overall }}</b
        ><br />
      </div>

      <div class="p-photo">
        <img
          :src="
            '/imgs/portrait_original/' + presidentDetails.Sequence + '.jpeg'
          "
          :width="60"
          :height="80"
        />
      </div>
      <div class="p-info">
        {{ presidentDetails.Notes }}<br />
        {{ presidentDetails.War }}<br />
        {{ presidentDetails.Recession }}<br />
        {{ presidentDetails.Bendat_Transition }}<br />
      </div>

      <div class="p-form">
        
        Reach <b>{{ presidentDetails.Reach }}</b
        ><br />
        Grade Level <b>{{ presidentDetails['Flesch Kincaid Grade Level'] }}</b
        ><br />
        Words <b>{{ presidentDetails['Word Count'] }}</b>
      </div>

      <div class="p-content">
        
        <span data-tippy-content="Language featuring movement, change, the implementation of ideas and the
avoidance of inertia.">Activity </span><b>{{ parseFloat(presidentDetails.Activity_Rank).toFixed(0) }}</b><br />
         <span data-tippy-content="Language indicating resoluteness, inflexibility, and completeness and a tendency to
speak ex cathedra.">Certainty</span> <b>{{ parseFloat(presidentDetails.Certainty_Rank).toFixed(0) }}</b><br />
        <span data-tippy-content="Language endorsing some person, group, concept or event, or highlighting their
positive entailments.">Optimism</span> <b>{{ parseFloat(presidentDetails.Optimism_Rank).toFixed(0) }}</b
        ><br />
         <span data-tippy-content="Language describing tangible, immediate, recognizable matters that affect people's
everyday lives.">Realism</span> <b>{{ parseFloat(presidentDetails.Realism_Rank).toFixed(0) }}</b
        ><br />
        <span data-tippy-content="Language highlighting the agreed-upon values of a group and rejecting
idiosyncratic modes of engagement.">Commonality</span>
        <span :class="['rank', presidentDetails.Commonaliy_Rank < 12 && 'rank-high', presidentDetails.Commonaliy_Rank > 50 && 'rank-low']">{{ parseFloat(presidentDetails.Commonaliy_Rank).toFixed(0) }}</span
        ><br />
      </div>
    </div>

    <div class="mouseover-info" v-else>
      Move mouse over presidents to explore. Click to save a president to
      sidebar.
    </div>
  </div>
  <hr width="”55%″" />
</template>

<script>
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css';

export default {
  props: {
    presidentDetails: {
      type: Object,
    },
  },
  methods: {
    destroyTooltips() {
      this.tooltips?.forEach(instance => instance?.destroy())
    }
  },
  updated() {
    console.log(this.tooltips)
    this.destroyTooltips()
    this.tooltips = tippy('[data-tippy-content]')
  },
  beforeUnmount() {
    this.destroyTooltips()
  },
  mounted() {
    this.tooltips = tippy('[data-tippy-content]')
  }
}
</script>

<style lang="scss" scoped>
.rank {
  font-weight: bold;
}

.rank-high { 
  color: orange;
  &:after {
    content: '\2022'
  }
}

.rank-low {
  color: red;
}
.details-bar {
  height: 105px;
}
.details-bar img {
  border-radius: 70px;
}

.mouseover-info {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  padding-top: 10px;
}

.p-photo {
  flex-basis: 80px;
}

.p-info {
  flex-basis: 40%;
}

.p-name{
font-size: 1.2em;
font-weight: 900;
}

.p-facts {
  text-align: left;
  line-height: 1.4;
}

.p-form {
  text-align: right;
  line-height: 1.4;
}

.p-content {
  text-align: right;
  line-height: 1.4;
}
</style>
