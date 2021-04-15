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
     Name <b>{{ presidentDetails.Name }}</b><br>
     Year <b>{{presidentDetails.Year}}</b><br>
     Party <b>{{ presidentDetails.Party }} </b><br>
     C-SPAN Persuasion Rank <b>{{ presidentDetails.CP_Public_Persuasion}}</b><br>
      </div>


    <div class="p-photo">
    <img
              :src="'/imgs/portrait_original/' + presidentDetails.Sequence + '.jpeg'"
              :width="60"
              :height="80"
          />
      </div>
    <div class="p-info">
      {{presidentDetails.Notes}}<br>
      {{presidentDetails.War}}<br>
      {{presidentDetails.Recession}}<br>
      {{presidentDetails.Bendat_Transition}}<br>
      </div>



    <div class="p-form">
     Form<br>
     Reach <b>{{presidentDetails.Reach}}</b><br>
     Grade Level <b>{{presidentDetails.["Flesch Kincaid Grade Level"]}}</b><br>
     Words <b>{{presidentDetails.["Word Count"]}}</b>
      </div>


      <div class="p-content">
     Content<br>
     Activity <b>{{presidentDetails.Activity}}</b><br>
     Certainty <b>{{presidentDetails.Certainty}}</b><br>
     Optimism <b>{{presidentDetails.Optimism}}</b><br>
     Realism <b>{{presidentDetails.Realism}}</b><br>
      </div>


      

   
    </div>
    
    <div v-else>Move mouse over presidents to explore.  Click to save a president to sidebar.</div>
  </div>
  <br>
  <hr width=”55%″>
</template>

<script>
export default {
  props: {
    presidentDetails: {
      type: Object,
    },
  },
}
</script>

<style scoped>

.details-bar img {
  border-radius: 70px;
}

.flex {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  height: 80px;
  padding-top: 10px;
}

.p-info {
  width: 180px;
}

.p-facts {
  text-align: left;
}

.p-form {
  text-align: right;
}

.p-content {
  text-align: right;
}
</style>