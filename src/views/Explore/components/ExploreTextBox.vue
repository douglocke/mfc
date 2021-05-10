<template>
  <div class="footerbox">
    <p v-if="currentText" v-html="currentText"></p>
  </div>
</template>
<script>
const textMap = {
  exploreForm: {
    Top_Speech: `Six of the seven great speeches identified by presidential historians are between grades 10 and 13.  Many of the more recent speeches score at 7-8 grade level, as modern speechwriters aim at the largest possible audiences.`,
    Reach: `A clear pattern emerges as grade levels drop over time.  Reach scores are highly correlated with grade levels.  Notably, <span class="red italics roboto">George Washington</span>'s speech was directed to Congress, not to the general public.  Has overall speech quality suffered as presidents aim for reaching the widest possible audience?`,
    Cluster: `A clustering analysis shows that there are 3 main groupings of presidential inaugural addresses, when considering the five lexical content variables.  <span class="green roboto">Cluster 2</span> has some inaugurals that score well in Activity & Commonality, notably <span class="green roboto">Barack Obama</span>'s second inaugural shows much higher scores in these areas than his first inaugural.  <span class="red roboto">Cluster 4</span> contains many of the historically great speeches, interestingly most of these coincidentally have excellent reach scores. A case can be made here that truly <span class="red italics roboto">Abraham Lincoln</span> was ahead of his time, and his addresses and more similar to the modern era.  <span class="blue roboto">Cluster 3</span> contains many ordinary speeches densely concentrated, with some notable exceptions in <span class="blue italics roboto">Washington</span>'s first and <span class="blue italics roboto">Jefferson</span>'s first. <span class="yellow roboto">Woodrow Wilson</span> scored in extremes: low in Activity and Commonality, but very high on Optimism.`,
    Bendat_Transition: `Presidential historian Jim Bendat has identified the most significant presidential transitions of power.  Four of the nine significant transitions are also considered top speeches.  Clearly significant transitions help also to raise the profile of certain speeches.`,
  },
  exploreContent: {
    Top_Speech: `In <span class="red italics roboto">red italics</span> we see inaugural speeches that have been rated as being the very best by presidential historians.   The closer the names are to each other, the closer the speeches are similar in their content, as rated by the special five non-overlapping lexical variables, Activity, Certainty, Commonality, Optimism, and Realism.  The raw scores are not shown, but the detail bar on the top right shows how each speech ranked (out of a possible 59).  <span class="grey  roboto">James Madison</span>'s first inaugural scores very closely with <span class="red italics roboto">George Washington</span>'s first address.  And <span class="grey roboto">George W. Bush</span>'s 1st inaugural compares closely in content scoring with <span class="red italics roboto">Franklin Roosevelt</span>'s first inaugural.  Is it possible these speeches been overlooked by historians?`,
    Cluster: `A clustering analysis shows that there are 3 main groupings of presidential inaugural addresses, when considering the five lexical content variables.  <span class="green roboto">Cluster 2</span> has some inaugurals that score well in Activity & Commonality, notably <span class="green roboto">Barack Obama</span>'s second inaugural shows much higher scores in these areas than his first inaugural.  <span class="red roboto">Cluster 4</span> contains many of the historically great speeches, interestingly most of these coincidentally have excellent reach scores.   <span class="blue roboto">Cluster 3</span> contains many ordinary speeches densely concentrated, with some notable exceptions in <span class="blue italics roboto">Washington</span>'s first and <span class="blue italics roboto">Jefferson</span>'s first. <span class="yellow roboto">Woodrow Wilson</span> scored in extremes: low in Activity and Commonality, but very high on Optimism.`,
    Bendat_Transition: `Presidential historian Jim Bendat has identified the most significant presidential transitions of power.  Four of the nine significant transitions are also considered top speeches.  Clearly significant transitions help also to raise the profile of certain speeches.`,
    Party: `Political party appears to have no bearing on speech content similarity.`,
    Reach: `The Reach Score is a measure of the proportion of an audience who can understand the speech easily, and is calibrated against the literate general public.  A reach score of 100% would be readable by about 85% of the general public.`,
  },
}
export default {
  name: 'ExploreTextBox',
  props: {
    colorByProperty: {
      type: String,
    },
  },
  setup() {
    return {
      textMap,
    }
  },
  computed: {
    currentText() {
      return textMap[this.currentExplorePage]?.[this.colorByProperty] || ''
    },
    currentExplorePage() {
      return this.$route.name === 'ExploreForm' ? 'exploreForm' : 'exploreContent'
    }
  },
}
</script>
<style lang="scss">
.footerbox {
  .red {
    color: red;
  }
   .blue {
    color: #1E3A8A;
  }
    .green {
    color: #34D399;
  }
    .yellow {
    color: #f09e06;
  }
    .grey {
    color: #6B7280;
  }

  .italics {
    font-style: italic;;
  }

  .roboto {
    font-family: Roboto, Helvetica, Arial, sans-serif;;
  }
}

</style>

<style scoped>

.footerbox{
font-family: EB Garamond, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  font-size: 18px;
  color: #2c3e50;
  padding-right: 30px;
  padding-left: 50px;
  background-color:#FEF7EE;
  /*#FEF7EE cream*/
  padding-top: -10px;
  border-top: 1px solid lightgrey;


   max-width: 1280px; /*breakpoint*/
    margin: 0 auto;
    padding-top: 30px;
}
 
 .redstuff{
   color: red;
 }
</style>