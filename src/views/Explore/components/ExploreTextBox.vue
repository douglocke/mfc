<template>
  <div>
    <p v-if="currentText">{{ currentText }}</p>
  </div>
</template>
<script>
const textMap = {
  exploreForm: {
    Party: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consequatur aliquid alias esse illo totam porro eius quo dignissimos, praesentium sequi reprehenderit beatae odit a temporibus nisi ex pariatur sed.
    Autem saepe vel enim! Laudantium eius iste ipsum dolorem architecto autem ab reprehenderit earum accusantium natus ipsa repudiandae voluptatibus, odio totam ad hic, asperiores quia ex repellendus? Inventore, dolore quisquam!
    Perspiciatis, nihil sit culpa saepe et nesciunt inventore illum modi accusantium aspernatur optio consequatur, vitae distinctio corrupti, commodi tempore reprehenderit sed ratione? Mollitia alias a facere dolores ex suscipit similique.`,
    Bendat_Transition: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae esse modi sed commodi provident dolore laborum ex animi, at, ut cum ullam necessitatibus ratione sunt excepturi. Maxime libero officiis sit!
   Alias, quibusdam libero perferendis inventore sit ea omnis quis aperiam deleniti repellendus adipisci ducimus quidem iste eius reprehenderit modi similique itaque vitae magnam sed in architecto excepturi. Numquam, vel illo.
   Placeat exercitationem blanditiis nihil nisi laborum odit quis eos beatae, delectus quaerat quos quidem, dolor ut suscipit facere possimus recusandae in consequatur vero voluptates laboriosam quae repudiandae! Veniam, perspiciatis nemo.
   Molestiae error accusamus in neque voluptatibus, blanditiis perferendis, similique corrupti asperiores perspiciatis ab cum quo. Quos eaque nam similique, illum sunt assumenda. Quam odio, dignissimos veniam molestias nisi cupiditate nemo.
   Assumenda animi incidunt harum suscipit distinctio voluptatum, voluptate doloremque iste, quaerat ratione mollitia error. Vero, dolorem perspiciatis rerum ea architecto quas, alias adipisci voluptatem modi veniam at nobis, necessitatibus totam.`,
  },
  exploreContent: {
    Party: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores culpa dolorem voluptatum est repudiandae officiis ex non soluta accusamus aut, nihil rerum nulla aliquid, id minus sed placeat assumenda deserunt.`,
    Bendat_Transition: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius minus quo itaque tenetur officia dolorem tempore quibusdam doloribus nulla nobis fugiat modi voluptas amet voluptates hic ipsum, illo mollitia?
    Id ab nemo earum facere quis ducimus exercitationem fugiat eum molestiae. Quibusdam, reiciendis laboriosam a praesentium sit officia incidunt vero debitis tempora, itaque, sed minus sapiente? Harum molestiae alias recusandae.`,
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
