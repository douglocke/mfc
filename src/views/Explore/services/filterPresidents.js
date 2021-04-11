const filterByParty = (item, key, selectedValues) => {
  // Return the item if there is no selected filter
  if (!selectedValues || !selectedValues.length) return item
  return selectedValues.includes(item[key])
}

const filterBySentiment = (item, key, selectedValues) => {
  // Return the item if there is no selected filter

  if (!selectedValues || !selectedValues.length) return item
  return selectedValues.includes(item[key])
}


// Bendant_Transition value map to the dropdown values
const transitionMap = {
  'Civil War': 'signficant',
  'Eve of Civil War': 'significant',
  'Power of the People': 'significant',
  'First African American President': 'significant'
}

const filterByBendatTransition = (item, key, selectedValue) => {
  // Get the corresponding significance value for the Bendat_Transition
  const result = transitionMap[item[key]] || ''
  // If the selected dropdown option is normal and the found Bendat_Transition is empty then include the president
  if (selectedValue === 'normal' && result === '') return true

  // Chyeck if Bendat_Transition significance matches the dropdown option
  return result === selectedValue
}

// This object maps president item keys to corresponding filter methods
const filtersMap = {
  'Party': filterByParty,
  'Sentiment': filterBySentiment,
  "Bendat_Transition": filterByBendatTransition
}

export const filter = (item, filters) => {
  // Loop through selected filters
  // Key corresponds to a key in a president object, e.g. Party, Sentiment
  for (const [key, selectedValues] of Object.entries(filters)) {
    // Execute current filter
    const result = filtersMap[key](item, key, selectedValues)
    // If the filter returned false, it means the item should be filtered out
    if (!result) return false
  }
  // All filters returned true, include the president item
  return true
}