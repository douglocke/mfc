<template>
  <div class="bar">
    <div class="selectionarea">
      <span class="selected-presidents">
        <div v-if="selectedPresident" class="president-block">
          <img
            class="president-image"
            :src="
              `${publicPath}imgs/portrait_original/` + selectedPresident.Sequence + '.jpeg'
            "
            :width="40"
            :height="60"
          />
          <b class="president-name">{{ selectedPresident.Name }} </b>
          {{ selectedPresident.Year }}
        </div>
        <div class="select-president-text" v-else>Select president</div>

        <div v-if="selectedPresidentCompare" class="president-block">
          <img
            class="president-image"
            :src="
              `${publicPath}imgs/portrait_original/` +
              selectedPresidentCompare.Sequence +
              '.jpeg'
            "
            :width="40"
            :height="60"
          />
          <b class="president-name">{{ selectedPresidentCompare.Name }}</b>
          {{ selectedPresidentCompare.Year }}
        </div>
        <div class="select-president-text" v-else>Select president</div>
      </span>
    </div>
    <div class="controls">
      <div class="filter-section">
        <h3 class="section-headline">Party</h3>
        <div v-for="party of parties" :key="party.value" class="party-row">
          <input
            class="party-input"
            :id="`party-${party.value}`"
            type="checkbox"
            :checked="isChecked('Party', party.value)"
            :value="party.value"
            @input="onFilterChange('Party', party.value, $event.target.checked)"
          />
          <label class="party-label" :for="`party-${party.value}`">
            {{ party.label }}
          </label>
        </div>
      </div>
      <div class="filter-section">
        <h3 class="section-headline">Transition of Power</h3>
        <select @change="onBendatTransitionChange">
          <option
            v-for="(item, index) of bendatTransition"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="filter-section">
        <h3 class="section-headline">Color</h3>
        <select :value="colorByProperty" @change="onChangeColorByProperty">
          <option value="Top_Speech">Top Speech</option>
          <option value="Cluster">Cluster</option>
          <option value="Party">Party</option>
          <option value="Bendat_Transition">Bendat Transition</option>
          <option value="Reach">Reach</option>
        </select>
      </div>
      <div class="filter-section">
        <h3 class="section-headline">Show Overlay</h3>
        <Toggle
          :modelValue="showClusters"
          @update:modelValue="onUpdateShowClusters"
        />
      </div>
    </div>
  </div>
  <button class="help-button" @click.prevent="showHelpModal = true">
    Help
  </button>
  <div>
    <Modal v-if="showHelpModal" @close="showHelpModal = false">
      <template #header>Help</template>
      <template #body> 
       
      <img src="@/assets/imgs/help.png" width=900 alt="Help" />

      </template>
    </Modal>
  </div>
</template>
<!--Offload the details of each filtering into another file-->
<script>
import Toggle from '@vueform/toggle'
//https://github.com/vueform/toggle
import { parties, bendatTransition } from '../filters.config'
import Modal from '@/components/Modal'
export default {
  components: {
    Toggle,
    Modal,
  },
  props: {
    selectedPresident: {
      type: Object,
    },
    selectedPresidentCompare: {
      type: Object,
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    colorByProperty: {
      type: String,
      default: 'Top_Speech',
    },
    showClusters: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      parties,
      bendatTransition,
    }
  },
  data() {
    const showHelpModal = window.localStorage.getItem('modalShown')
      ? false
      : true
    return {
      showHelpModal,
      publicPath: process.env.BASE_URL
    }
  },
  created() {
    if (this.showHelpModal) {
      window.localStorage.setItem('modalShown', true)
    }
  },
  computed: {},
  methods: {
    onUpdateShowClusters(value) {
      console.log('on update show clusters', value)
      this.$emit('update:showClusters', value)
    },
    isChecked(key, value) {
      return this.filters[key]?.includes(value)
    },
    onFilterChange(filterKey, value, checked) {
      this.$emit('onFilterChange', { filterKey, value, checked })
    },
    onBendatTransitionChange(event) {
      this.$emit('onSelectFilterChange', {
        filterKey: 'Bendat_Transition',
        value: event.target.value,
      })
    },
    onChangeColorByProperty(e) {
      this.$emit('onChangeColorByProperty', e.target.value)
    },
  },
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style lang="scss" scoped>




.help-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
.selected-presidents {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.1rem 0;
  height: 110px;
}

.section-headline {
  text-align: left;
   font-family: EB Garamond, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.filter-section {
  text-align: left;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}

.select-president-text {
  margin: 0 1rem;
}

.president-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
}

.president-image {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.president-name {
  display: inline-block;
  margin: 0.4rem 0;
}

.controls {
  margin: 0 2rem;
}

.party-row {
  display: flex;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}

.party-input {
  margin-right: 0.5rem;
}

.party-label {
}

.bar {
}

.selectionarea {
}

.controls {
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
