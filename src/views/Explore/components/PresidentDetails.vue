<template>
  <div>
    President details

    <div v-if="presidentDetails">
      {{presidentDetails.Name}}
    </div>
    <div v-else>
      Please select a president
    </div>
  </div>
</template>

<script>



export default {
  props: {
    presidentDetails: {
      type: Object,
    }
  },
  
}
</script>
