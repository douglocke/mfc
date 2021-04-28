<template>
  <div :class="$style.sidebar">
    <div>
      <div :class="$style.compareHeader">Compare</div>

      <div :class="$style.presidentsRow">
        <div :class="$style.presidentBlock">
          <button
            :class="$style.presidentImageButton"
            @click.prevent="$emit('select-president', 'speech')"
          >
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
          <span
            >{{ selectedPresident?.Name }}<br />
            {{ selectedPresident?.Short_Label }}
          </span>
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
          <button
            :class="$style.presidentImageButton"
            @click.prevent="$emit('select-president', 'compare')"
          >
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
            {{
              selectedPresidentCompare
                ? selectedPresidentCompare?.Name 
                : 'Select'
            }}<br />
            <span>{{ selectedPresidentCompare?.Short_Label }}<br /></span>
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
            <span
              :class="[$style.compareColumn, $style.compareLabel]"
              v-bind="{
                ...(data.tooltipInfo && {
                  'data-tippy-content': data.tooltipInfo,
                }),
                //if we have tooltipinfo, pass an object with the data-tippy-content inside, else it's undefined, so v-bind will receive an empty object
              }"
            >
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
import tippy from 'tippy.js'

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
      tooltipInfo: 'Year in which something happened',
      right: right.Year,
    },
    {
      left: left.Party,
      label: 'Party',
      tooltipInfo: 'Political party',
      right: right.Party,
    },
    {
      left: left.CP_Public_Persuasion,
      label: 'President Persuasion Rank',
      tooltipInfo: 'How good at speaking was this one?',
      right: right.CP_Public_Persuasion,
    },
    {
      left: left.Recession,
      label: 'Recession',
      right: right.Recession,
    },
    {
      left: left.War,
      label: 'War',
      right: right.War,
    },

    {
      headline: 'Form',
    },

    {
      left: left.Reach,
      label: 'Reach',
      right: right.Reach,
    },
    {
      left: left['Flesch Kincaid Grade Level'],
      label: 'Grade Level',
      right: right['Flesch Kincaid Grade Level'],
    },
    {
      left: left['Word Count'],
      label: 'Word Count',
      right: right['Word Count'],
    },
    {
      left: left['Dale-Chall Difficult Words'],
      label: 'Difficult Words',
      right: right['Dale-Chall Difficult Words'],
    },

    {
      left: left['Difficult_Words_Rank'],
      label: 'Difficult Words Rank',
      right: right['Difficult_Words_Rank'],
    },
    {
      left: left['Words Per Sentence'],
      label: 'Words Per Sentence',
      right: right['Words Per Sentence'],
    },
    {
      left: left['Speaking Time'],
      label: 'Speaking Time',
      right: right['Speaking Time'],
    },
    {
      headline: 'Content',
    },

    {
      left: left.Top_Speech,
      label: 'Top Speech',
      right: right.Top_Speech,
    },

    {
      left: left['Activity_Rank'],
      label: 'Activity Rank',
      right: right['Activity_Rank'],
    },
    {
      left: left['Certainty_Rank'],
      label: 'Certainty Rank',
      right: right['Certainty_Rank'],
    },
    {
      left: left['Commonaliy_Rank'],
      label: 'Commonality Rank',
      right: right['Commonaliy_Rank'],
    },
    {
      left: left['Optimism_Rank'],
      label: 'Optimism Rank',
      right: right['Optimism_Rank'],
    },
    {
      left: left['Realism_Rank'],
      label: 'Realism Rank',
      right: right['Realism_Rank'],
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
  methods: {
    destroyTooltips() {
      this.tooltips?.forEach(instance => instance?.destroy())
    },
  },
  updated() {
    console.log(this.tooltips)
    this.destroyTooltips()
    this.tooltips = tippy('[data-tippy-content]')
  },
  beforeUnmount() {
    this.destroyTooltips()
  },
  mounted() {
    this.tooltips = tippy('[data-tippy-content]')
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

.compareHeader {
  font-family: EB Garamond, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: bold;
  font-size: 1.6rem;
}

.headlineRow {
  font-family: EB Garamond, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid transparent;
  background-color: #bbb;
  padding: 0;
  margin-bottom: 0.25rem;
}

.presidentImage {
  object-fit: cover;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border-color: transparent;
}
</style>
