<template>
  <div><span class="selected-presidents">
    <div v-if="selectedPresident">
      <img
              :src="'/imgs/portrait_original/' + selectedPresident.Sequence + '.jpeg'"
              :width="40"
              :height="60"
          />
      {{selectedPresident.Year}}
    </div>
    <div v-if="selectedPresidentCompare">
       <img
              :src="'/imgs/portrait_original/' + selectedPresidentCompare.Sequence + '.jpeg'"
              :width="40"
              :height="60"
          />
      {{selectedPresidentCompare.Year}}
    </div>
    </span>
    Filters
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
    <div><br>
      Color <br>
      <select :value="colorByProperty" @change="onChangeColorByProperty">
        <option value="Party">Party</option>
        <option value="Bendat_Transition">Bendat Transition</option>
      </select>
      </div>
  </div>

</template>
<!--Offload the details of each filtering into another file-->
<script>
import {parties, bendatTransition} from '../filters.config'
export default {
  props: {
    selectedPresident: {
      type: Object,
    },
    selectedPresidentCompare: {
      type: Object
    },
    filters: {
      type: Object,
      default: () => ({})
    },
    colorByProperty: {
      type: String,
      default: 'Party'
    }
  },
  setup() {
    return {
      parties,
      bendatTransition
    }
  },
  computed: {
   
  },
  methods: {
    isChecked(key, value) {
      return this.filters[key]?.includes(value)
    },
    onFilterChange(filterKey, value, checked) {
      this.$emit('onFilterChange', {filterKey, value, checked})
    },
    onBendatTransitionChange(event) {
      this.$emit('onSelectFilterChange', {
        filterKey: 'Bendat_Transition',
        value: event.target.value
      })
    },
    onChangeColorByProperty(e) {
      this.$emit('onChangeColorByProperty', e.target.value)
    }
  },
}
</script>

<style scoped>

.selected-presidents img {
  border-radius: 70px;
}


/*.selected-presidents img {
  border-radius: 70px;
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
}
*/

</style>