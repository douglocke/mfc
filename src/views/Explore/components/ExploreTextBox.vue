<template>
  <div class="footerbox">
    <p v-if="currentText">{{ currentText }}</p>
  </div>
</template>
<script>
const textMap = {
  exploreForm: {
    Top_Speech: `Many of the top inaugurals land in our lowest right quadrant.  `,
    Cluster: `Lorem ipsum dolor cluster amet consectetur adipisicing elit. Enim consequatur aliquid alias esse illo totam porro eius quo dignissimos, praesentium sequi reprehenderit beatae odit a temporibus nisi ex pariatur sed.
    Autem saepe vel enim! Laudantium eius iste ipsum dolorem architecto autem ab reprehenderit earum accusantium natus ipsa repudiandae voluptatibus, odio totam ad hic, asperiores quia ex repellendus? Inventore, dolore quisquam!
    Perspiciatis, nihil sit culpa saepe et nesciunt inventore illum modi accusantium aspernatur optio consequatur, vitae distinctio corrupti, commodi tempore reprehenderit sed ratione? Mollitia alias a facere dolores ex suscipit similique.`,
    Bendat_Transition: ` Lorem ipsum bendat sit amet consectetur adipisicing elit. Recusandae esse modi sed commodi provident dolore laborum ex animi, at, ut cum ullam necessitatibus ratione sunt excepturi. Maxime libero officiis sit!
   Alias, quibusdam libero perferendis inventore sit ea omnis quis aperiam deleniti repellendus adipisci ducimus quidem iste eius reprehenderit modi similique itaque vitae magnam sed in architecto excepturi. Numquam, vel illo.
   Placeat exercitationem blanditiis nihil nisi laborum odit quis eos beatae, delectus quaerat quos quidem, dolor ut suscipit facere possimus recusandae in consequatur vero voluptates laboriosam quae repudiandae! Veniam, perspiciatis nemo.
   Molestiae error accusamus in neque voluptatibus, blanditiis perferendis, similique corrupti asperiores perspiciatis ab cum quo. Quos eaque nam similique, illum sunt assumenda. Quam odio, dignissimos veniam molestias nisi cupiditate nemo.
   Assumenda animi incidunt harum suscipit distinctio voluptatum, voluptate doloremque iste, quaerat ratione mollitia error. Vero, dolorem perspiciatis rerum ea architecto quas, alias adipisci voluptatem modi veniam at nobis, necessitatibus totam.`,
  },
  exploreContent: {
    Top_Speech: `In red italics we see inaugural speeches that have been rated as being the very best by presidential historians.   The closer the names are to each other, the closer the speeches are similar in their content, as rated by the special five non-overlapping lexical variables, Activity, Certainty, Commonality, Optimism, and Realism.  The raw scores are not shown, but the detail bar on the top right shows how each speech ranked (out of a possible 59).  James Madison's first inaugural scores very closely with George Washington's first address.  And George W. Bush's 1st inaugural compares closely in content scoring with Franklin Roosevelt's first inaugural.  Is it possible these speeches been overlooked by historians?`,
    Cluster: `A clustering analysis shows that there are 3 main groupings of presidential inaugural addresses, when considering the five lexical content variables.  Cluster 2 (green) has some inaugurals that score well in Activity & Commonality, notably Barack Obama's second inaugural shows much higher scores in these areas than his first inaugural.  Cluster 4 (red) contains many of the historically great speeches, interestingly most of these coincidentally have excellent reach scores.   Cluster 3 (blue) contains many ordinary speeches densely concentrated, with some notable exceptions in Washington's first and Jefferson's first. Woodrow Wilson scored in extremes: low in Activity and Commonality, but very high on Optimism.`,
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