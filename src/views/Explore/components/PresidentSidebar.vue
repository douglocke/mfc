<template>
  <div class="bar">
    <div class="selectionarea">
      <span class="selected-presidents">
        <div v-if="selectedPresident" class="president-block">
          <img
            class="president-image"
            :src="
              '/imgs/portrait_original/' + selectedPresident.Sequence + '.jpeg'
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
              '/imgs/portrait_original/' +
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
        <h3 class="section-headline">Bendat Transition</h3>
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
          <option value="Cluster">Cluster</option>
          <option value="Party">Party</option>
          <option value="Bendat_Transition">Bendat Transition</option>
          <option value="Reach">Reach</option>
        </select>
      </div>
      <div class="filter-section">
        <h3 class="section-headline">Show clusters</h3>
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
      <template #header>Help intructions</template>
      <template #body> Instructions here 

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illum ducimus quam ipsum natus tenetur tempora sit. Atque dolore minima iste eum optio vero sequi. Cupiditate tenetur eligendi vero repellendus.
        Quis delectus accusamus omnis error iste vel? Vitae totam rem nobis dolorem facere dolor eligendi repellendus ea voluptatibus? Vero voluptatem quos aspernatur nesciunt cum earum dolores nisi et in officiis?
        Earum, blanditiis, optio dicta, inventore animi ratione dolore ea ullam itaque consequatur nemo commodi cumque quaerat. Veniam error commodi nemo quas. Illo ab delectus earum. Culpa, perferendis. Earum, inventore asperiores.
        Voluptatum earum perspiciatis voluptate in molestias id nam, quam, sed explicabo veniam incidunt asperiores illo. Inventore quibusdam voluptates perspiciatis repellendus vitae facilis, error adipisci dignissimos, beatae, sed sequi expedita voluptate?
        Reprehenderit numquam aut, aliquam debitis sed neque dolore sapiente facere error a inventore ipsa nisi vel, id dolor autem officiis doloribus est esse? Cumque, porro. Reiciendis suscipit maxime cumque rerum.
        Mollitia soluta perferendis, alias accusamus totam optio quos eos vitae delectus reiciendis laborum autem architecto similique voluptatum maiores ab, consequuntur ad possimus et earum sed. Laudantium sint officiis perspiciatis voluptatem!
        Quibusdam doloribus laborum quae totam odio qui accusamus nesciunt est animi error laboriosam impedit, blanditiis sapiente maxime dignissimos iure voluptate. Laudantium est minus dolores facere tenetur dolorem corporis accusantium perferendis!
        Quo quos veritatis unde deleniti quas, dolores obcaecati numquam, expedita, quis consequatur voluptatum vitae consectetur impedit incidunt neque. Consequuntur iusto provident ipsa dolores eaque ratione facilis eius! Incidunt, dolore asperiores!
        Quis cum eius aspernatur recusandae quidem vel exercitationem asperiores veritatis qui! Enim, eaque cum repudiandae nobis nesciunt facere voluptate tempore sunt temporibus excepturi accusamus eum sed dolores, error, dignissimos ratione!
        Eum tenetur hic, aperiam dolorum at voluptate inventore. Voluptate incidunt accusamus ut beatae sed dolor, sint commodi expedita, cupiditate nobis recusandae suscipit nemo alias neque reprehenderit. Quibusdam ex ercitationem numquam similique!
        Unde eaque possimus reprehenderit natus corporis officiis id ad incidunt, odio aut minus necessitatibus ut repudiandae corrupti ex exercitationem. Repellendus modi voluptatem ratione nam perspiciatis odit nulla magni ipsam atque!
        Laboriosam esse similique harum sit blanditiis distinctio magnam mollitia nesciunt doloremque nostrum voluptatum alias culpa iusto nulla ad officia, atque accusantium porro labore. Nulla, iste tempora recusandae ducimus totam accusantium?
        Eos, debitis. Magnam suscipit sequi non voluptate totam laborum ab fugiat porro quaerat autem. Nobis ducimus necessitatibus tempore autem dolor id voluptates 

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
      default: 'Cluster',
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
  margin: 2rem 0;
}

.section-headline {
  text-align: left;
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
  width: 50px;
  height: 50px;
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
