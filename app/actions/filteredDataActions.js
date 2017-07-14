//FILTERED DATA ARRAY ACTIONS

export function updateFilteredArrByCat (id, clickStatus) {
  return {
    type: 'UPDATE_FILTERED_ARR_BY_CAT',
    payload: {
      id,
      clickStatus: !clickStatus
    }
  }
}  
