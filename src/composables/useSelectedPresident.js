import {ref} from 'vue'

export const selectedPresident = ref(null)
export const selectedPresidentCompare = ref(null)

export const setSelectedPresident = president => selectedPresident.value = president
export const setSelectedPresidentCompare = president => {
  console.log('in selecte dpres compare set')
  selectedPresidentCompare.value = president
  console.log('set president compare', selectedPresidentCompare, president)
}

export const switchPresidents = () => {
  if (selectedPresident.value && selectedPresidentCompare.value) {
    const temp = selectedPresidentCompare.value
    selectedPresidentCompare.value = selectedPresident.value
    selectedPresident.value = temp
  }
}

export const useSelectedPresident = () => {
  return {
    selectedPresident,
    selectedPresidentCompare,
    setSelectedPresident,
    setSelectedPresidentCompare,
    switchPresidents
  }
}