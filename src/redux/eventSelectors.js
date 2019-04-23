const eventListSelector = state => state.firestore.ordered.events || [];

export const getVisibleEvents = eventListSelector