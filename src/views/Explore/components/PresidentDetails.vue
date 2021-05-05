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

    <div class="flex details-bar-content" v-if="presidentDetails">

      <div class="p-photo">
        <img
          :src="
            `${publicPath}imgs/portrait_original/` + presidentDetails.Sequence + '.jpeg'
          "
          :width="80"
          :height="95"
        />
      </div>

      <div class="p-facts">
        <span class="p-name">{{ presidentDetails.Name }}<br></span>
        <b>{{ presidentDetails.Year }}</b> {{ presidentDetails.Short_Label }}<br>
        Party <b>{{ presidentDetails.Party }} </b><br />
        <span data-tippy-content="Public persuasion ranking is from the 2017 C-SPAN Historians Survey of Presidential Leadership and is based on the entierety of a president's term(s) in office. Based on survey of 91
presidential historians.">C-SPAN Persuasion Rank</span> <b>{{ presidentDetails.CP_Public_Persuasion }}</b
        ><br />
        <span data-tippy-content="Overall ranking is from the 2017 C-SPAN Historians Survey of Presidential Leadership and is based on the entierety of a president's term(s) in office.  Based on survey of 91 presidential historians.">C-SPAN Overall Rank</span> <b>{{ presidentDetails.CP_Overall }}</b
        ><br />
      </div>


      <div class="p-info">
        {{ presidentDetails.Notes }}<br />
        {{ presidentDetails.War }}<br />
        {{ presidentDetails.Recession }}<br />
        {{ presidentDetails.Bendat_Transition }}<br />
      </div>

      <div class="p-form">

        <span data-tippy-content="The Reach Score is a measure of the proportion of an audience who can understand the speech easily, and is calibrated against the literate general public.  A reach score of 100% would be readable by about 85% of the general public.">Reach</span> <b>{{ presidentDetails.Reach }}</b
        ><br />
        <span data-tippy-content="Flresch Kincaid Grade level presents a U.S. grade level, making it easier for teachers, parents, librarians, and others to judge the readability level of various books and texts.">Grade Level</span> <b>{{ presidentDetails['Flesch Kincaid Grade Level'] }}</b
        ><br />
        Words <b>{{ presidentDetails['Word Count'] }}</b>
      </div>

      <div class="p-content">
        
        <span data-tippy-content="Activity is language featuring movement, change, the implementation of ideas and the
avoidance of inertia.  Rank out of 59 inaugurals addresses.">Activity </span>
        <span :class="['rank', presidentDetails.Activity_Rank < 12 && 'rank-high', presidentDetails.Activity_Rank > 50 && 'rank-low']">{{ parseFloat(presidentDetails.Activity_Rank).toFixed(0) }}</span>
        <br />
         <span data-tippy-content="Certainty is language indicating resoluteness, inflexibility, and completeness and a tendency to
speak ex cathedra. Rank out of 59 inaugurals addresses.">Certainty</span> 
        
        <span :class="['rank', presidentDetails.Certainty_Rank < 12 && 'rank-high', presidentDetails.Certainty_Rank > 50 && 'rank-low']">{{ parseFloat(presidentDetails.Certainty_Rank).toFixed(0) }}</span>
        <br />
 <span data-tippy-content="Commonality is language highlighting the agreed-upon values of a group and rejecting
idiosyncratic modes of engagement. Rank out of 59 inaugurals addresses.">Commonality</span>
        <span :class="['rank', presidentDetails.Commonaliy_Rank < 12 && 'rank-high', presidentDetails.Commonaliy_Rank > 50 && 'rank-low']">{{ parseFloat(presidentDetails.Commonaliy_Rank).toFixed(0) }}</span
        ><br />
       
        <span data-tippy-content="Optimism is language endorsing some person, group, concept or event, or highlighting their
positive entailments. Rank out of 59 inaugurals addresses.">Optimism</span>
        <span :class="['rank', presidentDetails.Optimism_Rank < 12 && 'rank-high', presidentDetails.Optimism_Rank > 50 && 'rank-low']">{{ parseFloat(presidentDetails.Optimism_Rank).toFixed(0) }}</span>
        <br/>
        <span data-tippy-content="Realism is language describing tangible, immediate, recognizable matters that affect people's
everyday lives. Rank out of 59 inaugurals addresses.">Realism</span> 
        <span :class="['rank', presidentDetails.Realism_Rank < 12 && 'rank-high', presidentDetails.Realism_Rank > 50 && 'rank-low']">{{ parseFloat(presidentDetails.Realism_Rank).toFixed(0) }}</span>
        <br />
        <br />
      </div>
    </div>

    <div class="mouseover-info" v-else>
      Move mouse over presidents to explore. Click to save a president to
      sidebar.
    </div>
  </div>
  <!--hr width="”55%″" /-->
  
</template>

<script>
import tippy from 'tippy.js'

export default {
  props: {
    presidentDetails: {
      type: Object,
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
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
    this.tooltips = tippy('[data-tippy-content]', ['tippy-styles'])
  }
}
</script>

<style lang="scss" scoped>
.rank {
  font-weight: bold;
}

.rank-high { 
  color: rgb(55, 150, 194);
  font-weight: bold;

  &:after {
    content: '\2022'
  }
}

.rank-low {
  color: red;
  font-weight: bold;
}
.details-bar {
  height: 140px;
  border-bottom: 1px solid lightgrey;
      max-width: 1280px;
    margin: 0 auto;
        display: flex;
    padding-top: 10px;
    align-items: center;
}

.details-bar-content {
  flex-basis: 100%;
}

.details-bar img {
  border-radius: 70px;
}

.mouseover-info {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
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
