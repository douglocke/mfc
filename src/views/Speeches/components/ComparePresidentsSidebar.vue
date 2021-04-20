<template>
  <div :class="$style.sidebar">
    <div>
      <h2>Compare</h2>

      <div :class="$style.presidentsRow">
        <div :class="$style.presidentBlock">
          <button :class="$style.presidentImageButton" @click.prevent="$emit('select-president', 'speech')">
            <img
              :class="$style.presidentImage"
            v-show="selectedPresident?.Sequence"
              :src="
                '/imgs/portrait_original/' +
                selectedPresident?.Sequence +
                '.jpeg'
              "
            
              :alt="selectedPresident?.Name"
            />
          </button>
          <span>{{ selectedPresident?.Name }}</span>
        </div>
        <div :class="$style.switchPresidentsButtonBlock">
          <button
            v-show="selectedPresident && selectedPresidentCompare"
            @click.prevent="$emit('switch-presidents')"
          >
            Switch
          </button>
        </div>
        <div :class="$style.presidentBlock">
          <button :class="$style.presidentImageButton" @click.prevent="$emit('select-president', 'compare')">
            <img
              :class="$style.presidentImage"
              v-show="selectedPresidentCompare?.Sequence"
              :src="
                '/imgs/portrait_original/' +
                selectedPresidentCompare?.Sequence +
                '.jpeg'
              "
             
              :alt="selectedPresidentCompare?.Name"
            />
          </button>
          <span>
            {{ selectedPresidentCompare?.Name || 'Select' }}
          </span>
        </div>
      </div>
      <!--<div class="p1-facts">
      <b>{{ selectedPresident?.Name }}</b><br>
      <b>{{selectedPresident?.Year}}</b><br>
      <b>{{ selectedPresident?.Party }} </b><br>
      <b>{{ selectedPresident?.CP_Public_Persuasion}}</b><br>
      <b>{{ selectedPresident?.CP_Overall}}</b><br>
      </div>
     <div class="facts">
       Name<br>
       Year<br>
       Party<br>
       C-Span Persuasion<br>
       C-Span Overall<br>
      </div>
     <div class="p2-facts">
      <b>{{ selectedPresidentCompare?.Name }}</b><br>
      <b>{{selectedPresidentCompare?.Year}}</b><br>
      <b>{{ selectedPresidentCompare?.Party }} </b><br>
      <b>{{ selectedPresidentCompare?.CP_Public_Persuasion}}</b><br>
      <b>{{ selectedPresidentCompare?.CP_Overall}}</b><br>
      </div>-->
      <div :class="$style.contentContainer">
        <div
          v-for="(data, idx) of compareData"
          :key="`${idx}`"
          :class="$style.rowsContainer"
        >
          <div v-if="data.headline" :class="$style.headlineRow">
            <span :class="$style.headline">
              {{ data.headline }}
            </span>
          </div>
          <div v-else-if="data.label" :class="$style.comparisonRow">
            <span :class="$style.compareColumn">
              {{ data.left }}
            </span>
            <span :class="[$style.compareColumn, $style.compareLabel]">
              {{ data.label }}
            </span>
            <span :class="$style.compareColumn">
              {{ data.right }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const prepareData = (selectedPresident = {}, selectedPresidentCompare = {}) => {
  console.log({ selectedPresident, selectedPresidentCompare })
  const left = selectedPresident ? selectedPresident : {}
  const right = selectedPresidentCompare ? selectedPresidentCompare : {}
  return [
    {
      headline: 'Setting',
    },
    {
      left: left.Year,
      label: 'Year',
      right: right.Year,
    },
    {
      left: left.Party,
      label: 'Party',
      right: right.Party,
    },
    {
      left: left.Recession,
      label: 'Recession',
      right: right.Recession,
    },
    {
      left: 'Yes',
      label: 'War',
      right: 'No',
    },
    {
      left: 'Newspaper',
      label: 'Media',
      right: 'Newspaper',
    },
    {
      headline: 'Rank',
    },
    {
      left: '1st',
      label: 'Overall',
      right: '7th',
    },
    {
      left: '3rd',
      label: 'Persuasion',
      right: '8th',
    },
  ]
}

export default {
  props: {
    selectedPresident: {
      type: Object,
    },
    selectedPresidentCompare: {
      type: Object,
    },
  },
  computed: {
    compareData() {
      // return data
      return prepareData(this.selectedPresident, this.selectedPresidentCompare)
    },
  },
}
</script>

<style lang="scss" module>
.sidebar {
  position: sticky;
  top: 0;
}

.presidentsRow {
  display: flex;
  align-items: stretch;
}

.presidentBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 30%;
  align-self: flex-start;
}

.switchPresidentsButtonBlock {
  flex-basis: 40%;
  align-self: center;
}

.contentContainer {
}

.rowsContainer {
  display: flex;
  flex-wrap: wrap;
}

.headlineRow {
  flex-basis: 100%;
  margin-top: 1rem;
}

.headline {
  font-weight: bold;
  font-size: 1.6rem;
}

.comparisonRow {
  flex-basis: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 0.75rem;
}

.compareColumn {
  &:not(.compareLabel) {
    flex-basis: 37.5%;
  }
}

.compareLabel {
  flex-basis: 25%;
}

.presidentImageButton {
  cursor: pointer;
  background: transparent;
  outline: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid transparent;
  background-color: #bbb;
  padding: 0;
  margin-bottom: 0.25rem;
}

.presidentImage {
  object-fit: cover;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border-color: transparent;
}
</style>
