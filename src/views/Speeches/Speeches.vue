<template>
  <div>
    <Header />
    <div :class="$style.speechesContent">
      <div v-show="showSelectPresidentOverlay" :class="$style.selectPresidentOverlayContainer">
      <SelectPresidentOverlay @president-selected="onPresidentSelected" />
      </div>
    <main :class="$style.contentContainer">
      <section v-if="selectedPresident" :class="$style.speechContainer">
        <div :class="$style.speechTitle">
          {{ selectedPresident.Name }}
        </div>

        <template v-if="speech?.length">
          <p
            v-for="(speechLine, index) of speech"
            :key="`${index}-${selectedPresident.Id}`"
          >
            {{ speechLine }}
          </p>
        </template>
        <template v-if="fetchSpeechStatus === apiStatus.PENDING">
          <p>Fetching data...</p>
        </template>
        <template v-if="fetchSpeechStatus === apiStatus.ERROR">
          <p>There was a problem while fetching data.</p>
        </template>
      </section>
      <aside :class="$style.sidebarContainer">
        <ComparePresidentsSidebar
          :selected-president="selectedPresident"
          :selected-president-compare="selectedPresidentCompare"
          @select-president="onSelectPresident"
          @switch-presidents="onSwitchPresidents"
        />
      </aside>
    </main>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'
import Header from '@/components/Header.vue'
import SelectPresidentOverlay from './components/SelectPresidentOverlay'
import ComparePresidentsSidebar from './components/ComparePresidentsSidebar'
import { useSelectedPresident } from '@/composables'

const apiStatus = {
  'IDLE': 'IDLE',
  'PENDING': 'PENDING',
  'SUCCESS': 'SUCCESS',
  'ERROR': 'ERROR'
}

export default {
  name: 'Speeches',
  components: {
    Header,
    SelectPresidentOverlay,
    ComparePresidentsSidebar,
  },
  setup() {
    const {
      selectedPresident,
      selectedPresidentCompare,
      setSelectedPresident,
      setSelectedPresidentCompare,
      switchPresidents
    } = useSelectedPresident()
    const showSelectPresidentOverlay = ref(!selectedPresident.value)

    return {
      showSelectPresidentOverlay,
      selectedPresident,
      selectedPresidentCompare,
      setSelectedPresident,
      setSelectedPresidentCompare,
      switchPresidents,
      apiStatus
    }
  },
  data() {
    return {
      // speech | compare
      selectPresidentOverlayMode: 'speech',
      speechesById: {},
      fetchSpeechStatus: apiStatus.IDLE
    }
  },
  mounted() {
    let promises = []
    console.log('check', this.selectedPresident, this.selectedPresidentCompare)
    if (this.selectedPresident) {
      promises.push(this.fetchSpeech(this.selectedPresident))
    }

    if (this.selectedPresidentCompare) {
      promises.push(this.fetchSpeech(this.selectedPresidentCompare))
    }
    console.log(promises)
    Promise.all(promises).catch(error => console.error(error))
  },
  watch: {
    selectedPresident(president) {
      if (!Reflect.has(this.speechesById, president.Id)) {
        this.fetchSpeech(president)
      }
    },
    showSelectPresidentOverlay: {
      immediate: true, //watcher is looking for change to showSelectPresidentOverlay.  call this when value changes
      handler(value) {
        if (value) {
          this.hideScrollbar()
        } else {
          this.showScrollbar()
        }
      }
    }
  },
  computed: {
    speech() {
      return this.speechesById[this.selectedPresident?.Id]
    },
  },
  methods: {
    //when showing the president selection, remove the main body scrollbar, and replace with a scrollbar only for the overlay itself.
    showScrollbar() {
      document.body.classList.remove('overflow-hidden')
    },
    hideScrollbar() {
      document.body.classList.add('overflow-hidden')
    },
    onPresidentSelected(president) {
      console.log({ president })
      if (this.selectPresidentOverlayMode === 'speech') {
        this.setSelectedPresident(president)
      } else {
        this.setSelectedPresidentCompare(president)
      }
      this.showSelectPresidentOverlay = false
    },
    onSelectPresident(mode) {
      this.selectPresidentOverlayMode = mode
      this.showSelectPresidentOverlay = true
    },
    onSwitchPresidents() {
      this.switchPresidents()
    },
    async fetchSpeech(president) {
      try {
        this.fetchSpeechStatus = apiStatus.PENDING
        const { Filename, Id } = president
        const response = await fetch(`/data/speeches/${Filename}`)
        const speech = await response.text()
        console.log({ speech })
        this.speechesById[Id] = speech.split('\n')
        this.fetchSpeechStatus = apiStatus.SUCCESS
      } catch (error) {
        console.error(error)
        alert('There was a problem while fetching the speech')
        this.fetchSpeechStatus = apiStatus.ERROR
      }
    },
  },
  beforeUnmount() {
    this.showScrollbar()
  }
}
</script>
<style lang="scss" module>
.speechesContent {
  position: relative;
}

.selectPresidentOverlayContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  overflow-y: auto;
  z-index: 10;
  background-color: white;
}

.contentContainer {
  display: flex;
}

.speechContainer {
  flex-grow: 1;
}

.sidebarContainer {
  flex-basis: 300px;
  flex-shrink: 0;
  position: relative;
}
</style>
