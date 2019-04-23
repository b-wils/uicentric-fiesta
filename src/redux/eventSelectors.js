const eventListSelector = state => state.firestore.ordered.events || [];
export const eventObjectSelector = state => state.firestore.data.events;

export const getVisibleEvents = eventListSelector;

export const getEventFromId = (state, id) => eventObjectSelector(state)[id];