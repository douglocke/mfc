<template>
<div :class="$style.sidebar">
  <div>
    <h2>Compare</h2>

    <div>
      <div>
        <button @click.prevent="$emit('select-president', 'speech')">
          {{selectedPresident?.Name}}
        </button>
      </div>
      <div>
        <button v-show="selectedPresident && selectedPresidentCompare" @click.prevent="$emit('switch-presidents')">Switch</button>
      </div>
      <div>
        <button @click.prevent="$emit('select-president', 'compare')">
          {{selectedPresidentCompare?.Name || 'Select'}}
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: {
    selectedPresident: {
      type: Object,
    },
    selectedPresidentCompare: {
      type: Object,
    }
  }
}
</script>

<style lang="scss" module>
.sidebar {
  position: sticky;
  top: 0
}
</style>