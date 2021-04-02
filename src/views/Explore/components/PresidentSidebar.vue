<template>
  <div>
    <div v-if="presidentOne">
      {{presidentOne.Name}}
    </div>
     <div v-if="presidentTwo">
      {{presidentTwo.Name}}
    </div>

    <div>
      <div v-for="party of parties" :key="party.value">
        <label>
          <input type="checkbox" :checked="isChecked('Party', party.value)" :value="party.value" @input="onFilterChange('Party', party.value, $event.target.checked)" /> {{party.label}}
        </label>
      </div>
      <div>
        <select @change="onBendatTransitionChange">
          <option v-for="(item, index) of bendatTransition" :key="index" :value="item.value">{{item.label}}</option>
        </select>
      </div>
    </div>
  </div>

</template>
<script>
import {parties, bendatTransition} from '../filters.config'
export default {
  props: {
    selectedPresidents: {
      type: Array,
      default: () => []      
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
      parties,
      bendatTransition
    }
  },
  computed: {
    presidentOne() {
      return this.selectedPresidents?.[0]
    },
    presidentTwo() {
      return this.selectedPresidents?.[1]
    }
  },
  methods: {
    isChecked(key, value) {
      console.log('is Checked', key, value, this.filters,  this.filters[key]?.includes(value))
      return this.filters[key]?.includes(value)
    },
    onFilterChange(filterKey, value, checked) {
      console.log({filterKey, value})
      this.$emit('onFilterChange', {filterKey, value, checked})
    },
    onBendatTransitionChange(event) {
      console.log(event, event.target.value)
      this.$emit('onSelectFilterChange', {
        filterKey: 'Bendat_Transition',
        value: event.target.value
      })
    }
  },
}
</script>